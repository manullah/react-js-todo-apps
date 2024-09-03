import axiosInstance from '../../../libs/axios/axios-config';
import { endpoints } from '../../../utils/constant/endpoint-config';

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

    return result.data;
  };

  static update = async args => {
    const result = await axiosInstance.put(endpoints.task.update(args.id), args.payload);

    return result.data;
  };

  static delete = async args => {
    const result = await axiosInstance.delete(endpoints.task.delete(args.id));

    return result.data;
  };
}
