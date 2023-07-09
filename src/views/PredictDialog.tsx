import React, { useState, useContext, useRef } from "react"
import { ActiveContext, TabContext, ImagesContext } from "../contexts"
import useDialog from "../hooks/useDialog"
import usePredictApi from "../hooks/usePredictApi"

interface Props {
  filename: string
  onSave: (ev: Pick<PImage, "title" | "description" | "predictions" | "predicted">) => void
}

function PredictDialog({ onSave }: Props) {
  const { active, setActive } = useContext(ActiveContext)
  const { images } = useContext(ImagesContext)
  const { setTab } = useContext(TabContext)
  const activeImage = useRef(images.find(v => v.filename === active)!)
  const [title, setTitle] = useState(activeImage.current.title ?? "")
  const [description, setDescription] = useState(activeImage.current.description ?? "")
  const { predict, loading, error } = usePredictApi()
  const { dialog } = useDialog()

  return (
    <dialog
      ref={dialog}
      onSubmit={async ev => {
        ev.preventDefault()
        const predictions = await predict()
        const predicted = predictions ? Date.now() : undefined
        onSave({ title, description, predictions, predicted })
        if (await predict()) {
          setTab("Predictions")
        }
      }}
      onCancel={() => setActive(null)}
      className="predict-dialog"
    >
      <form method="dialog">
        <h2>{active}</h2>
        <label>
          Title
          <br />
          <input type="text" onChange={ev => setTitle(ev.target.value)} value={title} />
        </label>
        <label>
          Description
          <br />
          <textarea onChange={ev => setDescription(ev.target.value)} value={description}></textarea>
        </label>
        <div>
          <button type="submit" disabled={title.length === 0 || loading}>
            <div>Submit</div>
          </button>
          <button type="button" onClick={() => setActive(null)}>
            <div>Cancel</div>
          </button>
          {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <></>}
        </div>
      </form>
    </dialog>
  )
}

export default PredictDialog
