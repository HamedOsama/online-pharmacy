import React from 'react';
import style from './ResponseCard.module.css';

const ResponseCard = ({ drug, ok }) => {
  return (
    <div className={style.card}>
      <h4 className={`${style.header} ${!ok ? style.error : ''}`}>{ok ? "THE BEST MEDICINE FOR YOUR CASE IS" : "SORRY WE CANNOT FIND MEDICINE FOR YOUR CASE"}</h4>
      {ok && <p className={style.drug}>{drug}</p>}
    </div>
  )
}

export default ResponseCard