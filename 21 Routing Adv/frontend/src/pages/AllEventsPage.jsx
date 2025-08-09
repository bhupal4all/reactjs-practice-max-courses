import EventsList from '../components/EventsList'
import { useLoaderData, json } from 'react-router-dom'

export default function AllEventsPage() {
  const events = useLoaderData()

  return (
    <>
      <EventsList events={events} />
    </>
  )
}

export async function allEventsLoader() {
  const res = await fetch('http://localhost:8080/events')
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
  return data.events
}
