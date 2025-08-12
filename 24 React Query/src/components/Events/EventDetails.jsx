import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'

import Header from '../Header.jsx'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteEventById, fetchEventById } from '../../api/http.js'
import ErrorBlock from '../UI/ErrorBlock.jsx'
import { queryClient } from '../../App.jsx'
import Modal from '../UI/Modal.jsx'
import { useState } from 'react'

export default function EventDetails() {
  const [deleteModal, setDeleteModal] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const {
    data: eventData,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEventById({ signal, id: params.id }),
  })

  let content

  if (isFetching) {
    content = (
      <div style={{ textAlign: 'center' }}>
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
        queryKey: ['events'],
        refetchType: 'none', // queries will not triggered immedidately
      })
    },
  })

  function handleStartDelete() {
    setDeleteModal(true)
  }

  function handleStopDelete() {
    setDeleteModal(false)
  }

  function handleDelete() {
    deleteMutate({ id: params.id })
  }

  return (
    <>
      {deleteModal && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you to delete?</h2>
          <p>
            Do you really want to delete the event? This action cant be undone.
          </p>
          {isDeleting && <p>Deleting Event...</p>}
          {!isDeleting && (
            <div className="form-actions">
              <button onClick={handleStopDelete} className="button-text">
                Close
              </button>
              <button onClick={handleDelete} className="button">
                Delete
              </button>
            </div>
          )}
          {isDeleteError && deleteError && (
            <ErrorBlock
              title="Failed to Delete Event"
              message={
                deleteError.info?.message || 'Failed to delete event detail'
              }
            />
          )}
        </Modal>
      )}
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
              <button onClick={handleStartDelete}>Delete</button>
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

export async function eventsLoader({ params }) {
  console.log('Router Loader: Fetching event data')
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEventById({ signal, id: params.id }),
  })
}
