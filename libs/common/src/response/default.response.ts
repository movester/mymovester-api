export interface IDefaultResponse {
  isSuccess: boolean;
  data?: any;
  errorMessage?: string;
}

export class DefaultResponse implements IDefaultResponse {
  isSuccess: boolean;
  data?: any;
  errorMessage?: string;

  static ok<T>(data: T): IDefaultResponse {
    return {
      isSuccess: true,
      data,
    };
  }
}
