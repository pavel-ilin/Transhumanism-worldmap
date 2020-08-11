import authFirebase from '../../helpers/authFirebase'
export const loginAction = (currentUser) => {
  return {
    type: 'LOGIN',
    payload: currentUser,
  };
}


