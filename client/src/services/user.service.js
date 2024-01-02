import apiInstance from "../utils/apiInstance";

export const fetchUsersService = async ({
  skip = 0,
  keyword = "",
  limit = 20,
}) => {
  const query = {
    keyword,
    skip,
    limit,
  };

  const queryString = new URLSearchParams(query).toString();
  console.log(queryString);

  const response = await apiInstance.get(`users?${queryString}`);
  console.log(response.data.data);

  return response.data;
};
