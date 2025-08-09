import { Outlet, useNavigation } from 'react-router-dom'
import MainNavigation from './components/MainNavigation'

export default function Layout() {
  const {state} = useNavigation();

  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <h4>ReactJS Routing Practice Project</h4>
      </header>
      <main
        style={{
          padding: '2rem',
        }}
      >
        <MainNavigation />
        {state === 'loading' && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  )
}
