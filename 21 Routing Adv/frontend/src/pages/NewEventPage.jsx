import { redirect } from 'react-router-dom'
import EventForm from '../components/EventForm'

export default function NewEventPage() {
  return (
    <>
      <EventForm method={'POST'} />
    </>
  )
}

export async function saveEventAction({ request, params }) {
  const data = await request.formData()
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  }

  const method = request.method;
  let url = 'http://localhost:8080/events';
  if (method === 'PATCH') {
    url = url + `/${params.id}`;
  }

  const response = await fetch(url, {
    method: method,
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

  // if (true) {
  //   return new Response(JSON.stringify({
  //     message: 'Failed to save',
  //     errors: {
  //       title: 'Invalid Input',
  //       image: 'Invalid Image URL'
  //     }
  //   }), {
  //     status: 422
  //   });
  // }

  const resData = await response.json();
  console.log(resData);

  return redirect('/events');
}
