import React, { useEffect, useState } from 'react'
import Reservation from './Reservation'
import { useParams } from 'react-router-dom'
import { getMovieById } from '../../../service/productServices'
import { number } from 'yup'

const ReservationContainer = () => {
    const idMovie = useParams()
    const [dataMovie, setDataMovie] = useState({});
  
    const idMovieNumber = parseInt(idMovie.id)

    useEffect(() => {
        const movieById = getMovieById(idMovieNumber);
        movieById
          .then((res) => {
            const data = res.data;
            setDataMovie(data);
          })
          .catch((error) => console.log(error));
      }, []);


  return (
    <div><Reservation dataMovie={dataMovie}/></div>
  )
}

export default ReservationContainer