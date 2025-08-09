import { useCallback, useEffect, useState } from 'react'

export default function useGetApi(url, options, initData) {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(initData)

  const getReqeust = useCallback(
    async (options) => {
      setIsFetching(true)
      setError(null)

      const response = await fetch(url, {...options, method: 'GET'})
      if (!response.ok) {
        throw new Error('Not able to fetch data')
      }

      const jsonData = await response.json();     
      setIsFetching(false)
      setError(null)
      setData(jsonData)
    },
    [url, options]
  )

  useEffect(() => {
    getReqeust(url)
  }, [url])

  return {
    isFetching,
    error,
    data,
    getReqeust,
  }
}
