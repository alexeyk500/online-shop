import { instanceAxios } from '../instanceAxios';
import { PostLoginServerType, PostRegistrationServerType } from '../../types/serverTypes';

export const userApi = {
  async userLogin({ email, password }: { email: string; password: string }) {
    const response = await instanceAxios.post<PostLoginServerType>('/user/login', {
      email,
      password,
    });
    return response.data;
  },
  async userRegistration({ email, password, role }: { email: string; password: string; role?: string }) {
    const response = await instanceAxios.post<PostRegistrationServerType>('/user/registration', {
      email,
      password,
      role,
    });
    return response.data;
  },
};
