import { useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { fetchEvents } from '../../api/http'
import EventItem from './EventItem'

export default function FindEventSection() {
  const [searchTerm, setSearchTerm] = useState()
  const searchElement = useRef()

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['events', { search: searchTerm }],
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
    initialData: [],
    enabled: searchTerm !== undefined
  })

  function handleSubmit(event) {
    event.preventDefault()
    setSearchTerm(searchElement.current.value)
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      <p>Please enter a search term and to find events.</p>

      {!isFetching && data && (
        <ul className="events-list">
          {data.map((event) => (
            <li key={event.id}>
              <EventItem event={event} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
