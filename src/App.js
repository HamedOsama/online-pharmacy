import { useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import { useMultiStepForm } from './hooks/useMultiStepForm';
import Input from './components/Input/Input';
import axios from 'axios';
import ResponseCard from './components/ResponseCard/ResponseCard';
axios.defaults.withCredentials = false
function App() {
  const [response, setResponse] = useState(null)
  const [responseData, setResponseData] = useState(null)
  const [error, setError] = useState(false)
  const [details, setDetails] = useState({
    cold: null,
    headache: null,
    highTemperature: null,
    sneezing: null,
    musclePain: null,
    soreThroat: null,
    dizziness: null,
    sinuses: null,
    sideEffects: null,
    age: 0,

  })
  const { steps: elements, currentStepIndex, step: currentElement, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      {
        name: "cold",
        element:
          <Card
            question="Do you feal cold?"
            name="cold"
            state={details}
            setValue={setDetails}
          />
      },
      {
        name: "headache",
        element:
          <Card
            question="Do you have headache?"
            name="headache"
            state={details}
            setValue={setDetails}
          />
      },
      {
        name: "highTemperature",
        element:
          <Card
            question="Is your temperature higher than normal ( normal body temperature 37C )?"
            name="highTemperature"
            state={details}
            setValue={setDetails}
          />
      },
      {
        name: "sneezing",
        element:
          <Card
            question="Do you Have Sneezing?"
            name="sneezing"
            state={details}
            setValue={setDetails}
          />
      },
      {
        name: "musclePain",
        element:
          <Card
            question="Do you feel pain in your muscles?"
            name="musclePain"
            state={details}
            setValue={setDetails}
          />
      },
      {
        name: "soreThroat",
        element:
          <Card
            question="Do you Feel Sore throat?"
            name="soreThroat"
            state={details}
            setValue={setDetails}
          />
      },
      {
        name: "dizziness",
        element:
          <Card
            question="Do you feel Dizziness?"
            name="dizziness"
            state={details}
            setValue={setDetails}
          />
      },
      {
        name: "sinuses",
        element:
          <Card
            question="Do you have sinuses?"
            name="sinuses"
            state={details}
            setValue={setDetails}
          />
      },
      {
        name: "sideEffects",
        element:
          <Card
            question="Do you care about side effects?"
            name="sideEffects"
            state={details}
            setValue={setDetails}
          />
      },
      {
        name: 'age',
        element: <Input
          question="How old are you?"
          name="age"
          state={details}
          setValue={setDetails}
        />
      }
    ])
  const checkNextPageHandler = () => {
    // reset error
    setError(prev => false)
    // check if user answered or no
    if (details[currentElement.name] === null)
      return setError(prev => true)
    next()
  }
  const submitHandler = async () => {
    try {
      const req = await axios.post('https://django-server-production-b5f9.up.railway.app/drugs/',
        details,
        {
          headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
          }
        }
      )
      const drugName = await req?.data?.data
      if (!drugName)
        throw new Error('Cannot find drug');
      setResponse(prev => true)
      setResponseData({
        status: true,
        drugName
      })

    } catch (e) {
      setResponse(prev => true)
      setResponseData({
        status: false,
        drugName: null
      })
    }

  }
  return (
    <div className="App">
      <div className="navbar">
        <h2 className='navHeader'>Online Pharmacy</h2>
      </div>
      {response && <ResponseCard drug={responseData.drugName} ok={responseData.status} />}
      {
        !response &&
        <div className="card">
        <div className="pageIndexContainer">
          <p className='pageIndex'>{currentStepIndex + 1} / {elements.length}</p>
        </div>
        {currentElement.element}
        <div className="buttons">
          {!isFirstStep && <button onClick={back} className="button back">Back</button>}
          {isLastStep ?
            <button onClick={submitHandler} className="button confirm">Confirm</button>
            : <button onClick={checkNextPageHandler} className="button next">Next</button>
          }
        </div>
        {
          error &&
          <span className={"error"}>Please answer to continue</span>
        }
      </div>
      }
    </div>
  );
}

export default App;
