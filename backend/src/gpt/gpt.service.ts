import * as path from "path";
import * as fs from "fs";
import { Injectable, NotFoundException } from '@nestjs/common';
import OpenAI from 'openai';
import { orthographyCheckUseCase, prosConsDicusserUseCase, prosConsDicusserStreamUseCase, translateUseCase, textToAudioUseCase, audioToTextUseCase, imageGenerationUseCase } from './use-cases';
import { AudioToTextDto, ImageGenerationDto, OrthographyDto, ProsConsDicusserDto, TextToAudioDto, TranslateDto } from './dto';


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

  async translate(translateDto: TranslateDto) {
    return await translateUseCase(this.openai, {prompt: translateDto.prompt, lang: translateDto.lang});
  }

  async textoToAudio(textToAudioDto: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, textToAudioDto);
  }

  async textoToAudioGet(texto: string){
    const filePath = path.resolve(__dirname, '../../generated/audio/', `${texto}.mp3`);
    const wasFound = fs.existsSync(filePath)
    if (!wasFound) throw new NotFoundException(`File ${texto}.mp3 not found`);
    return filePath;
  }

  async audioToText(audioFile: Express.Multer.File, audioToTextDto: AudioToTextDto) {
    const { prompt } = audioToTextDto;
    return await audioToTextUseCase(this.openai, {audioFile, prompt});
  }

  async imageGeneration(imageGenerationDto: ImageGenerationDto){
    return await imageGenerationUseCase(this.openai, imageGenerationDto);
  }

  async imageGenerationGet(fileId: string){
    const filePath = path.resolve(__dirname, '../../generated/images/', `${fileId}`);
    const wasFound = fs.existsSync(filePath)
    if (!wasFound) throw new NotFoundException(`File ${fileId}.png not found`);
    return filePath;
  }

}
