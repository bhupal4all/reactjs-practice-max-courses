import { Link, useNavigate, useParams } from 'react-router-dom'

import Modal from '../UI/Modal.jsx'
import EventForm from './EventForm.jsx'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchEventById, saveNewPost } from '../../api/http.js'
import LoadingIndicator from '../UI/LoadingIndicator.jsx'
import ErrorBlock from '../UI/ErrorBlock.jsx'
import { queryClient } from '../../App.jsx'

export default function EditEvent() {
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

  const {
    mutate,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useMutation({
    mutationFn: saveNewPost,
    onSuccess: () => {
      console.log('Mutation Success')
      queryClient.invalidateQueries(['events'])
      navigate(`/events/${params.id}`)
    },
    onError: (error) => {
      console.log('Mutation Error', error)
    },
    onSettled: () => {
      console.log('Mutation Compelted')
    },
  })

  function handleSubmit(formData) {
    console.log('sving ', formData)
    mutate({ event: formData, id: params.id })
  }

  let content

  if (isFetching) {
    content = <LoadingIndicator />
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="Failed to Fetch Event"
        message={error.info?.message || 'Failed to fetch event detail'}
      />
    )
  }

  function handleClose() {
    navigate('../')
  }

  return (
    <Modal onClose={handleClose}>
      {content}
      {isUpdateError && (
        <ErrorBlock
          title="Failed to Update Event"
          message={updateError.info?.message || 'Failed to Update the event'}
        />
      )}
      {!isFetching && eventData && (
        <EventForm inputData={eventData} onSubmit={handleSubmit}>
          {isUpdating && <p>Updating...</p>}
          {!isUpdating && (
            <>
              <Link to="../" className="button-text">
                Cancel
              </Link>
              <button type="submit" className="button">
                Update
              </button>
            </>
          )}
        </EventForm>
      )}
    </Modal>
  )
}
