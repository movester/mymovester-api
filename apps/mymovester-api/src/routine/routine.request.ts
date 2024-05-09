import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateRoutineRequest {
  @IsNotEmpty()
  @IsString()
  @Length(1, 40)
  title: string;
}

export class DeleteRoutinesRequest {
  ids: number[];
}

export class UpdateRoutineRequest {
  @IsNotEmpty()
  @IsString()
  @Length(1, 40)
  title: string;
}

export class CreateRoutineStretchingRequest {
  @IsArray()
  routineIds: number[];

  @IsNumber()
  stretchingId: number;
}
