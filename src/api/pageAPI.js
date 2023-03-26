import axiosClient from './axiosClient';

export const registerAPI = {
  postRegister: (params) => {
    const url = `/register`;
    return axiosClient.post(url, params);
  },
};

export const truckAPI = {
  getTruckType: () => {
    const url = `/trucktype`;
    return axiosClient.get(url);
  },
};
