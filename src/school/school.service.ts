import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new School
   * @param createSchoolDto
   * @returns
   */
  async create(createSchoolDto: CreateSchoolDto) {
    const createSchool = await this.prisma.schools.create({
      data: createSchoolDto,
    });
    if (createSchool) {
      return {
        statusCode: HttpStatus.OK,
        data: createSchool,
      };
    }
  }

  /**
   * Get All School
   * @returns
   */
  async findAll() {
    const dataSchool = await this.prisma.schools.findMany();
    return {
      statusCode: HttpStatus.OK,
      data: dataSchool,
    };
  }

  /**
   * Get School by Id
   * @param id
   * @returns
   */
  async findOne(id: number) {
    const dataSchool = await this.prisma.schools.findFirst({
      where: {
        id,
      },
    });
    return {
      statusCode: HttpStatus.OK,
      data: dataSchool,
    };
  }

  /**
   * Update School
   * @param id
   * @param updateSchoolDto
   * @returns
   */
  async update(id: number, updateSchoolDto: UpdateSchoolDto) {
    const updateSchool = await this.prisma.schools.update({
      where: {
        id,
      },
      data: updateSchoolDto,
    });
    if (updateSchool) {
      return {
        statusCode: HttpStatus.OK,
        data: updateSchool,
      };
    }
  }

  /**
   * Update School
   * @param id
   * @returns
   */
  async remove(id: number) {
    const deleteSchool = await this.prisma.schools.delete({
      where: {
        id,
      },
    });
    if (deleteSchool) {
      return {
        statusCode: HttpStatus.OK,
        data: deleteSchool,
        message: 'Berhasil delete school',
      };
    }
  }
}
