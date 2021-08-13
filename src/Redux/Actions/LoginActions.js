export const loginApi = (data) => ({
  type: 'LOGIN',
  payload: {loginData: data},
});
export const saveLoginApi = (data) => ({
  type: 'SAVE_LOGIN',
  payload: {loginData: data},
});
