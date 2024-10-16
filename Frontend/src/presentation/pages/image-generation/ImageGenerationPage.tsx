import { useState } from "react"
import { GptMessages, GptMessagesImage, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { imageGenerationUseCase } from "../../../core";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  }
}

export const ImageGenerationPage = () => {

  const [isloading, setIsloading] = useState(false);
  const [messages, setmessages] = useState<Message[]>([]);

  const handlePost = async(text: string) => {
    setIsloading(true);
    setmessages( (prev) => [...prev, { text: text, isGpt: false }]);

    const imageInfo = await imageGenerationUseCase(text);
    
    setIsloading(false);

    if (!imageInfo) return setmessages( (prev) => [...prev, { text: 'Error al generar la imagen', isGpt: true }]);

    setmessages( (prev) => [...prev, { text: text, isGpt: true, info: {imageUrl: imageInfo.url, alt: imageInfo.alt} }]);
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages text="Hola soy Gpt" />
          {
            messages.map( (message, i) => (
              message.isGpt
                ? (<GptMessagesImage key={i}  text={message.text} imageUrl={message.info!.imageUrl} alt={message.info!.alt} />)
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
