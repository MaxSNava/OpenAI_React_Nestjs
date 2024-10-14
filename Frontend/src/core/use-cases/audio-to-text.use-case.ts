import type { Audio } from "../../interfaces";

export const audioToTextUseCase = async(audioFile: File, prompt?: string) => {
  try {
    const formData = new FormData();
    formData.append('file', audioFile);
    if (prompt) formData.append('prompt', prompt);

    const respo = await fetch(`${import.meta.env.VITE_GPT_API}/audio-to-text`, {
      method: 'POST',
      body: formData,
    });

    const data = await respo.json() as Audio;

    return data;

  } catch (error) {
    return null;
  }
};