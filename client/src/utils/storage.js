export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user;
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const setUser = (user) => {
  localStorage.setItem("user", user);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const removeUser = () => {
  localStorage.removeItem("user");
};