import { BrandType, DeviceType, TypeType } from '../types/types';

export type PostLoginServerType = {
  token: string;
};

export type PostRegistrationServerType = {
  token: string;
};

export type GetDeviceTypes = TypeType[];
export type AddNewDeviceType = TypeType;
export type DeleteDeviceType = number;

export type GetDeviceBrands = BrandType[];
export type AddNewDeviceBrand = BrandType;
export type DeleteDeviceBrand = number;

export type GetDeviceByIDServerType = DeviceType;

export type ParamsForGetDevicesServerType = {
  typeId?: string | undefined;
  brandId?: string | undefined;
  limit?: string | undefined;
  page?: string | undefined;
};
export type GetDevicesServerType = {
  count: number;
  rows: DeviceType[];
};
export type CreateNewDeviceServerType = DeviceType
