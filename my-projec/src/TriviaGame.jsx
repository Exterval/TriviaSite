// a React + Bootstrap/Tailwind trivia game website
import { useEffect, useState } from "react";

export default function TriviaGame(props) {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [triviaDone, setTriviaDone] = useState(false);
    let [count, setCount] = useState(0);
    let [choices, setChoices] = useState([]);   
    let [score, setScore] = useState(0);
    let [wrongAnswers, setWrongAnswers] = useState([]);

    useEffect(() => {
        if(count >= 10){
          setTriviaDone(true);
           return alert('Thank you for playing! :)');
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
           // This will trigger the useEffect above
            setScore(s => s+1);
        }else{
            setWrongAnswers([currentQuestion.])
        }
        setCount(c => c + 1);
    }

    //eliminate symbol fallbacks
    function properString(html = "") {
      return new DOMParser().parseFromString(html, "text/html").documentElement.textContent;
    }

    return(
      !triviaDone ? 
        <div className="@container h-screen bg-slate-200 flex flex-col justify-center m-auto">
                <h1 className="text-zinc-500 text-6xl text-center m-3 font-serif ">Trivia</h1>
                <div className="@container w-full h-1/4 bg-zinc-700 flex flex-col justify-center items-center p-4">
                    <h2 className="text-center text-2xl mt-4 text-zinc-200">Question #{count+1} <br />
                    {properString(currentQuestion.question)}
                    </h2>
                          <div className="flex flex-row justify-center my-5">
                              {choices.map((choice, ind) => (
                                    <button key={ind} className="bg-zinc-100 p-2 mx-2 rounded-md hover:bg-zinc-300 hover:-translate-y-0.5 hover:shadow-lg shadow-zinc-600" onClick={(e) => handleAssessAnswer(e)} style={{transition: '0.5s ease'}}>
                                      {properString(choice)}
                                      </button>
                              ))}
                          </div>
                </div>
          </div> : 
          <div className="@container h-screen bg-zinc-700 flex flex-col justify-center m-auto" style={{transition: "0.5s ease-out"}}>
            <h1 className="text-zinc-100 text-6xl text-center m-3 font-serif" style={{transition: "0.7s ease-out"}}>Trivia done!</h1>
            <h2 className="text-zinc-100 text-4xl text-center m-3 font-serif" style={{transition: "0.7s ease-out"}}>You got: <span style={{color: score > 5 ? "lime" : "red", transition: "1s ease-in"}}>{score}</span> right!</h2>
          </div>
          
    );
};
