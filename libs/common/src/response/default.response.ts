import { ApiProperty } from '@nestjs/swagger';

export interface IDefaultResponse {
  isSuccess: boolean;
  data?: any;
  errorMessage?: string;
}

export class DefaultResponse implements IDefaultResponse {

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

  static ok<T>(data: T): IDefaultResponse {
    return {
      isSuccess: true,
      data,
    };
  }
}
