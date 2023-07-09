import React, { useState } from "react"
import { ImagesContext, ActiveContext, TabContext } from "./contexts"
import Pane from "./components/Pane"
import { tabClass } from "./lib"

function App() {
  const [images, setImages] = useState<PImage[]>([])
  const [active, setActive] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>("Images")

  return (
    <ImagesContext.Provider value={{ images, setImages }}>
      <ActiveContext.Provider value={{ active, setActive }}>
        <TabContext.Provider value={{ tab, setTab }}>
          <h1>Predict App</h1>

          <div className="tabs">
            <button onClick={() => setTab("Images")} className={tabClass(tab, "Images")}>
              <div>Images</div>
            </button>
            <button onClick={() => setTab("Predictions")} className={tabClass(tab, "Predictions")}>
              <div>Predictions</div>
            </button>
            <Pane tab={tab} />
          </div>
        </TabContext.Provider>
      </ActiveContext.Provider>
    </ImagesContext.Provider>
  )
}

export default App
