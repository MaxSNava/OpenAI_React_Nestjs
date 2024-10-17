import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { checkCompleteStatusUseCase, createMessageUseCase, createRunUseCase, createThreadUseCase, getMessageListUseCase } from './use-cases';
import { QuestionDto } from './dto/question.dto';

@Injectable()
export class SamAssistentService {

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async userQuestion(questionDto: QuestionDto) {
    const { question, threadId } = questionDto;
    const message = await createMessageUseCase(this.openai, {threadId, question});
    const run = await createRunUseCase(this.openai, {threadId});
    await checkCompleteStatusUseCase(this.openai, {threadId, runId : run.id});
    const messages = await getMessageListUseCase(this.openai, {threadId});
    return messages.reverse();
  }
}
