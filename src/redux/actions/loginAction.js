export const loginAction = (currentUser) => {
  return {
    type: 'LOGIN',
    payload: currentUser,
  };
}

export const loadData = (currentUser) => {
  return {
    type: 'LOAD_DATA',
    payload: currentUser,
  };
}

export const logoutAction = () => {
  return {
    type: 'LOGOUT',
    payload: false,
  };
}



