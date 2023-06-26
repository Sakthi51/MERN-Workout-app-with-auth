// import { WorkoutsContext } from "../context/WorkoutContext";
// import { useContext } from "react";

// export const useWorkoutsContext = () => {
//   const context = useContext(WorkoutsContext)

//   if(!context) {
//     throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')

//     return context
//   }
// }

import { WorkoutsContext } from '../context/WorkoutsContext'
import { useContext } from "react"

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }
  // console.log(context)
  return context
}