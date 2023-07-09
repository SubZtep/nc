import React, { useContext, useEffect } from "react"
import { ImagesContext, ActiveContext } from "../contexts"
import ImageUpload from "../components/ImageUpload"
import { toMB, toTime } from "../lib"
import PredictDialog from "./PredictDialog"
import DialogPortal from "../components/DialogPortal"

function Images() {
  const { images, setImages } = useContext(ImagesContext)
  const { active, setActive } = useContext(ActiveContext)

  useEffect(() => {
    setActive(null)
  }, [])

  return (
    <>
      <ImageUpload
        onImages={(selectedImages: PImage[]) => {
          const newImages = selectedImages.filter(v => images.every(({ filename }) => v.filename !== filename))
          if (newImages.length > 0) {
            setImages([...images, ...newImages])
          }
        }}
      />

      {active && (
        <DialogPortal>
          <PredictDialog
            filename={active}
            onSave={data => {
              setImages([
                ...images.filter(v => v.filename !== active),
                { ...images.find(v => v.filename === active), ...data } as PImage,
              ])
            }}
          />
        </DialogPortal>
      )}

      {images.length > 0 ? (
        <table className="images">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Filename</th>
              <th>Size</th>
              <th>Uploaded</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {images.map(image => (
              <tr key={image.filename}>
                <td>
                  <div className="thumb">
                    <img src={image.url} alt={image.filename} className="thumb" />
                  </div>
                </td>
                <td width="100%">{image.filename}</td>
                <td>{toMB(image.size)} MB</td>
                <td>{toTime(image.uploaded)}</td>
                <td>
                  <button onClick={() => setActive(image.filename)} className="br4">
                    <div>PREDICT</div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No images uploaded.</p>
      )}
    </>
  )
}

export default Images
