import React from "react"

interface Props {
  onImages: (images: PImage[]) => void
}

function ImageUpload({ onImages }: Props) {
  return (
    <label className="upload">
      Please <strong>click here</strong> to upload one or more image files...
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={ev => {
          if (ev.target.files) {
            const images: PImage[] = []
            for (const file of ev.target.files) {
              images.push({
                filename: file.name,
                size: file.size,
                uploaded: Date.now(),
                url: URL.createObjectURL(file),
              })
            }
            onImages(images)
          }
        }}
      />
    </label>
  )
}

export default ImageUpload
