import * as path from "path";
import * as fs from "fs";
import OpenAI from "openai";

interface OptionsProps {
  prompt: string;
  voice?: string;
}

export const textToAudioUseCase = async (openai: OpenAI, {prompt, voice}: OptionsProps) => {
  const voices = {
    'alloy': 'alloy',
    'echo': 'echo',
    'fable': 'fable',
    'onyx': 'onyx',
    'nova': 'nova',
    'shimmer': 'shimmer'
  };

  const selectedVoice = voices[voice] ?? 'alloy';

  const folderPath = path.resolve(__dirname, '../../../generated/audio');
  const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);

  fs.mkdirSync(folderPath, { recursive: true });

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1-hd',
    voice: selectedVoice,
    input: prompt,
    response_format: 'mp3',
  })

  const buffer = Buffer.from(await mp3.arrayBuffer() );
  fs.writeFileSync( speechFile, buffer );

  return speechFile;
}