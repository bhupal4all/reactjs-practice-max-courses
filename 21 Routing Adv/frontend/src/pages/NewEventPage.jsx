import { redirect } from 'react-router-dom'
import EventForm from '../components/EventForm'

export default function NewEventPage() {
  return (
    <>
      <EventForm />
    </>
  )
}

export async function saveNewEventAction({ request, params }) {
  const data = await request.formData()
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  }

  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  })

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: 'Failed to save event',
      }),
      {
        status: 500,
      }
    )
  }

  const resData = await response.json();
  console.log(resData);

  return redirect('/events');
}
