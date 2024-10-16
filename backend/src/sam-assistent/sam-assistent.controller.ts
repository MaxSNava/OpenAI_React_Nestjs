import { Body, Controller, Post } from '@nestjs/common';
import { SamAssistentService } from './sam-assistent.service';
import { QuestionDto } from './dto/question.dto';

@Controller('sam-assistent')
export class SamAssistentController {
  constructor(private readonly samAssistentService: SamAssistentService) {}

  @Post('create-thread')
  async createThread() {
    return 'this.samAssistentService.createThread();';
  }

  @Post('user-question')
  async userQuestion(
    @Body() questionDto: QuestionDto,
  ) {
    return questionDto; 
  }
}
