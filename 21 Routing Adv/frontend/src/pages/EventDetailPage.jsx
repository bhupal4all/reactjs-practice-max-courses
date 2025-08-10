import EventItem from '../components/EventItem'
import { redirect, useRouteLoaderData } from 'react-router-dom'

export default function EventDetailPage() {
  const event = useRouteLoaderData('event-detail')
  return (
    <>
      <EventItem event={event} />
    </>
  )
}

export async function loadEventById({ params }) {
  const res = await fetch(`http://localhost:8080/events/${params.id}`)
  if (!res.ok) {
    throw new Response(
      JSON.stringify({
        message: 'Failed to fetch events',
      }),
      {
        status: 500,
      }
    )
  }
  const data = await res.json()
  return data.event
}

export async function deleteEventByidAction({ request, params }) {
  const res = await fetch(`http://localhost:8080/events/${params.id}`, {
    method: request.method,
  })

  if (!res.ok) {
    throw new Response(
      JSON.stringify({
        message: 'Failed to delete the event',
      }),
      {
        status: 500,
      }
    )
  }
  
  return redirect('/events');
}
