import { Length } from "class-validator";

export class UpdateUserRequest {
  @Length(3, 30)
  nickName?: string;

  profileUrl?: string;
}
