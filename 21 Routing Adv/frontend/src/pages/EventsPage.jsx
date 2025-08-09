import EventsNavigation from '../components/EventsNavigation'
import { Outlet } from 'react-router-dom'

export default function EventsPage() {
  return (
    <>
      <EventsNavigation />
      <div>
        <Outlet />
      </div>
    </>
  )
}
