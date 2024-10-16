import { useState } from "react"
import { GptMessages, GptMessagesImageSelect, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { imageVariationUseCase } from "../../../core";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  }
}

export const ImageTunningPage = () => {
  const [isloading, setIsloading] = useState(false);

  const [messages, setmessages] = useState<Message[]>([{
    isGpt: true,
    text: 'Hola soy Gpt',
    info: {
      alt: 'Imagen Base',
      imageUrl: 'http://localhost:3000/api/gpt/image-generation/1728950931993.png'
    }
  }]);

  const [originalImageAndMask, setOriginalImageAndMask] = useState({
    originalImage: undefined as string | undefined,
    mask: undefined as string | undefined
  })

  const handleVariation = async() => {
    setIsloading(true);
    const resp = await imageVariationUseCase(originalImageAndMask.originalImage!);
    setIsloading(false);
    if (!resp) return;
    setmessages( (prev) => [...prev, { text: 'Variacion generada', isGpt: true, info: {imageUrl: resp.url, alt: resp.alt} }]);
  }

  const handlePost = async(text: string) => {
    setIsloading(true);
    setmessages( (prev) => [...prev, { text: text, isGpt: false }]);

    const {originalImage} = originalImageAndMask;

    const imageInfo = await imageVariationUseCase(originalImage!);
    
    setIsloading(false);

    if (!imageInfo) return setmessages( (prev) => [...prev, { text: 'Error al generar la imagen', isGpt: true }]);

    setmessages( (prev) => [...prev, { text: text, isGpt: true, info: {imageUrl: imageInfo.url, alt: imageInfo.alt} }]);
  };


  return (
    <>
    {
      originalImageAndMask.originalImage && (
        <div className="fixed flex flex-col items-center top-10 right-10 z-10 fade-in">
          <span>Editando</span>
          <img className="border rounded-xl w-36 h-36 object-contain" src={originalImageAndMask.mask ?? originalImageAndMask.originalImage} alt="Imagen Original" />
          <button onClick={handleVariation} className="btn-primary mt-2">Generar variacion</button>
        </div>
      )
    }
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2">
            <GptMessages text="Hola soy Gpt" />
            {/*? (<GptMessagesImage key={i}  text={message.text} imageUrl={message.info!.imageUrl} alt={message.info!.alt} onImageSelect={url => setOriginalImageAndMask({originalImage: url, mask: undefined})} />) */}
            {
              messages.map( (message, i) => (
                message.isGpt
                ? (<GptMessagesImageSelect key={i}  text={message.text} imageUrl={message.info!.imageUrl} alt={message.info!.alt} onImageSelected={ (url) => setOriginalImageAndMask({originalImage: message.info?.imageUrl, mask: url })} />)
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
    </>
  )
}
