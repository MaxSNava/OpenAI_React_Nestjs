import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';

@Injectable()
export class GptService {
  /*
  ! Solo va a llamar casos de usos 
  0.- Tenemos información global (objeto de OpenAI) para que sea solo 1 instancia
  1.- El servicio recibe la información del controlador
  2.- Llama a los casos de uso
  */

  async orthographyCheck(){
    return await orthographyCheckUseCase();
  }

}
