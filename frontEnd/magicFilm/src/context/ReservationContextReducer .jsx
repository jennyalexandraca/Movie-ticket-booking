import React, { useReducer } from 'react'
import { createContext } from 'react'


export const ReservationContextReducer = createContext()

const initialState = 
{
    title:"",
    reservationDate:"",
    hour:"",
    chairs:0,
    price:0   
}

function reducer(state, action) {
    switch (action.type) {
      case 'ADD_TITLE':
        return {...state, title: "PRUEBA ADD TITULO"};
      case 'ADD_RESERVATION_DATE':
        return {...state, reservationDate: "PRUEBA ADD RESERVA FECHA"};
      case 'ADD_HOUR':
        return {...state, hour: "PRUEBA ADD HORA"};
      case 'ADD_CHAIRS':
        return {...state, chairs: "PRUEBA ADD SILLAS"};
      case 'ADD_PRICE':
        return {...state, price: "PRUEBA ADD PRECIO"};
      default:
        return state;
    }
}
    



const ReservationContextReducerProvider  = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ReservationContextReducer.Provider value={{state, dispatch}}> 
        {children}
    </ReservationContextReducer.Provider>
  )
}

export default ReservationContextReducerProvider 