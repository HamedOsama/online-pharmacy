import React from 'react';

import style from './Card.module.css';
const Card = ({ state, name, question, setValue }) => {
  const setTrueHandler = () => {
    setValue(prev => {
      return {
        ...prev,
        [name] : true
      }
    })
  }
  const setFalseHandler = () => {
    setValue(prev => {
      return {
        ...prev,
        [name] : false
      }
    })
  }
  let chosen;
  if (state[name] === true)
    chosen = true;
  if (state[name] === false)
    chosen = false;
  return (
    <div className={style.card}>
      <h4 className={style.header}>{question}</h4>
      <p onClick={setTrueHandler} className={`${style.option} ${chosen === true ? style.chosen : ''}`}>Yes</p>
      <p onClick={setFalseHandler} className={`${style.option} ${chosen === false ? style.chosen : ''}`}>false</p>
    </div>
  )
}

export default Card