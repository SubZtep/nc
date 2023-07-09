import React, { useContext, useEffect, useRef, useState } from "react"
import { ActiveContext, ImagesContext } from "../contexts"
import useDialog from "../hooks/useDialog"
import PredictedCanvas from "../components/PredictedCanvas"

function PredictDialog() {
  const { active, setActive } = useContext(ActiveContext)
  const { images } = useContext(ImagesContext)
  const image = useRef(images.find(v => v.filename === active)!)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [scale, setScale] = useState(1)
  const { dialog } = useDialog()
  const img = useRef<HTMLImageElement>(null)

  const resize = useRef(() => {
    const { naturalWidth, naturalHeight } = img.current!
    const aspectRatio = naturalWidth / naturalHeight
    if (window.innerWidth >= naturalWidth && window.innerHeight >= naturalHeight) {
      setWidth(naturalWidth)
      setHeight(naturalHeight)
      setScale(1)
    } else if (window.innerWidth < naturalWidth) {
      setWidth(window.innerWidth)
      setHeight(window.innerWidth / aspectRatio)
      setScale(window.innerWidth / naturalWidth)
    } else if (window.innerHeight < naturalHeight) {
      setHeight(window.innerHeight)
      setWidth(window.innerHeight * aspectRatio)
      setScale(window.innerHeight / naturalHeight)
    }
  })

  const resizer = useRef(
    new ResizeObserver(() => {
      // TODO: throttle
      resize.current()
    }),
  )

  useEffect(() => {
    resize.current()
    resizer.current.observe(window.document.body)
    return () => resizer.current.disconnect()
  }, [])

  return (
    <>
      <dialog
        ref={dialog}
        onCancel={() => setActive(null)}
        onClick={() => setActive(null)}
        // @ts-ignore missing property in TS
        style={{ "--width": `${width}px`, "--height": `${height}px` }}
        className="view-dialog"
      >
        <div className="group">
          <img ref={img} src={image.current.url} alt={image.current.filename} />
          <PredictedCanvas predictions={image.current.predictions!} width={width} height={height} scale={scale} />
        </div>
        <div className="close">✗</div>
      </dialog>
    </>
  )
}

export default PredictDialog
