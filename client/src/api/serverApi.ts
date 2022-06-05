import { userApi } from './requests/userApi';
import { deviceApi } from './requests/deviceApi';

export const serverApi = {
  ...userApi,
  ...deviceApi,
};
