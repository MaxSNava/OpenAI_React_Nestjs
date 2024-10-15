import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { GptService } from './gpt.service';
import { AudioToTextDto, ImageGenerationDto, ImageVariationDto, OrthographyDto, ProsConsDicusserDto, TextToAudioDto, TranslateDto } from './dto';

@Controller('gpt')
export class GptController {
  /* 
  1.- El controlador recibe la información de la petición
  2.- Hacer validaciones (asegurarse de que la información venga como se espera)
  3.- Llamar al servicio correspondiente
  */
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() orthographyDto: OrthographyDto) {
    return this.gptService.orthographyCheck(orthographyDto);
  }

  @Post('pros-cons-dicusser')
  prosConsDicusser(@Body() prosConsDicusserDto: ProsConsDicusserDto) {
    return this.gptService.prosConsDicusser(prosConsDicusserDto);
  }

  @Post('pros-cons-dicusser-stream')
  async prosConsDicusserStream(
    @Body() prosConsDicusserDto: ProsConsDicusserDto,
    @Res() res: Response,
  ) {
    const stream =
      await this.gptService.prosConsDicusserStream(prosConsDicusserDto);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);
    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      res.write(piece);
    }
    res.end();
  }

  @Post('translate')
  async translate(@Body() translateDto: TranslateDto) {
    return this.gptService.translate(translateDto);
  }

  @Post('texto-to-audio')
  async textoToAudio(
    @Body() textoToAudioDto: TextToAudioDto,
    @Res() res: Response,
  ) {
    const filePath = await this.gptService.textoToAudio(textoToAudioDto);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Get(`texto-to-audio/:fileId`)
  async textoToAudioGet(@Param('fileId') text: string, @Res() res: Response) {
    const filePath = await this.gptService.textoToAudioGet(text);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Post('audio-to-text')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './generated/uploads',
        filename: (req, file, cb) => {
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `${new Date().getTime()}.${fileExtension}`;
          return cb(null, fileName);
        },
      }),
    }),
  )
  async audioToText(
    @Body() audioToTextDto: AudioToTextDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000 * 1024 * 5,
            message: 'File bigger than 5 MB',
          }),
          new FileTypeValidator({
            fileType: 'audio/*'
          })
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.gptService.audioToText(file, audioToTextDto);
  }

  @Post('image-generation')
  async imageGeneration(
    @Body() imageGenerationDto: ImageGenerationDto,
  ) {
    return await this.gptService.imageGeneration(imageGenerationDto);
  }

  @Get('image-generation/:fileId')
  async imageGenerationGet(
    @Param('fileId') fileId: string,
    @Res() res: Response
  ) {
    const filePath = await this.gptService.imageGenerationGet(fileId);
    res.setHeader('Content-Type', 'image/png');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Post('image-variation')
  async imageVariation(
    @Body() imageVariationDto: ImageVariationDto,
  ) {
    return await this.gptService.imageVariation(imageVariationDto);
  }
}
