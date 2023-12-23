import { Module } from '@nestjs/common';
import { NanoidService } from './nanoid.service';

@Module({
  providers: [NanoidService],
  exports: [NanoidService]
})
export class NanoidModule {}
