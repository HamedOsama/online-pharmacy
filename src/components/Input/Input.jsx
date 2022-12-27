import React, { useState } from 'react';

import style from './Input.module.css';

const Input = ({ state, name, question, setValue }) => {
  const [error, setError] = useState(false)
  const onChangeHandler = e => {
    // get input value
    const value  = e.target.value ;
    // reset error
    setError(prev=> false);
    // validate input
    if(value > 100 || value < 1)
      return setError(prev=> true);
    // set value
    setValue(prev=>{
      return {
        ...prev,
        [name] : +value
      }
    })
  }
  return (

    <div className={style.container}>
      <h4 className={style.header}>{question}</h4>
      <input type="number" onChange={onChangeHandler} className={style.input} />
      {
        error &&
        <span className={"error"}>Age must be greater than 1 and less than 100</span>
      }
    </div>
  )
}

export default Input