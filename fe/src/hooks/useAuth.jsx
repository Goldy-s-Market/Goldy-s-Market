//hook for checking if current user signed in

export const useAuth = () => {
  // get token from local storage
  const token = localStorage.getItem('token');

  //validate?
  const isAuthenticated = !!token;

  return isAuthenticated;
};