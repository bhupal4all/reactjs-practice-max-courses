import { Suspense } from 'react'
import EventsList from '../components/EventsList'
import { Await, useLoaderData } from 'react-router-dom'

export default function AllEventsPage() {
  const { events } = useLoaderData()

  return (
    <>
      <Suspense
        fallback={<p style={{ textAlign: 'center' }}>Loading Events...</p>}
      >
        <Await resolve={events}>
          {(eventsData) => {
            return <EventsList events={eventsData} />
          }}
        </Await>
      </Suspense>
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

export async function deferLoader() {
  return {
    events: allEventsLoader(),
  }
}
