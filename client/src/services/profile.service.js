import apiInstance from '../utils/apiInstance';

export const profileService = async () => {
    const response = await apiInstance.get('profile');

    return response.data;
};

export const editProfileService = async (userData) => {
    const response = await apiInstance.put('profile', userData);

    return response.data;
};

export const getProfilePicService = async () => {
    const response = await apiInstance.get("profile/profileImage", {
      responseType: "blob",
      timeout: 30000,
    });

    return response.data;
};

export const changeProfilePicService = async (userData) => {
  const response = await apiInstance.post(
    "profile/changeProfilePic",
    userData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const logoutService = async () => {
    const response = await apiInstance.delete('profile/logout');

    return response.data;
};

