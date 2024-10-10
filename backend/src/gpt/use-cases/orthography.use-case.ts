/*
  Aqui hacemos la conecion a Open AI
*/
import OpenAI from "openai";

interface OptionsProps {
  prompt: string;
}

export const orthographyCheckUseCase = async(openai: OpenAI, options: OptionsProps) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", 
        content: `Te serán proveídos textos en Español con posibles errores ortográficos y gramaticales,
          tu tarea es responder en formato JSON con la corrección de los errores.
          Debes corregir los errores ortográficos, gramaticales y retornar soluciones,
          también debes dar un porcentaje de acierto por el usuario.
          Si no encontraste errores, debes retornar un mensaje indicando que no hay errores y felicitar al usuario.
          Ejemplo de respuesta:
          {
            userScore: number,
            errors: string[], // ['error -> solución']
            message: string // Usa emojis para felicitar al usuario
          }`,
        name: "orthography-check"
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.3,
    max_tokens: 250,
  });

  const jsonResp = JSON.parse(completion.choices[0].message.content);

  return jsonResp;
};