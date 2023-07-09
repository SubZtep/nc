import Images from "../views/Images"
import Predictions from "../views/Predictions"

interface Props {
  /** Component name */
  tab: Tab
}

function Pane({ tab }: Props) {
  const components = { Images, Predictions }
  const TagName = components[tab]
  return (
    <div className="pane">
      <TagName />
    </div>
  )
}

export default Pane
