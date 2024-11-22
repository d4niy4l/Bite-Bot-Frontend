import Cookies from "js-cookie";

export const setAccessToken = (value) => {
  Cookies.set('access_token', value,{
    expires: 1,
    secure: true,
  });
}

export const getAccessToken = () => {
  return Cookies.get('access_token');
}

export const removeAccessToken = () => {
  Cookies.remove('access_token');
}
