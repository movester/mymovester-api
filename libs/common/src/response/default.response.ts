export interface IDefaultResponse {
  //   status: number;
  isSuccess: boolean;
  data?: any;
  errorCode?: string;
  errorMessage?: string;
}

export class DefaultResponse implements IDefaultResponse {
  //   status: number;
  isSuccess: boolean;
  data?: any;
  errorCode?: string;
  errorMessage?: string;

  constructor(response: IDefaultResponse) {
    this.isSuccess = response.isSuccess;
    this.data = response.data;
    this.errorCode = response.errorCode;
    this.errorMessage = response.errorMessage;
  }
}
