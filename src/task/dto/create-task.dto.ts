import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  id_user: number;

  @IsString()
  @IsNotEmpty()
  task_name: string;

  @IsString()
  @IsNotEmpty()
  task_description: string;
}
