// import { loginAction } from '/loginAction.js';

export function loginAction(currentUser) {
  return {
    type: 'LOGIN',
    payload: currentUser,
  };
}

const rootActions = {
  loginAction,
}

export default rootActions;