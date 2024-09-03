import axiosInstance from '../../../libs/axios/axios-config';
import { endpoints } from '../../../utils/constant/endpoint-config';
import { isSuccessStatusCode } from '../../../utils/utils';

export class AuthApi {
  static login = async args => {
    const result = await axiosInstance.post(endpoints.auth.login, args.payload);

    // NEED BUG FIX: The api doesn't support on http error code, remove the code when bug is fixed. The axios will automatically throw an error
    if (!isSuccessStatusCode(result.data.statusCode)) {
      throw result.data;
    }

    return result.data;
  };

  static register = async args => {
    const result = await axiosInstance.post(endpoints.auth.register, args.payload);

    // NEED BUG FIX: The api doesn't support on http error code, remove the code when bug is fixed. The axios will automatically throw an error
    if (!isSuccessStatusCode(result.data.statusCode)) {
      throw result.data;
    }

    return result.data;
  };
}
