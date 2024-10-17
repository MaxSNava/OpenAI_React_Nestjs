import { useEffect, useState } from "react";
import { GptMessages, MyMessage, TextMessageBox, TypingLoader } from "../../components";
import { createThreadUseCase, postQuestionUseCase } from "../../../core";

interface Message {
  text: string;
  isGpt: boolean;
}

export const AssistantPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMesssage] = useState<Message[]>([]);

  const [threadId, setThreadId] = useState<string>();

  useEffect(() => {
    const threadId = localStorage.getItem('threadId'); 
    if (threadId){
      setThreadId(threadId);
    }else{
      createThreadUseCase()
      .then( (id) => {
        setThreadId(id);
        localStorage.setItem('threadId', id);
      })
    }
  }, [])

  useEffect(() => {
    if(threadId) setMesssage( (prev) => [...prev, { text: `Numero de thread ${threadId}`, isGpt: true }]);
  }, [threadId])
  

  const handlePost = async(text: string) => {
    if (!threadId) return;
    setIsLoading(true);
    setMesssage( (prev) => [...prev, { text: text, isGpt: false }]);
    const replies = await postQuestionUseCase(threadId, text);
    setIsLoading(false);
    for (const reply of replies) {
      for (const message of reply.content) {
        setMesssage( (prev) => [...prev, { text: message, isGpt: (reply.role === 'assistant'), info: reply }]);
      }
      
    }
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
                ? (<GptMessages text={message.text} key={index} />)
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
