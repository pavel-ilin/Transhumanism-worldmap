import firebase from '../../utils/firebaseConfig';
// firebase.firestore().collection('map').doc('features').set(resp.features)

export const getGeoData = () => {
    return (dispatch) => firebase.storage().ref().child("/CombinedGeoData.json").getDownloadURL()
        .then(function(url) {
            fetch(url)
                .then(r => r.json())
                .then(resp => {
                    firebase.firestore().collection('map').doc('features').get() 
                    .then(r => {
                        console.log(r.data())
                    })

                    // console.log(resp.features)

                    dispatch({
                        type: "GET_GEO_DATA",
                        payload: resp,
                    })
                })
    })
}
