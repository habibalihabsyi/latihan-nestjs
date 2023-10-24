import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createTask(@Body() body: CreateTaskDto) {
    return await this.taskService.createTask(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllTasks() {
    return await this.taskService.getAllTasks();
  }

  @UseGuards(AuthGuard)
  @Get(':task_id')
  async getTaskById(@Param('task_id') task_id) {
    return await this.taskService.getTaskById(parseInt(task_id));
  }

  @UseGuards(AuthGuard)
  @Patch(':task_id')
  async updateTaskById(@Param('task_id') task_id, @Body() body: UpdateTaskDto) {
    return await this.taskService.updateTaskById(parseInt(task_id), body);
  }

  @UseGuards(AuthGuard)
  @Delete(':task_id')
  async deleteTaskById(@Param('task_id') task_id) {
    return await this.taskService.deleteTaskById(parseInt(task_id));
  }
}
