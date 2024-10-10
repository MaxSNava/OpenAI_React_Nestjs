import { useState } from "react"
import { GptMessages, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { proConsDiscussUseCase } from "../../../core";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    role?: string;
    content: string;
    refasial?: string;
  };
}

export const ProsConsPage = () => {

  const [isloading, setIsloading] = useState(false);
  const [messages, setmessages] = useState<Message[]>([]);

  const handlePost = async(text: string) => {
    setIsloading(true);
    setmessages( (prev) => [...prev, { text: text, isGpt: false }]);
    const data = await proConsDiscussUseCase(text);
    if (!data.ok) {
      setmessages( (prev) => [...prev, { text: 'Not data', isGpt: true }]);
    } else {
      setmessages( (prev) => [...prev, { text: data.content, isGpt: true, info: {content: data.content} }]);
    }
    setIsloading(false);
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages text="Hola soy Gpt" />
          {
            messages.map( (message, i) => (
              message.isGpt
                ? (<GptMessages key={i}  text={message.info!.content} />)
                : (<MyMessage key={i} text={message.text} />)
            ))
          }
          {
            isloading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
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
