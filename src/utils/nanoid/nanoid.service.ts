import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class NanoidService {
  get() {
    return nanoid()
  }
}
