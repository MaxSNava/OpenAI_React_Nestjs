import { useState } from "react";
import { GptMessages, GptMessagesAudio, MyMessage, TextMessageBoxFile, TypingLoader } from "../../components";
import { audioToTextUseCase } from "../../../core";


interface Message {
  text: string;
  isGpt: boolean;
}

export const AudioToTextPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMesssage] = useState<Message[]>([]);

  const handlePost = async(text: string, audioFile: File) => {
    setIsLoading(true);
    setMesssage( (prev) => [...prev, { text: text, isGpt: false }]);
    const respo = await audioToTextUseCase(audioFile, text);
    setIsLoading(false);
    if (!respo) return;
    const gpyMessage = `
## El texto del audio es:
__Duración:__ ${Math.round(respo.duration)}
### Texto:
${respo.text}
`;
    setMesssage( (prev) => [...prev, { text: gpyMessage, isGpt: true }]);
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages text="Audios generados por AI" />
          {
            messages.map( (message, index) => (
              message.isGpt 
                ? (<GptMessages key={index} text={message.text}/>)
                : (<MyMessage text={message.text} key={index} />)
            ))
          }
          {
            isloading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader/>
              </div>
            )
          }
        </div>
      </div>

      <TextMessageBoxFile
        placeholder="Escribe lo que deseas" 
        accept="audio/*"
        onSendMessage={handlePost}
      />
    </div>
  )
}
