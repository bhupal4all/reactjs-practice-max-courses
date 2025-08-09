import { useCallback, useState } from 'react'

export default function useDeleteApi(url, options, initData) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(initData)

  const deleteReqeust = useCallback(
    async (options) => {
      setIsDeleting(true)
      setError(null)

      const response = await fetch(url, {...options, method: 'DELETE'})
      if (!response.ok) {
        throw new Error('Not able to fetch data')
      }

      const jsonData = await response.json();     
      setIsDeleting(false)
      setError(null)
      setData(jsonData)
    },
    [url, options]
  );

  return {
    isDeleting,
    error,
    data,
    deleteReqeust,
  }
}
