import React, { useRef, useState } from 'react'
import { qzs } from "../assets/qzs";
import pic from '../assets/logo.jpg';


function Qzapp() {

  let [index,setIndex] = useState(0)
  let [question,setQuestion] = useState(qzs[index])
  let [lock,setLock] = useState(false)
  let [score,setScore] = useState(0);
  let [result,setResult] = useState(false)

  let Option1 = useRef(null)
  let Option2 = useRef(null)
  let Option3 = useRef(null)
  let Option4 = useRef(null)

  let option_array = [Option1, Option2, Option3, Option4]


  const checkAns = (e,ans) => {
    if (lock === false) {
      if (question.ans===ans) {
        e.target.classList.add("correct")
        setLock(true)
        setScore(prev=>prev+1)
      } else {
        e.target.classList.add("wrong")
        setLock(true)
        option_array[question.ans-1].current.classList.add("correct")
      }
    }
  }

  const next = () =>{
    if (lock === true) {
      if (index === qzs.length-1) {
        setResult(true)
        return 0
      }
      setIndex (++index)
      setQuestion(qzs[index])
      setLock(false)
      option_array.map((option)=>{
        option.current.classList.remove("wrong")
        option.current.classList.remove("correct")
        return null
      })
    }
  }


  const reset = () =>{
    setIndex(0)
    setQuestion(qzs[0])
    setScore(0)
    setLock(false)
    setResult(false)

  }


  return (
    <>
      <div className="container">
        <h1 className='text-center m-3'>QUIZ APP</h1>
        <div className='justify-content-center align-items-center border rounded p-3 mt-3 bg-light mt-5'>
          <img style={{height:'100px', width:'200px'}} src={pic} alt="" />
          <hr />
          {result?<></>
           :
           <>
             <h2> {index+1}. {question.question} </h2>
             <ul className='mt-5 fw-bold'>
               <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}> {question.option1}  </li>
               <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}> {question.option2}   </li>
               <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}> {question.option3}   </li>
               <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}> {question.option4}   </li>
             </ul>
             <button onClick={next} className='mt-5 align-items-center justify-content-center fs-3 fw-bolder w-50 d-flex'> NEXT </button>
             <div className="index mt-3 text-center fs-3">{index+1} of {qzs.length} Questions</div>
           </>
          }
          {
            result?
            <>
              <h1 className='text-center fw-bolder mt-5'>You Scored {score} out of {qzs.length} !!</h1>
              <button className='mt-5 fw-bold fs-2 m-5' onClick={reset}>RESET</button>
            </>
            :
            <></>
          }
        </div>
      </div>
    </>
  )
}

export default Qzapp
