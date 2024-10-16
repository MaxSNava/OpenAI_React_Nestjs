import { Module } from '@nestjs/common';
import { SamAssistentService } from './sam-assistent.service';
import { SamAssistentController } from './sam-assistent.controller';

@Module({
  controllers: [SamAssistentController],
  providers: [SamAssistentService],
})
export class SamAssistentModule {}
