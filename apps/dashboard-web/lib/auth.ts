import Cookies from 'js-cookie';

export const saveToken = (
  token: string,
) => {
  Cookies.set('albi_token', token, {
    expires: 7,
  });
};

export const getToken = () => {
  return Cookies.get('albi_token');
};

export const logout = () => {
  Cookies.remove('albi_token');
};