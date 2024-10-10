import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto } from './dto';

@Controller('gpt')
export class GptController {
  /* 
  1.- El controlador recibe la información de la petición
  2.- Hacer validaciones (asegurarse de que la información venga como se espera)
  3.- Llamar al servicio correspondiente
  */
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(
    @Body() orthographyDto: OrthographyDto
  ){
    return this.gptService.orthographyCheck(orthographyDto);
  }

}
