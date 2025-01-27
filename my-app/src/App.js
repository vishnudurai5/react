import { useReducer } from 'react'
import './style.css'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'

export const ACTIONS = {
ADD_DIGIT :'add-digit',
CHOOSE_OPERATOR: 'choose-operator',
CLEAR:'clear',
DELETE_DIGIT:'delete-digit',
EVALUATE:'eveluate'
}

function reducer(state , {type , payload}) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currentOperand:payload.digit,
          overwrite:false,
        }
      }
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }
      if (payload.digit === '.' && state.currentOperand?.includes('.')) {
        return state;
      }
      return {
        ...state,
        currentOperand : `${state.currentOperand || ''}${payload.digit}`,
      };
      case ACTIONS.CLEAR:
        return{};

     case ACTIONS.CHOOSE_OPERATOR:
      if(state.currentOperand == null && state.perviousOperand == null){
        return state;
      };

      if(state.currentOperand == null){
        return{
          ...state,
          operation: payload.operation,
        }
      }

      if(state.perviousOperand == null){
        return{
        ...state,
        operation:payload.operation,
        perviousOperand:state.currentOperand,
        currentOperand:null
        }
      }
      if(state.currentOperand == null){
        return{
        ...state,
        overwrite:true,
        operation:payload.operation,
        operation: null,
        currentOperand: evaluate(state)

      }
    }
        return{
          ...state,
          operation:payload.operation,
          currentOperand:null,
          perviousOperand:evaluate(state)
        }

    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          overwrite:false,
          currentOperand:null
        }
      }
      if(state.currentOperand == null ) return state
      if (state.currentOperand ===1){
        return{
          ...state,
          currentOperand:null
        };
      }
      return{
        ...state,
        currentOperand:state.currentOperand.slice(0,-1)
      }

    case ACTIONS.EVALUATE:
      if(state.currentOperand == null || state.perviousOperand == null || state.operation == null){
      return state;
       }
   return{
    ...state,
    overwrite:true,
    currentOperand:evaluate(state),
    operation:null,
    perviousOperand:null,
   };
  

}  
}

function evaluate({currentOperand , perviousOperand , operation}){
  const prev = parseFloat(perviousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "" ;

  let coumputation = '';

  switch(operation){
  case "%":
    coumputation= prev / current
    break;
    case "*":
    coumputation= prev * current
    break;
    case "+":
    coumputation= prev + current
    break;
    case "-":
    coumputation= prev - current
    break;      
    default:
      return '';
  }
  return coumputation.toString();
}
function App(){
const[ {perviousOperand ,currentOperand,operation}, dispatch] = useReducer(
  reducer ,
   {}
  )

  return(
<div className='calculator-grid'>
<div className='output'>
  <div className='pervious-operand'> {perviousOperand} {operation}</div>
  <div className='current-operand'>{currentOperand}</div>
  </div>  
  <button className='span-two'  onClick={()=> dispatch({type:ACTIONS.CLEAR})}>AC</button>
  <button onClick={()=> dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
 <OperationButton operation= "%"  dispatch={dispatch} />
  <DigitButton digit= "1"  dispatch={dispatch} />
  <DigitButton digit= "2"  dispatch={dispatch} />
  <DigitButton digit= "3"  dispatch={dispatch} />
  <OperationButton operation= "*"  dispatch={dispatch} />
  <DigitButton digit= "4"  dispatch={dispatch} />
  <DigitButton digit= "5"  dispatch={dispatch} />
  <DigitButton digit= "6"  dispatch={dispatch} />
  <OperationButton operation= "+"  dispatch={dispatch} />
   <DigitButton digit= "7"  dispatch={dispatch} />
  <DigitButton digit= "8"  dispatch={dispatch} />
  <DigitButton digit= "9"  dispatch={dispatch} />
  <OperationButton operation= "-"  dispatch={dispatch} />
  <DigitButton digit= "."  dispatch={dispatch} />
  <DigitButton digit= "0"  dispatch={dispatch} />
  <button className='span-two' onClick={()=> dispatch({type:ACTIONS.EVALUATE})}>=</button>
  </div>  )
}

export default App