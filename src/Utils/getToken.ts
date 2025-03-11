export const getToken = () => {
  const authTokensString = localStorage.getItem("token");
  if (authTokensString) {
    return `Bearer ${authTokensString}`;
  }
  return "";
};
