export async function* proConstreamGeneratorUseCase (prompt: string, abortSignal: AbortSignal) {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-dicusser-stream`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ prompt }),
      signal: abortSignal
    });
    if (!resp.ok) throw new Error('Error al realizar la petición');
    const reader = resp.body?.getReader();
    if (!reader) return null;

    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
      yield text;
    }

  } catch (error) {
    console.log('Error', error);
    return null;
  }
};