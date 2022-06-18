import { instanceAxios, addAuthHeader } from '../instanceAxios';
import {
  AddNewDeviceBrand,
  AddNewDeviceType,
  DeleteDeviceBrand,
  DeleteDeviceType,
  GetDeviceBrands,
  GetDevicesServerType,
  GetDeviceTypes,
  ParamsForGetDevicesServerType,
} from '../serverTypes';
import { makeQueries } from '../../utils/functions';

export const deviceApi = {
  async getDeviceTypes() {
    const response = await instanceAxios.get<GetDeviceTypes>('/type');
    return response.data;
  },
  async addNewDeviceType(name: string) {
    const response = await instanceAxios.post<AddNewDeviceType>('/type', { name }, addAuthHeader());
    return response.data;
  },
  async deleteDeviceType(id: string) {
    const response = await instanceAxios.delete<DeleteDeviceType>(`/type/${id}`, addAuthHeader());
    return response.data;
  },
  async getDeviceBrands() {
    const response = await instanceAxios.get<GetDeviceBrands>('/brand');
    return response.data;
  },
  async addNewDeviceBrand(name: string) {
    const response = await instanceAxios.post<AddNewDeviceBrand>('/brand', { name }, addAuthHeader());
    return response.data;
  },
  async deleteDeviceBrand(id: string) {
    const response = await instanceAxios.delete<DeleteDeviceBrand>(`/brand/${id}`, addAuthHeader());
    return response.data;
  },
  async getDevices(params: ParamsForGetDevicesServerType) {
    const queries = makeQueries(params);
    console.log(queries);
    const response = await instanceAxios.get<GetDevicesServerType>('/device' + queries);
    console.log('response =', response);
    return response.data;
  },
};
