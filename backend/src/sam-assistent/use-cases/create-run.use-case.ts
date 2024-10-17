import OpenAI from "openai";

interface Options {
  threadId: string;
  assistantId?: string;
}

export const createRunUseCase = async (openAI: OpenAI, options: Options) => {
  const { threadId, assistantId='asst_IFskw8xONJQCZXdCN3HbEns1' } = options;

  const run = await openAI.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    //!instructions:'' /// Sobreescrito por el modelo
  });
  return run;
}