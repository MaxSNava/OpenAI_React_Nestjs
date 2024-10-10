import { FormEvent, useState } from "react";
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

interface TextMessageBoxProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
}

export const TextMessageBox = ({onSendMessage, placeholder, disableCorrections=false}: TextMessageBoxProps) => {

  const [message, setmessage] = useState('');

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim().length === 0) return;
    onSendMessage(message);
    setmessage('');
  }

  return (
    <form
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
      onSubmit={handleSendMessage}
    >

      <div className="flex-grow">
        <div className="relative w-full">
          <input 
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10" 
            autoFocus 
            type="text" 
            name="message" 
            value={message}
            onChange={ (e) => { setmessage(e.target.value) } }
            placeholder={placeholder} autoComplete={disableCorrections ? 'on' : 'off'} 
            autoCorrect={disableCorrections ? 'on' : 'off'} 
            spellCheck={disableCorrections ? 'true' : 'false'}
          />
        </div>
      </div>

      <div className="ml-4">
        <button className="btn-primary">
          <span className="flex gap-x-2 mr-2">
            <PaperAirplaneIcon className="size-5" />
            Enviar
          </span>
        </button>
      </div>

    </form>
  )
}
