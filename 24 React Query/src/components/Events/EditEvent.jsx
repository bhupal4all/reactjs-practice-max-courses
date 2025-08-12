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
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEventById({ signal, id: params.id }),
  })

  const {
    mutate,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useMutation({
    mutationFn: saveNewPost,
    onMutate: async (mutateData) => {
      console.log('Mutating Data', mutateData)
      const newEventData = mutateData.event

      await queryClient.cancelQueries({
        queryKey: ['events', params.id],
      })
      const prevData = queryClient.getQueryData(['events', params.id])
      queryClient.setQueryData(['events', params.id], newEventData);
      return {
        previousData: prevData,
      }
    },
    onSuccess: () => {
      console.log('Mutation Success')
      queryClient.invalidateQueries({
        queryKey: ['events', params.id],
      })
      navigate(`/events/${params.id}`)
    },
    onError: (error, data, context) => {
      console.log('Mutation Error', error)
      queryClient.setQueriesData(['events', params.id], context.previousData)
    },
    onSettled: () => {
      console.log('Mutation Compelted')
    },
  })

  function handleSubmit(formData) {
    mutate({ event: formData, id: params.id })
    navigate('..')
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
