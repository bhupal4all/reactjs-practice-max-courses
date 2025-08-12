import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'

import Header from '../Header.jsx'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteEventById, fetchEventById } from '../../api/http.js'
import LoadingIndicator from '../UI/LoadingIndicator.jsx'
import ErrorBlock from '../UI/ErrorBlock.jsx'
import { queryClient } from '../../App.jsx'

export default function EventDetails() {
  const navigate = useNavigate()
  const params = useParams()

  const {
    data: eventData,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['events', { id: params.id }],
    queryFn: ({ signal }) => fetchEventById({ signal, id: params.id }),
  })

  let content

  if (isFetching) {
    content = (
      <div style={{textAlign: "center"}}>
        <p>Fetching Event Details...</p>
      </div>
    )
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="Failed to Fetch Event"
        message={error.info?.message || 'Failed to fetch event detail'}
      />
    )
  }

  const {
    mutate: deleteMutate,
    isPending: isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEventById,
    onSuccess: () => {
      console.log('Delete completed')
      navigate('/events')
      queryClient.invalidateQueries({
        queryKey: ['events']
      })
    },
  })

  function handleDelete() {
    deleteMutate({ id: params.id })
  }

  if (isDeleting) {
    content = (
      <div style={{textAlign: "center"}}>
        <p>Deleting Event...</p>
      </div>
    )
  }

  if (isDeleteError && deleteError) {
    content = (
      <ErrorBlock
        title="Failed to Delete Event"
        message={deleteError.info?.message || 'Failed to delete event detail'}
      />
    )
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {content}
      {eventData && (
        <article id="event-details">
          <header>
            <h1>{eventData.title}</h1>
            <nav>
              <button onClick={handleDelete}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img
              src={`http://localhost:3000/${eventData.image}`}
              alt={eventData.title}
            />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{eventData.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>
                  {eventData.date} @ {eventData.time}
                </time>
              </div>
              <p id="event-details-description">{eventData.description}</p>
            </div>
          </div>
        </article>
      )}
    </>
  )
}
