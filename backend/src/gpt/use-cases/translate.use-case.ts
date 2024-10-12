import OpenAI from "openai";

interface OptionsProps {
  prompt: string;
  lang: string;
}

export const translateUseCase = async(openai: OpenAI, options: OptionsProps) => {
  const { prompt, lang } = options;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system",
        content:`Traduce el siguiente texto al idioma ${lang}:${ prompt }`,
        name: "translate"
      },
      {role: "user", content: prompt}
    ],
    temperature: 0.4,
    max_tokens: 250,
  });

  return {message: completion.choices[0].message.content};
}