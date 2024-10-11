export const proConsDiscussStreamUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-dicusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
      // TODO: mandar el abortsignal
    });

    if (!resp.ok) throw new Error('Error al realizar la petición');

    const reader = resp.body?.getReader();
    if (!reader) {
      console.log('No reader');
      return null;
    }

    return reader;

  } catch (error) {
    console.log('Error', error);
    return null;
  }
};