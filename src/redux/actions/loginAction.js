export const loginAction = (currentUser) => {
  localStorage.user = currentUser
  return {
    type: 'LOGIN',
    payload: currentUser,
  };
}

export const logoutAction = () => {
  return {
    type: 'LOGOUT',
    payload: false,
  };
}



