import { useCallback, useState } from 'react'

export default function usePostApi(url, options, initData) {
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(initData)

  const postReqeust = useCallback(
    async (options) => {
      setIsSending(true)
      setError(null)

      const response = await fetch(url, {...options, method: 'POST'})
      if (!response.ok) {
        throw new Error('Not able to fetch data')
      }

      const jsonData = await response.json();     
      setIsSending(false)
      setError(null)
      setData(jsonData)
    },
    [url, options]
  )

  return {
    isSending,
    error,
    data,
    postReqeust,
  }
}
