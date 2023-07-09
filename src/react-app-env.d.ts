/// <reference types="react-scripts" />

type Tab = "Images" | "Predictions"

interface Prediction {
  bbox: {
    x1: number
    x2: number
    y1: number
    y2: number
  }
  label: string
  score: number
}

interface PImage {
  filename: string
  uploaded: number
  size: number
  url: string
  title?: string
  description?: string
  predicted?: number
  predictions?: Prediction[]
}
