import { useRef, useState } from "react"
import { GptMessages, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { proConstreamGeneratorUseCase } from "../../../core";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {

  const abortController = useRef( new AbortController() );
  const isRunning = useRef(false);

  const [isloading, setIsloading] = useState(false);
  const [messages, setmessages] = useState<Message[]>([]);

  const handlePost = async(text: string) => {
    if (isRunning.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }
    setIsloading(true);
    isRunning.current = true;
    setmessages( (prev) => [...prev, { text: text, isGpt: false }]);
    const stream = proConstreamGeneratorUseCase(text, abortController.current.signal);
    setIsloading(false);
    setmessages( (prev) => [...prev, { text: '', isGpt: true }]);
    for await (const text of stream) {
      setmessages( (prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = text;
        return newMessages;
      });
    }
    isRunning.current = false;
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages text="Hola soy Gpt" />
          {
            messages.map( (message, i) => (
              message.isGpt
                ? (<GptMessages key={i} text={message.text} />)
                : (<MyMessage key={i} text={message.text}/>)
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
