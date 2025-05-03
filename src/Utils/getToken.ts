export const getToken = () => {
  const authTokensString = localStorage.getItem("token");
  if (authTokensString) {
    return authTokensString;
  }
  return "";
};
