import "./TypingLoader.css";

interface TypingLoaderProps {
  namess?: string;
}

export const TypingLoader = ({namess}: TypingLoaderProps) => {
  return (
    <div className={`typing ${namess}`}>
      <span className="circle scaling"></span>
      <span className="circle scaling"></span>
      <span className="circle scaling"></span>
    </div>
  )
}
