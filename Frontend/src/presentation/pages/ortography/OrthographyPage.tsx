import { useState } from "react";
import { GptMessages, MyMessage, TextMessageBox, TypingLoader } from "../../components";

interface Message {
  text: string;
  isGpt: boolean;

}

export const OrthographyPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMesssage] = useState<Message[]>([]);

  const handlePost = async(text: string) => {
    setIsLoading(true);
    setMesssage( (prev) => [...prev, { text: text, isGpt: false }]);
    // TODO: useCase
    setIsLoading(false);
    // TODO: añadir respuesta de Gpt
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* - */}
          <GptMessages text="Hola soy Gpt" />
          {
            messages.map( (message, index) => (
              message.isGpt 
                ? (<GptMessages text="Esto es de OpenAI" key={index} />)
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
      <TextMessageBox 
        onSendMessage={handlePost} 
        placeholder="Escribe lo que deseas" 
        disableCorrections 
      />
    </div>
  )
}
