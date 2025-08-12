export const fetchEvents = async ({ signal, searchTerm }) => {
  let queryParams = ''
  if (searchTerm) {
    queryParams = 'search=' + searchTerm
  }

  const response = await fetch(
    'http://localhost:3000/events?' + (queryParams ?? ''),
    { signal }
  )

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events')
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const { events } = await response.json()
  return events
}

export async function saveNewPost({event: eventData, id}) {
  let url = 'http://localhost:3000/events';
  if (id) {
    url = url + `/${id}`;
  }
  const response = await fetch(url, {
    method: id ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({event: eventData}),
  })
  if (!response.ok) {
    const error = new Error('Failed to Save')
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const { event } = await response.json()
  return event
}

export const fetchImages = async ({ signal }) => {
  const response = await fetch(
    'http://localhost:3000/events/images',
    { signal }
  )

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events')
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const { images } = await response.json()
  return images
}

export const fetchEventById = async ({ signal, id }) => {
  const response = await fetch(
    'http://localhost:3000/events/'+id,
    { signal }
  )

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the event details')
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const { event } = await response.json()
  return event
}

export const deleteEventById = async ({ signal, id }) => {
  const response = await fetch(
    'http://localhost:3000/events/'+id,
    { signal, method: 'DELETE' }
  )

  if (!response.ok) {
    const error = new Error('An error occurred while deleting the event details')
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const data = await response.json()
  return data
}