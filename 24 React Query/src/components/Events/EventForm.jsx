import { useState } from 'react'

import ImagePicker from '../ImagePicker.jsx'
import { useQuery } from '@tanstack/react-query'
import { fetchImages } from '../../api/http.js'
import ErrorBlock from '../UI/ErrorBlock.jsx'

export default function EventForm({ inputData, onSubmit, children }) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image)

  const {
    data: imageData,
    isPending: isImagesLoading,
    isError: isImageError,
    error: imageError,
  } = useQuery({
    queryKey: ['event-images'],
    queryFn: fetchImages,
    initialData: [],
  })

  function handleSelectImage(image) {
    setSelectedImage(image)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)

    onSubmit({ ...data, image: selectedImage })
  }

  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={inputData?.title ?? ''}
        />
      </p>

      {isImagesLoading && <p>Loading Images</p>}
      {isImageError && (
        <ErrorBlock
          title="Failed to Load Images"
          message={
            imageError.info?.message ||
            'Failed to load images, please check later'
          }
        />
      )}
      {imageData && (
        <div className="control">
          <ImagePicker
            images={imageData}
            onSelect={handleSelectImage}
            selectedImage={selectedImage}
          />
        </div>
      )}

      <p className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ''}
        />
      </p>

      <div className="controls-row">
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={inputData?.date ?? ''}
          />
        </p>

        <p className="control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={inputData?.time ?? ''}
          />
        </p>
      </div>

      <p className="control">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={inputData?.location ?? ''}
        />
      </p>

      <p className="form-actions">{children}</p>
    </form>
  )
}
