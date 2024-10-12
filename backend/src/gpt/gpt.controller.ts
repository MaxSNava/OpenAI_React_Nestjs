import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDicusserDto, TextToAudioDto, TranslateDto } from './dto';

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

  @Post('texto-to-audio')
  async textoToAudio(
    @Body() textoToAudioDto:TextToAudioDto,
    @Res() res: Response
  ){
    const filePath = await this.gptService.textoToAudio(textoToAudioDto);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status( HttpStatus.OK );
    res.sendFile(filePath);
  }

  @Get(`texto-to-audio/:fileId`)
  async textoToAudioGet(
    @Param('fileId') text: string,
    @Res() res: Response
  ) {
    const filePath = await this.gptService.textoToAudioGet(text);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status( HttpStatus.OK );
    res.sendFile(filePath);
  }

}
