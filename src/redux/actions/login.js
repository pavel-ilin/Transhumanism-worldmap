import firebase from '../../utils/firebaseConfig';

export function login(user) {
  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .catch(err => {
      console.log('Error: ', err);
  });

  return {
    type: 'LOGIN',
    payload: user,
  };
  }
