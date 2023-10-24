import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private req: any,
  ) {}

  /**
   * Create a task
   * @param data
   * @returns
   */
  async createTask(data: CreateTaskDto) {
    data.id_user = this.req.user.id;
    const createData = await this.prisma.tasks.create({
      data: data,
    });
    return {
      statusCode: 201,
      data: createData,
    };
  }
  async getAllTasks() {
    const data = await this.prisma.tasks.findMany({
      where: {
        id_user: this.req.user.id,
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
    return {
      statusCode: 200,
      data,
    };
  }
  async getTaskById(task_id: number) {
    const data = await this.prisma.tasks.findFirst({
      where: {
        id: task_id,
        id_user: this.req.user.id,
      },
    });
    return {
      statusCode: 200,
      data,
    };
  }

  /**
   * Update a task by Id
   * @param task_id
   * @param data
   * @returns
   */
  async updateTaskById(task_id: number, data: UpdateTaskDto) {
    data.id_user = this.req.user.id;
    const updateData = await this.prisma.tasks.update({
      where: {
        id: task_id,
      },
      data: data,
    });
    return {
      statusCode: 200,
      data: updateData,
    };
  }

  /**
   * Delete a task by Id
   * @param task_id
   * @returns
   */
  async deleteTaskById(task_id: number) {
    const deleteData = await this.prisma.tasks.delete({
      where: {
        id: task_id,
      },
    });
    return {
      statusCode: 200,
      data: deleteData,
      message: 'Sukses Delete Task',
    };
  }
}
