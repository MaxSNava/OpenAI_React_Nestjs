import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { orthographyCheckUseCase, prosConsDicusserUseCase, prosConsDicusserStreamUseCase } from './use-cases';
import { OrthographyDto, ProsConsDicusserDto } from './dto';

@Injectable()
export class GptService {
  /*
  ! Solo va a llamar casos de usos 
  0.- Tenemos información global (objeto de OpenAI) para que sea solo 1 instancia
  1.- El servicio recibe la información del controlador
  2.- Llama a los casos de uso
  */

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase( this.openai, {prompt: orthographyDto.prompt});
  }

  async prosConsDicusser({prompt}: ProsConsDicusserDto) {
    return await prosConsDicusserUseCase(this.openai, {prompt});
  }

  async prosConsDicusserStream({prompt}: ProsConsDicusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, {prompt});
  }

}
