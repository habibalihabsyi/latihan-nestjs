import { Injectable } from '@nestjs/common';

@Injectable()
export class LatihanService {
  getLatihan() {
    return {
      message: 'Latihan',
    };
  }
}
