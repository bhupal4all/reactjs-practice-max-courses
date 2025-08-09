import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError(); 

  let title = 'Some Error';
  let message = 'Something happended';
  if (error.status === 500) {
    title = 'Internal Server Error';
    const errorJson = JSON.parse(error.data);
    message = errorJson.message || 'Some Server Error';
  } else if (error.status === 404) {
    title = 'Page not found';
    const errorJson = JSON.parse(error.data);
    message = errorJson.message || 'The page that you are looking is NOT exist...';
  }

  return (<>
    <h2>{title}</h2>
    <p>{message}</p>
  </>)
}