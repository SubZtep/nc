import { createContext } from "react"

export const ImagesContext = createContext({
  images: [] as PImage[],
  setImages: (images: PImage[]) => {},
})

export const ActiveContext = createContext({
  /** Active filename */
  active: null as string | null,
  setActive: (active: string | null) => {},
})

export const TabContext = createContext({
  /** Active tab */
  tab: "Images" as Tab,
  setTab: (tab: Tab) => {},
})
