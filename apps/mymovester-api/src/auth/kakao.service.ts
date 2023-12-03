import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import got from 'got';

export interface IUserPropertiesResponse {
  id: number;
  kakao_account : {
    profile: {
      nickname: string;
    }
    email: string;
  }
}

@Injectable()
export class KakaoService {
  private readonly adminKey = process.env.KAKAO_KEY;

  private readonly endPointV1 = 'https://kapi.kakao.com/v1';
  private readonly endPointV2 = 'https://kapi.kakao.com/v2';
  private readonly userMePath = '/user/me';
  private readonly unlinkPath = '/user/unlink';

  public async getUserProperties(
    kakaoToken: string,
  ): Promise<IUserPropertiesResponse> {
    try {
      const response = await got.post<IUserPropertiesResponse>(
        `${this.endPointV2}${this.userMePath}`,
        {
          headers: {
            Authorization: `Bearer ${kakaoToken}`,
          },
          responseType: 'json',
        },
      );
      return response.body;
    } catch (error) {
      throw new HttpException(
        {
          error: error.message,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async unlink(
    socialUuid: string,
  ): Promise<{statusCode: number; id: number}> {
    try {
      const response = await got.post<{id: number}>(
        `${this.endPointV1}${this.unlinkPath}`,
        {
          headers: {
            Authorization: `KakaoAK ${this.adminKey}`,
          },
          searchParams: {
            target_id_type: 'user_id',
            target_id: Number(socialUuid),
          },
          responseType: 'json',
          allowGetBody: true,
        },
      );

      const statusCode = response.statusCode;
      const {id} = response.body;
      return {
        statusCode,
        id,
      };
    } catch (error) {
      throw new HttpException(
        {
          error: error.message,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}