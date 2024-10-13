export const textToAudioUseCase = async(prompt: string, voice: string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/texto-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt, voice })
    });

    if(!resp.ok) throw new Error('Error al realizar la petición');

    const audioFile = await resp.blob();
    const aduioURL = URL.createObjectURL(audioFile);

    return {
      ok: true,
      message: prompt,
      aduioURL: aduioURL
    }
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo completar la operación',
      aduioURL: ''
    }
  }
};