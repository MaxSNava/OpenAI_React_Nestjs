import { useState } from "react";
import { GptMessages, GptOrthographyMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components";
import { orthographyUseCase } from "../../../core";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

export const OrthographyPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMesssage] = useState<Message[]>([]);

  const handlePost = async(text: string) => {
    setIsLoading(true);
    setMesssage( (prev) => [...prev, { text: text, isGpt: false }]);
    const {ok, errors, message, userScore} = await orthographyUseCase(text);
    if (!ok) {
      setMesssage( (prev) => [...prev, { text: 'Not data', isGpt: true }]);
    } else {
      setMesssage( (prev) => [...prev, { text: message, isGpt: true, info: {errors, message, userScore} }]);
    }
    setIsLoading(false);
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
                ? (<GptOrthographyMessage key={index} errors={message.info!.errors} message={message.info!.message} userScore={message.info!.userScore} />)
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
