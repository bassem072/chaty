import apiInstance from "../utils/apiInstance";

export const fetchGroupsService = async ({
  skip = 0,
  keyword = "",
  sort = "-latestMessage.createdAt",
  limit = 20,
}) => {
  const query = {
    keyword,
    skip,
    limit,
    sort,
    isGroupChat: true,
  };
  const response = await apiInstance.get(`chats`, query);

  return response.data;
};

export const createGroupService = async ({ name, users }) => {
  const body = {
    isGroupChat: true,
    users: [...users],
    name,
  };

  const response = await apiInstance.post(`chats`, body);

  return response.data;
};

export const getGroupService = async (groupId) => {
  const response = await apiInstance.get(`chats/${groupId}`);

  return response.data;
};

export const updateGroupService = async (groupId, { name }) => {
  const body = {
    name,
  };
  const response = await apiInstance.put(`chats/${groupId}`, body);

  return response.data;
};

export const deleteGroupService = async (groupId) => {
  const response = await apiInstance.delete(`chats/${groupId}`);

  return response.data;
};

export const clearGroupService = async (groupId) => {
  const response = await apiInstance.post(`chats/${groupId}/clear`);

  return response.data;
};

export const addUserToGroupService = async (groupId, { user }) => {
  const response = await apiInstance.post(`chats/${groupId}/users/add`, {
    user,
  });

  return response.data;
};

export const removeUserFromGroupService = async (groupId, { user }) => {
  const response = await apiInstance.post(`chats/${groupId}/users/remove`, {
    user,
  });

  return response.data;
};

export const addAdminToGroupService = async (groupId, { user }) => {
  const response = await apiInstance.post(`chats/${groupId}/admins/add`, {
    user,
  });

  return response.data;
};

export const removeAdminFromGroupService = async (groupId, { user }) => {
  const response = await apiInstance.post(`chats/${groupId}/admins/remove`, {
    user,
  });

  return response.data;
};