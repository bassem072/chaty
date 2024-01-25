import apiInstance from "../utils/apiInstance";

export const fetchUsersService = async ({
  skip = 0,
  keyword = "",
  limit = 20,
  users = [],
}) => {
  const query = {
    keyword,
    skip,
    limit,
    users,
  };

  const queryString = new URLSearchParams(query).toString();

  const response = await apiInstance.get(`users?${queryString}`);

  return response.data;
};

export const getUserService = async (userId) => {
  const response = await apiInstance.get(`users/${userId}`);

  return response.data;
};

export const getUserImageService = async (userId) => {
  const response = await apiInstance.get(`users/${userId}/profileImage`, {
    responseType: "blob",
    timeout: 30000,
  });

  return response.data;
};
