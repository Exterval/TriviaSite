// a React + Bootstrap/Tailwind trivia game website
import { useEffect, useState } from "react";

export default function TriviaGame(props) {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({});
    let [count, setCount] = useState(0);
    let [choices, setChoices] = useState([]);   

    useEffect(() => {
        if(count >= 10){
           return alert('There are no more questions.');
        }   
        const currQues = questions[count];
        if (!currQues) return;
        setCurrentQuestion(currQues);
        setChoices([...(currQues.incorrect_answers || []), currQues.correct_answer].sort(() => Math.random() - 0.5));
    }, [count, questions]); // Re-run when count changes

     useEffect(()=>{
        if(!props.data){
          return;
        }else{
          setQuestions(props.data);
        } 
     },[props])

    //check if answer is right or no
    function handleAssessAnswer(event){
        if(String(event.target.textContent) === properString(currentQuestion.correct_answer)){
            setCount(c => c + 1); // This will trigger the useEffect above
        }
    }

    //eliminate symbol fallbacks
    function properString(html = "") {
      return new DOMParser().parseFromString(html, "text/html").documentElement.textContent;
    }

    return(
          <div className="@container h-screen bg-amber-400 flex flex-col justify-center m-auto">
                <h1 className="text-red-500 text-6xl text-center m-3">Trivia</h1>
                <div className="@container w-full h-1/4 bg-amber-500 flex flex-col justify-center items-center p-4">
                    <h2 className="text-center text-2xl mt-4">Question #{count+1} <br />
                    {properString(currentQuestion.question)}
                    </h2>
                          <div className="flex flex-row justify-center my-5">
                              {choices.map((choice, ind) => (
                                    <button key={ind} className="bg-amber-700 p-3 mx-2 hover:bg-amber-300 hover:-translate-y-0.5 hover:shadow-lg shadow-amber-600" onClick={(e) => handleAssessAnswer(e)} style={{transition: '0.5s ease'}}>
                                      {properString(choice)}
                                      </button>
                              ))}
                          </div>
                </div>
          </div>
    );
};
