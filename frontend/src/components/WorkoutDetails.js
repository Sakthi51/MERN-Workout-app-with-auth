import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    if (response.ok) {
      // Delete the workout from the context state
      dispatch({ type: 'DELETE_WORKOUT', payload: workout._id });

      // Fetch the updated data from the server
      try {
        const updatedResponse = await fetch('/api/workouts', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const updatedData = await updatedResponse.json();

        if (updatedResponse.ok) {
          // Update the context state with the updated data
          dispatch({ type: 'SET_WORKOUTS', payload: updatedData });
        }
      } catch (error) {
        console.error('Error fetching updated data:', error);
      }
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails


