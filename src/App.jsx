import { useEffect, useRef, useState } from 'react';
import './App.css';
import {PHRASES} from '../src/phrases.js';
import carIcon from './assets/car.png'

function App() {

  const [isValid, setIsValid] = useState(true);
  const [textlenght, setTextLength] = useState(0);
  const [finish, setFinish] = useState(false);
  const [phrase, setPhrase] = useState(PHRASES[Math.floor(Math.random() * PHRASES.length)].q);
  const [changePhrase, setChangePhrase] = useState(false);

  const userText = useRef();

  useEffect( ()=>{
    const newIndex = Math.floor(Math.random() * PHRASES.length);
    setPhrase(PHRASES[newIndex].q);
    userText.current.focus()
  }, [changePhrase] )

  function handleUserInput(){
    const index = userText.current.value.length - 1;
    if(phrase.charAt(index) == userText.current.value.charAt(index)){
      setIsValid(true);
      setTextLength(index + 1);
      if(phrase.length === (index + 1)){
        setFinish(true);
      }
    }else{
      setIsValid(false);
    }
  }

  function resetPage(){
    setIsValid(true);
    setTextLength(0);
    setFinish(false);
    setChangePhrase(prevState=>prevState ? false : true);
    userText.current.value = '';
  }

  // console.log((Math.floor(100 / phrase.length)));

  return (
    <>
      <div className='container mx-auto flex flex-col items-center py-20'>

        <p className='w-1/3 mx auto py-10 text-2xl'>{phrase}</p>

        <div className='relative w-1/3 my-10'>
          <progress 
            className="w-full" 
            max={phrase.length} 
            value={textlenght}
          />
          <img key={Math.random()} src={carIcon} alt="" className='absolute bottom-6 w-20' style={{ 
            left: ( ((Math.floor(100 / phrase.length))) * textlenght + "%")
           }} />
        </div>

        <input 
          ref={userText} 
          onInput={handleUserInput} 
          type="text" 
          placeholder="In attesa dell'utente..." 
          className={isValid ? "w-1/3 p-2 border border-black rounded-md shadow-md focus:border-none focus:outline-green-500" : "w-1/3 p-2 border border-black rounded-md shadow-md focus:border-none focus:outline-red-500"}
          disabled={finish}
        />

        { finish && <>
          <p className='text-center text-green-700 mt-10 text-2xl font-bold'>Complimenti hai superato il test!</p>
          <button onClick={resetPage} className='bg-sky-900 text-slate-50 px-5 py-2 rounded-md shadow-md mt-5'>Prova ancora!</button>
        </> }

      </div>
    </>
  )
}

export default App
