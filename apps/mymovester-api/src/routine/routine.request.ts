import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRoutineRequest {
  @IsNotEmpty()
  @IsString()
  @Length(1, 40)
  title: string;
}
