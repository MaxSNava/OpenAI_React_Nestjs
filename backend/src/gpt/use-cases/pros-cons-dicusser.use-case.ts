import OpenAI from "openai";

interface OptionsProps {
  prompt: string;
}

export const prosConsDicusserUseCase = async(openai: OpenAI, {prompt}: OptionsProps) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
          Se te dara una pregunta y tu tarea es responder con los pros y contras 
          la respuesta debe de ser en formato Markdown.
          los pros y contras deben de estar en una lista.
          No debes incluir la conclusión en la respuesta, solo la lista de comparación.
        `,
        name: "pros-cons-discusser"
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 500
  });

  return completion.choices[0].message;
}