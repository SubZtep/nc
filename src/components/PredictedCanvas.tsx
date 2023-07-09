import React, { useEffect, useRef } from "react"

interface Props {
  predictions: Prediction[]
  width: number
  height: number
  scale: number
}

function PredictedCanvas({ predictions, width, height, scale }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // render predictions
    const ctx = canvas.current!.getContext("2d")!
    ctx.clearRect(0, 0, width, height)
    ctx.font = "18px Verdana" // FIXME: responsive font size
    // @ts-ignore missing property in TS
    ctx.letterSpacing = "1px";
    ctx.strokeStyle = "black"
    ctx.textAlign = "end"
    ctx.fillStyle = "cyan"
    ctx.globalAlpha = 0.2
    predictions.forEach(({ bbox: { x1, y1, x2, y2 } }) => {
      const x = x1 * scale
      const y = y1 * scale
      const w = (x2 - x1) * scale
      const h = (y2 - y1) * scale
      ctx.strokeRect(x, y, w, h)
      ctx.fillRect(x, y, w, h)
    })
    ctx.globalAlpha = 1
    ctx.fillStyle = "black"
    predictions.forEach(({ label, score, bbox: { x2, y2 } }) => {
      ctx.fillText(`${label} (${~~(score * 100)}%)`, x2 * scale - 4, y2 * scale - 8)
    })
  }, [predictions, width, height])

  return <canvas ref={canvas} width={width} height={height} />
}

export default PredictedCanvas
