import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'

import classes from './EventForm.module.css'

function EventForm({ method, event }) {
  const actionData = useActionData()
  const actionDataJson = JSON.parse(actionData ?? '{}')

  const navigate = useNavigate()
  const navigation = useNavigation()

  const isSubmitting = navigation.state === 'submitting'

  return (
    <>
      <Form method={method} className={classes.form}>
        {actionDataJson && actionDataJson.errors && (
          <ul>
            {Object.values(actionDataJson.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <p>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            required
            defaultValue={event ? event.title : ''}
          />
        </p>
        <p>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="url"
            name="image"
            required
            defaultValue={event ? event.image : ''}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            required
            defaultValue={event ? event.date : ''}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            required
            defaultValue={event ? event.description : ''}
          />
        </p>
        <div className={classes.actions}>
          <button type="button" onClick={() => navigate('..')}>
            Cancel
          </button>
          <button disabled={isSubmitting}>Save</button>
        </div>
      </Form>
    </>
  )
}

export default EventForm
