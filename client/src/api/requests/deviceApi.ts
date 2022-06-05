import { instanceAxios, addAuthHeader } from '../instanceAxios';
import { AddNewDeviceType, GetDeviceTypes } from '../serverTypes';

export const deviceApi = {
  async getDeviceTypes() {
    const response = await instanceAxios.get<GetDeviceTypes>('/type');
    return response.data;
  },
  async addNewDeviceType(name: string) {
    const response = await instanceAxios.post<AddNewDeviceType>('/type', { name }, addAuthHeader());
    return response.data;
  },
};
