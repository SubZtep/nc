import React, { useContext, useRef } from "react"
import { ImagesContext, ActiveContext } from "../contexts"
import { toTime } from "../lib"
import ViewDialog from "./ViewDialog"
import DialogPortal from "../components/DialogPortal"

function Predictions() {
  const { images } = useContext(ImagesContext)
  const { active, setActive } = useContext(ActiveContext)
  const predictedImages = useRef(images.filter(v => v.predicted) as Required<PImage>[])

  return (
    <>
      {active && (
        <DialogPortal>
          <ViewDialog />
        </DialogPortal>
      )}

      {predictedImages.current.length > 0 ? (
        <table className="predictions">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Title</th>
              <th>Description</th>
              <th>Predicted</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {predictedImages.current.map(image => (
              <tr key={image.filename}>
                <td>
                  <div className="thumb">
                    <img src={image.url} alt={image.filename} className="thumb" />
                  </div>
                </td>
                <td width="50%">{image.title}</td>
                <td width="50%">{image.description}</td>
                <td>{toTime(image.predicted)}</td>
                <td>
                  <button onClick={() => setActive(image.filename)}>
                    <div>VIEW</div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No predictions yet.</p>
      )}
    </>
  )
}

export default Predictions
