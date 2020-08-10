import firebase from '../../utils/firebaseConfig';

export function loginAction(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(err => {
      console.log('Error: ', err);
  });
  let currentUser = firebase.auth().currentUser
  return {
    type: 'LOGIN',
    payload: currentUser,
  };
}
