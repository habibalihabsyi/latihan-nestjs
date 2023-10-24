import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  id_user: number;

  @IsOptional()
  @IsString()
  task_name: string;

  @IsOptional()
  @IsString()
  task_description: string;
}
