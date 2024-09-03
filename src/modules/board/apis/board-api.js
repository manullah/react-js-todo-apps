import axiosInstance from '../../../libs/axios/axios-config';
import { endpoints } from '../../../utils/constant/endpoint-config';
import { isSuccessStatusCode } from '../../../utils/utils';

export class BoardApi {
  static getAll = async args => {
    const result = await axiosInstance.get(endpoints.board.getAll, {
      params: args.params,
    });

    return result.data;
  };

  static getDetails = async args => {
    const result = await axiosInstance.get(endpoints.board.getDetails(args.id), {
      params: args.params,
    });

    return result.data;
  };

  static create = async args => {
    const result = await axiosInstance.post(endpoints.board.create, args.payload);

    // NEED BUG FIX: The api doesn't support on http error code, remove the code when bug is fixed. The axios will automatically throw an error
    if (!isSuccessStatusCode(result.data.statusCode)) {
      throw result.data;
    }

    return result.data;
  };

  static update = async args => {
    const result = await axiosInstance.put(endpoints.board.update(args.id), args.payload);

    // NEED BUG FIX: The api doesn't support on http error code, remove the code when bug is fixed. The axios will automatically throw an error
    if (!isSuccessStatusCode(result.data.statusCode)) {
      throw result.data;
    }

    return result.data;
  };

  static delete = async args => {
    const result = await axiosInstance.delete(endpoints.board.delete(args.id));

    // NEED BUG FIX: The api doesn't support on http error code, remove the code when bug is fixed. The axios will automatically throw an error
    if (!isSuccessStatusCode(result.data.statusCode)) {
      throw result.data;
    }

    return result.data;
  };
}
