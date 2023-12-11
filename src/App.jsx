import { useEffect, useRef, useState } from 'react';
import './App.css';
import {PHRASES} from '../src/phrases.js';
import carIcon from './assets/car.png';

function App() {

  const generalIndex = Math.floor(Math.random() * PHRASES.length);
  const [isValid, setIsValid] = useState(true);
  const [textlenght, setTextLength] = useState(0);
  const [finish, setFinish] = useState(false);
  const [phrase, setPhrase] = useState(PHRASES[generalIndex].q);
  const [obj, setObj] = useState(PHRASES[generalIndex]);
  const [changePhrase, setChangePhrase] = useState(false);

  const userText = useRef();

  useEffect( ()=>{
    const newIndex = Math.floor(Math.random() * PHRASES.length);
    setPhrase(PHRASES[newIndex].q);
    setObj(PHRASES[newIndex]);
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

  return (
    <>
      <div className='container mx-auto flex flex-col items-center py-20'>

        <p className={finish ? 'w-1/3 mx auto text-2xl italic text-center text-slate-50 animate-bounce' : 'w-1/3 mx auto py-10 text-slate-50 text-2xl'}>{finish ? "'" + phrase + "'" : phrase}</p>

        {!finish && <>
        <div className='relative w-1/3 my-1' id='road'>
          <progress 
            className="w-full absolute bottom-0" 
            max={phrase.length} 
            value={textlenght}
          />
          <img key={Math.random()} src={carIcon} alt="" className='absolute bottom-6 w-20 animate-pulse ease-in-out' style={{ 
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
        </>}

        { finish && <>
          <p className='text-center text-green-400 mt-10 text-2xl font-bold'>Complimenti hai superato il test!</p>
          <button onClick={resetPage} className='bg-pink-400 hover:bg-slate-50 hover:text-pink-400 text-slate-50 px-5 py-2 rounded-md shadow-md mt-5 animate-pulse'>Prova ancora!</button>
          
          <div className='w-1/3 px-3 py-7 border-slate-50/50 backdrop-blur-xl border bg-gradient-to-r from-purple-600/50 to-purple-900/50 rounded-md shadow-md mt-10'>
            <div className=' w-full mx-auto mt-10 flex justify-around'>
              <p className='italic text-slate-200'>Autore: {obj.a}</p>
              <p className='text-slate-200'>Anno: 19{obj.c}</p>
            </div>
            <div className='w-2/3 mx-auto text-center mt-10'>
              <img src={obj.i} alt=""  className='w-full rounded-md'/>
            </div>
          </div>
        </> }

      </div>
    </>
  )
}

export default App
