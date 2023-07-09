import { useState } from "react"

export default function usePredictApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const predict = async (): Promise<Prediction[] | undefined> => {
    let res: Response
    setLoading(true)
    try {
      // TODO: send required image data for prediction
      res = await fetch(process.env.REACT_APP_PREDICT_API_URL!)
    } catch (err: any) {
      setError(err.message)
      return
    } finally {
      setLoading(false)
    }
    if (res.ok) {
      const data = await res.json()
      if (data.predictions) {
        return data.predictions
      }
    } else {
      setError("API error")
    }
  }

  return { predict, loading, error }
}
