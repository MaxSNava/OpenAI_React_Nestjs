import { useState } from "react";
import { GptMessages, GptMessagesAudio, MyMessage, TextMessageBoxSelect, TypingLoader } from "../../components";
import { textToAudioUseCase } from "../../../core";

const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
]

interface TextMessage {
  text: string;
  type: 'text';
  isGpt: boolean;
}

interface AudioMessage {
  text: string;
  isGpt: boolean;
  audio: string;
  type: 'audio';
}

type Message = TextMessage | AudioMessage;

export const TextToAudioPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMesssage] = useState<Message[]>([]);

  const handlePost = async(text: string, selectedVoice: string) => {
    setIsLoading(true);
    setMesssage( (prev) => [...prev, { text: text, isGpt: false, type: 'text' }]);
    const {ok, message, aduioURL} = await textToAudioUseCase(text, selectedVoice);
    setIsLoading(false);
    if (!ok) return;
    setMesssage( (prev) => [...prev, { text: `${selectedVoice} - ${message}`, isGpt: true, type: 'audio', audio: aduioURL! }]);
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages text="Audios generados por AI" />
          {
            messages.map( (message, index) => 
              message.isGpt 
                ? (
                  message.type === 'audio'
                    ? (<GptMessagesAudio text={message.text} audio={message.audio} key={index} />)
                    : (<GptMessages text={message.text} key={index} />)
                )
                : (<MyMessage text={message.text} key={index} />)
            )
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
        option={voices}
      />
    </div>
  )
}
