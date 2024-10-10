import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dto';
import OpenAI from 'openai';

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

  async orthographyCheck(orthographyDto: OrthographyDto){
    return await orthographyCheckUseCase( this.openai, {prompt: orthographyDto.prompt});
  }

}
