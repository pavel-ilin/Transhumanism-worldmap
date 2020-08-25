import firebase from '../../utils/firebaseConfig';

export const getGeoData = () => {
    let ambassadors = []
    let states = []
    let allCountries = []
    let allStates = []

    firebase.firestore().collection('ambassadors').get() 
            .then(amba => {amba.forEach(item => {
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

    return (dispatch) => firebase.storage().ref().child("/CombinedGeoData.json").getDownloadURL()
        .then(function(url) {
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

                    geodata.features.forEach(item => {
                        if (item.properties.NAME){
                            allStates.push(item.properties.NAME)
                        }
                        else {
                            allCountries.push(item.properties.name)
                        }
                        
                    })
                    
                    dispatch({
                        type: "GET_GEO_DATA",
                        payload: geodata,
                        allStates: allStates.sort(),
                        allCountries: allCountries.sort(),
                    })
                })
    })
}


export const addAmbassador = (country, ambassador) => {
    let data = {country: country, ambassador: ambassador}
    return (dispatch) => {
        firebase.firestore().collection('ambassadors').doc(country).set(data)
    }
    
}

export const addState = (state, party, url) => {
    let data = {state: state, party: party, url: url}
    return (dispatch) => {
        firebase.firestore().collection('usState').doc(state).set(data)
    }
}