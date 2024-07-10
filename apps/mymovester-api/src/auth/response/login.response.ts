export interface ILoginResponseDTO {
  id: number;
  email: string;
  name: string;
  profileUrl: string;
  accessToken: string;
  refreshToken: string;
  isTermsAgreed: boolean;
}

export class LoginResponse implements ILoginResponseDTO {
  id: number;
  email: string;
  name: string;
  profileUrl: string;
  accessToken: string;
  refreshToken: string;
  isTermsAgreed: boolean;

  constructor(user: ILoginResponseDTO) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.profileUrl = user.profileUrl;
    this.accessToken = user.accessToken;
    this.refreshToken = user.refreshToken;
    this.isTermsAgreed = user.isTermsAgreed;
  }
}
