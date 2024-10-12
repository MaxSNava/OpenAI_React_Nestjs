import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDicusserDto, TranslateDto } from './dto';

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

  @Post('pros-cons-dicusser')
  prosConsDicusser(
    @Body() prosConsDicusserDto: ProsConsDicusserDto
  ){
    return this.gptService.prosConsDicusser(prosConsDicusserDto);
  }

  @Post('pros-cons-dicusser-stream')
  async prosConsDicusserStream(
    @Body() prosConsDicusserDto: ProsConsDicusserDto,
    @Res() res: Response
  ){
    const stream = await this.gptService.prosConsDicusserStream(prosConsDicusserDto);
    res.setHeader('Content-Type', 'application/json');
    res.status( HttpStatus.OK );
    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      res.write(piece);
    }
    res.end();
  }

  @Post('translate')
  async translate(
    @Body() translateDto:TranslateDto
  ){
    return this.gptService.translate(translateDto);
  }

}
