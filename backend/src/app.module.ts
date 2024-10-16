import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GptModule } from './gpt/gpt.module';
import { SamAssistentModule } from './sam-assistent/sam-assistent.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GptModule,
    SamAssistentModule
  ]
})
export class AppModule {}
