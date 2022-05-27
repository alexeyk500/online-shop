import { instanceAxios } from '../instanceAxios';
import { PostLoginServerType } from '../../types/serverTypes';

export const userApi = {
  async userLogin({ email, password }: { email: string; password: string }) {
    const response = await instanceAxios.post<PostLoginServerType>('/user/login', {
      email,
      password,
    });
    return response.data;
  },
};
