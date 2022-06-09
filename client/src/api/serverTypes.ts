import { BrandType, TypeType } from '../types/types';

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
