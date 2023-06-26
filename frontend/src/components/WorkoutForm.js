import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const {user} = useAuthContext()

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user) {
      setError('You must logged in')
      return
    }
    const workout = { title, load, reps }

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      setEmptyFields([])
      console.log('New workout added: ', json)
      dispatch({ type: 'CREATE_WORKOUT', payload: json })
    }
  }



  return (
    <form className="custom-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Add a New Workout</h3>

      <div className="form-group">
        <label className="form-label">Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={`form-input ${emptyFields.includes('title') ? 'error' : ''}`}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Load (in kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={`form-input ${emptyFields.includes('load') ? 'error' : ''}`}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Number of Reps:</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={`form-input ${emptyFields.includes('reps') ? 'error' : ''}`}
        />
      </div>

      <button className="form-button">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm