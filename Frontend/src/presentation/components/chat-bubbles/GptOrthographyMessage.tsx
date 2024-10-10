interface GptOrthographyMessageProps {
  userScore: number;
  errors: string[];
  message: string;
}

export const GptOrthographyMessage = ({userScore, errors, message}: GptOrthographyMessageProps) => {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          G
        </div>
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          <h3>{userScore}</h3>
          <ul>
            {
              errors.map( (error, i) => (
                <li key={i}>{error}</li>
              ))
            }
          </ul>
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}
