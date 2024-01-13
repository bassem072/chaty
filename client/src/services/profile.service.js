import apiInstance from '../utils/apiInstance';

export const profileService = async () => {
    const response = await apiInstance.get('profile');

    return response.data;
};

export const logoutService = async () => {
    const response = await apiInstance.delete('profile/logout');

    return response.data;
};