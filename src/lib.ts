export function toMB(size: number) {
  return (size / 1024 / 1024).toFixed(2)
}

export function toTime(time: number) {
  return new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function tabClass(tab: Tab, tabName: Tab) {
  return tab === tabName ? "active" : ""
}
