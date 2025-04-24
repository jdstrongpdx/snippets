import './App.css'
import {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap'

interface CardData {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuizData {
  playing: boolean;
  score: number;
  completed: boolean;
}

const data = [{"type":"multiple","difficulty":"hard","category":"General Knowledge","question":"If someone said &quot;you are olid&quot;, what would they mean?","correct_answer":"You smell extremely unpleasant.","incorrect_answers":["You are out of shape\/weak.","Your appearance is repulsive.","You are incomprehensible\/an idiot."]},{"type":"multiple","difficulty":"hard","category":"General Knowledge","question":"The word &quot;abulia&quot; means which of the following?","correct_answer":"The inability to make decisions","incorrect_answers":["The inability to stand up","The inability to concentrate on anything","A feverish desire to rip one&#039;s clothes off"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"What was the name given to Japanese military dictators who ruled the country through the 12th and 19th Century?","correct_answer":"Shogun","incorrect_answers":["Ninja","Samurai","Shinobi"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Which of these words means &quot;idle spectator&quot;?","correct_answer":"Gongoozler","incorrect_answers":["Gossypiboma","Jentacular","Meupareunia"]},{"type":"multiple","difficulty":"easy","category":"General Knowledge","question":"Which American-owned brewery led the country in sales by volume in 2015?","correct_answer":"D. G. Yuengling and Son, Inc","incorrect_answers":["Anheuser Busch","Boston Beer Company","Miller Coors"]},{"type":"multiple","difficulty":"easy","category":"General Knowledge","question":"When one is &quot;envious&quot;, they are said to be what color?","correct_answer":"Green","incorrect_answers":["Red","Blue","Yellow"]},{"type":"multiple","difficulty":"easy","category":"General Knowledge","question":"Which of the following is the IATA code for Manchester Airport?","correct_answer":"MAN","incorrect_answers":["EGLL","LHR","EGCC"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"What did the Spanish autonomous community of Catalonia ban in 2010, that took effect in 2012?","correct_answer":"Bullfighting","incorrect_answers":["Fiestas","Flamenco","Mariachi"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Apple co-founder Steve Jobs died from complications of which form of cancer?","correct_answer":"Pancreatic","incorrect_answers":["Bone","Liver","Stomach"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"What is the full title of the Prime Minister of the UK?","correct_answer":"First Lord of the Treasury","incorrect_answers":["Duke of Cambridge","Her Majesty&#039;s Loyal Opposition","Manager of the Crown Estate"]}]
const url = "https://opentdb.com/api.php?amount=10&category=9&type=multiple"

const initialQuizData = {
  playing: false,
  score: 0,
  completed: false
}

function App() {
  const [cardData, setCardData] = useState<CardData[]>([])
  const [quizData, setQuizData] = useState<QuizData>(initialQuizData)
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<CardData | undefined>(undefined)
  const [currentQuestions, setCurrentQuestions] = useState<string[]>([])


  function handleStartQuiz() {
    const startingQuizData = {...initialQuizData, playing: true}
    setQuizData(startingQuizData)
  }

  function handleResetQuiz() {
    setQuizData(initialQuizData)
    setCardIndex(0)
  }

  function handleAnswer(answer: string) {
    const isCorrect = currentCard?.correct_answer === answer;
  
    // Compute the updated score and quiz state in one go
    setQuizData(prev => {
      const updatedScore = isCorrect ? prev.score + 1 : prev.score;
      const isLastCard = cardIndex >= cardData.length - 1;
  
      // Show alerts (outside state update to avoid batching conflicts)
      alert(isCorrect ? "Correct" : "Incorrect");
  
      return {
        ...prev,
        score: updatedScore,
        playing: !isLastCard,
        completed: isLastCard,
      };
    });
  
    // Move to the next question if there is one
    if (cardIndex < cardData.length - 1) {
      setCardIndex(prev => prev + 1);
    }
  }

  useEffect(() => {
    function getData() {
      return fetch(url)
        .then(res => res.json())
        .then(data => setCardData(data.results))
        .catch(err => console.error("Error fetching data: ", err))
    }
    getData()
  }, [])

  useEffect(() => {
    if (cardData) setCurrentCard(cardData[cardIndex]);
  }, [cardIndex, cardData])

  useEffect(() => {
    if (currentCard) setCurrentQuestions([...currentCard.incorrect_answers, currentCard.correct_answer]);
  }, [currentCard])

  // QUIZ COMPLETED
  if (quizData.completed) return (
    <>
      <h1>Quiz Complete!</h1>
      <h3 style={{"color": "darkBlue"}}>Your Score Was: {quizData.score}/{cardIndex}</h3>
      <br></br>
      <h3 style={{"color": "darkGreen"}}>Press Reset to restart Quiz</h3>
      <Button variant="warning" onClick={handleResetQuiz}>Reset</Button>
    </>
  )

  // QUIZ NOT STARTED
  else if (!quizData.playing) return (
    <>
      <h1>Quiz App</h1>
      <h3>Press Start to begin Quiz</h3>
      <Button variant="success" onClick={handleStartQuiz}>Start</Button>
    </>
  )

  // QUIZ IN PROGRESS
  else return (
    <>
    <h1>Quiz App</h1>
    <br></br>
    <h3 style={{"color": "darkGreen"}}>Press Reset to restart Quiz</h3>
    <h3 style={{"color": "darkBlue"}}>Score: {quizData.score}/{cardIndex}</h3>

    <div className='flashcard'>
      <h1>Question:</h1>
      {
        !currentCard ? <h4>Loading...</h4> :
        (
          <>
            <h4>{currentCard.question}</h4>
            {currentQuestions.map((answer, index) => (
              <>
                <Button 
                  className="mt-3" 
                  key={index}
                  onClick={() => handleAnswer(answer)}
                  >{answer}</Button>
                <br></br>
              </>
            ))}
          </>

        )
      }

    </div>

    <Button variant="warning" onClick={handleResetQuiz}>Reset</Button>
  </>
  )
}

export default App
