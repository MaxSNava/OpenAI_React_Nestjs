import { FormEvent, useRef, useState } from "react";
import { PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/24/solid'

interface TextMessageBoxProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string; // image/*
}

export const TextMessageBoxFile = ({onSendMessage, placeholder, disableCorrections=false, accept}: TextMessageBoxProps) => {

  const [message, setmessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const inputFileRef = useRef<HTMLInputElement>(null);

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
      <div className="mr-3">
        <button
          className="flex items-center justify-center text-gray-400 hover:text-gray-600"
          type="button"
          onClick={ () => inputFileRef.current?.click() }
        >
          <PaperClipIcon className="size-5" />
        </button>
        <input 
          type="file"
          ref={inputFileRef}
          accept={accept}
          onChange={ (e) => setSelectedFile(e.target.files?.item(0) || null) }
          hidden
        />
      </div>

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
        <button className="btn-primary" disabled={!selectedFile}>
          {
            (!selectedFile)
            ?<span className="flex gap-x-2 mr-2">Enviar</span>
            :<span className="flex gap-x-2 mr-2">{selectedFile.name.substring(0,7 )+'...'}</span>
          }
          <PaperAirplaneIcon className="size-5" />
        </button>
      </div>

    </form>
  )
}
