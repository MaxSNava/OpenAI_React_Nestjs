import { TranslateResponse } from "../../interfaces";

export const translateUseCase = async (prompt: string, lang: string) => {
  try {
    const respo = await fetch(`${import.meta.env.VITE_GPT_API}/translate`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt , lang })
    });
    if(!respo.ok) throw new Error('Error al realizar la petición');
    const data = await respo.json() as TranslateResponse;
    return {
      ok: true,
      ...data
    }
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo completar la operación'
    }
  }
}