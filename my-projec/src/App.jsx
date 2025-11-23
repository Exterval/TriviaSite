
import { useEffect, useState } from "react";
import TriviaGame from "./TriviaGame";

function App() { 

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(()=>{
      async function getQuery(){
        try {
          const resp =  await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple');
          if (!resp.ok) throw new Error(resp.status)
          const data = await resp.json();
          setData(data.results);
        } catch (error) {
            setError(true);
           console.log('Error in fetch question data. ' + error);
          }finally{
            setIsLoading(false);
          }
      }
      getQuery();
    }, [])
  return (
    <>
      {isLoading && <p>Loading game...</p>}
      {error && !data && <p className="text-red-600">Failed to fetch data.</p>} 
      {!isLoading && data && !error && <TriviaGame data={data} />}
    </>
  )
}

export default App
