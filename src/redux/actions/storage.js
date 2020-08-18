import firebase from '../../utils/firebaseConfig';
// firebase.firestore().collection('map').doc('features').set(resp.features)

export const getGeoData = () => {
    return (dispatch) => firebase.storage().ref().child("/CombinedGeoData.json").getDownloadURL()
        .then(function(url) {
            let ambassadors = []
            let states = []
            firebase.firestore().collection('ambassadors').get() 
                    .then(amba => {
                        amba.forEach(item => {
                            let ambassador = item.data()
                            ambassadors.push(ambassador)
                        })
                    })
            firebase.firestore().collection('usState').get() 
                    .then(state => {
                        state.forEach(item => {
                            let state = item.data()
                            states.push(state)
                        })
                    })
            fetch(url)
                .then(r => r.json())
                .then(resp => {
                    let geodata = resp
                    let indexAmba = 0
                    let indexStates = 0
                    geodata.features.forEach(item => {
                        if (indexAmba >= ambassadors.length){
                            return false
                        }
                        if (ambassadors[indexAmba].country === item.properties.name){
                            item.properties.present = 1
                            item.properties.ambasadorStatus = 1
                            item.properties.ambasador = ambassadors[indexAmba].ambassador
                            indexAmba++
                        }
                    })

                    geodata.features.forEach(item => {
                        if (indexStates >= states.length){
                            return false
                        }
                        if (states[indexStates].state === item.properties.NAME){
                            item.properties.present = 1
                            item.properties.party = states[indexStates].party
                            item.properties.url = states[indexStates].url
                            indexStates++
                        }
                    })

                    dispatch({
                        type: "GET_GEO_DATA",
                        payload: geodata,
                    })
                })
    })
}
