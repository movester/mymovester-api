import { ApiProperty } from "@nestjs/swagger";

export interface IDefaultResponse {
  //   status: number;
  isSuccess: boolean;
  data?: any;
  errorCode?: string;
  errorMessage?: string;
}

export class DefaultResponse implements IDefaultResponse {
  //   status: number;

  @ApiProperty({
    description: '',
    example: '',
    type: String,
    nullable: false,
  })
  isSuccess: boolean;

  @ApiProperty({
    description: '',
    example: '',
    type: String,
    nullable: true,
  })
  data?: any;

  @ApiProperty({
    description: '에러 코드',
    example: '',
    type: String,
    nullable: true,
  })
  errorCode?: string;

  @ApiProperty({
    description: '에러 메세지',
    example: '',
    type: String,
    nullable: true,
  })
  errorMessage?: string;

  constructor(response: IDefaultResponse) {
    this.isSuccess = response.isSuccess;
    this.data = response.data;
    this.errorCode = response.errorCode;
    this.errorMessage = response.errorMessage;
  }
}
