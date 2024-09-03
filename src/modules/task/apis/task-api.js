import axiosInstance from '../../../libs/axios/axios-config';
import { endpoints } from '../../../utils/constant/endpoint-config';
import { isSuccessStatusCode } from '../../../utils/utils';

export class TaskApi {
  static getAll = async args => {
    const result = await axiosInstance.get(endpoints.task.getAll, {
      params: args.params,
    });

    return result.data;
  };

  static getDetails = async args => {
    const result = await axiosInstance.get(endpoints.task.getDetails(args.id), {
      params: args.params,
    });

    return result.data;
  };

  static create = async args => {
    const result = await axiosInstance.post(endpoints.task.create, args.payload);

    // NEED BUG FIX: The api doesn't support on http error code, remove the code when bug is fixed. The axios will automatically throw an error
    if (!isSuccessStatusCode(result.data.statusCode)) {
      throw result.data;
    }

    return result.data;
  };

  static update = async args => {
    const result = await axiosInstance.put(endpoints.task.update(args.id), args.payload);

    // NEED BUG FIX: The api doesn't support on http error code, remove the code when bug is fixed. The axios will automatically throw an error
    if (!isSuccessStatusCode(result.data.statusCode)) {
      throw result.data;
    }

    return result.data;
  };

  static delete = async args => {
    const result = await axiosInstance.delete(endpoints.task.delete(args.id));

    // NEED BUG FIX: The api doesn't support on http error code, remove the code when bug is fixed. The axios will automatically throw an error
    if (!isSuccessStatusCode(result.data.statusCode)) {
      throw result.data;
    }

    return result.data;
  };

  static move = async args => {
    const result = await axiosInstance.post(endpoints.task.move, args.payload);

    // NEED BUG FIX: The api doesn't support on http error code, remove the code when bug is fixed. The axios will automatically throw an error
    if (!isSuccessStatusCode(result.data.statusCode)) {
      throw result.data;
    }

    return result.data;
  };
}
