import { useState } from "react"
import { GptMessages, MyMessage, TextMessageBoxSelect, TypingLoader } from "../../components";
import { translateUseCase } from "../../../core";

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

interface Message {
  text: string;
  isGpt: boolean;
}

export const TranslatePage = () => {

  const [isloading, setIsloading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async(text: string, selectedOption: string) => {
    setIsloading(true);
    setMessages( (prev) => [...prev, { text: text, isGpt: false }]);
    const {ok, message} = await translateUseCase(text, selectedOption);
    if (!ok) {
      setMessages( (prev) => [...prev, { text: 'Not data', isGpt: true }]);
    } else {
      setMessages( (prev) => [...prev, { text: message, isGpt: true, info: {message} }]);
    }
    setIsloading(false);
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages text="Hola soy Gpt" />
          {
            messages.map( (message, index) => (
              message.isGpt 
                ? (<GptMessages key={index} text={message.text} />)
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
      <TextMessageBoxSelect
        onSendMessage={handlePost} 
        placeholder="Escribe lo que deseas" 
        disableCorrections 
        option={languages}
      />
    </div>
  )
}
