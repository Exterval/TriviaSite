
import { useEffect, useState } from "react";
import TriviaGame from "./TriviaGame"
function App() { 

  const [data, setData] = useState(null);

  useEffect(()=>{
      async function getQuery(){
        try {
          const resp =  await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple');
          const data = await resp.json();
          setData(data.results);
          } catch (error) {
            console.error('Error in fetch question data. ' + error);
          }
      }
      getQuery();
    }, [])
  return (
    <>
      {data && data.length > 0 ? <TriviaGame data={data}/> : <p>Loading game...</p>} 
    </>
  )
}

export default App
