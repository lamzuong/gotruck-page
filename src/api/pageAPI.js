import axiosClient from './axiosClient';

export const registerAPI = {
  postRegister: (params) => {
    const url = `/pageregister/register`;
    return axiosClient.post(url, params);
  },
};

export const truckAPI = {
  getTruckType: () => {
    const url = `pageregister/trucktype`;
    return axiosClient.get(url);
  },
};
