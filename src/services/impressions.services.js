import axios from 'axios';
import { envConfig } from '../envConfigurations/EnvConfigurations';

const url = envConfig().apiUrl

export const searchUser = async (user, password) => {
  try {
    const response = await axios.post(url, {
      user,
      password,
    });

    return response.data;
  } catch (error) {
    return error
  }
};
