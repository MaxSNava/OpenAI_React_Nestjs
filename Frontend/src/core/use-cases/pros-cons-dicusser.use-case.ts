import { ProConsDiscussResponse } from "../../interfaces";

export const proConsDiscussUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-dicusser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!resp.ok) throw new Error('Error al realizar la petición');

    const data = await resp.json() as ProConsDiscussResponse;

    return {
      ok: true,
      ...data
    }
  } catch (error) {
    return {
      ok: false,
      content: 'No se pudo completar la operación'
    }
  }
};