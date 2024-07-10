import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateUserTermsRequest {
  @IsNotEmpty()
  @IsBoolean()
  isTermAgreed: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isPrivacyPolicyAgreed: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isMarketingAgreed: boolean;
}
