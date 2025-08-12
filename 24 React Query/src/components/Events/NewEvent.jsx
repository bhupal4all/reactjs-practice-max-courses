import { Link, useNavigate } from 'react-router-dom'

import Modal from '../UI/Modal.jsx'
import EventForm from './EventForm.jsx'
import { useMutation } from '@tanstack/react-query'
import { saveNewPost } from '../../api/http.js'
import ErrorBlock from '../UI/ErrorBlock.jsx'
import { queryClient } from '../../App.jsx'

export default function NewEvent() {
  const navigate = useNavigate()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: saveNewPost,
    onSuccess: () => {
      console.log('Mutation Success');
      queryClient.invalidateQueries(['events']);
      navigate('/events');
    },
    onError: (error) => {
      console.log('Mutation Error', error)
    },
    onSettled: () => {
      console.log('Mutation Compelted')
    },
  })

  function handleSubmit(formData) {
    mutate({event: formData})
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending ? 'Submitting...' : null}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to Create Events"
          message={error.info?.message || "Failed to create events, please check the inputs"}
        />
      )}
    </Modal>
  )
}
