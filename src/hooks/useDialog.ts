import { useEffect, useRef } from "react"

function useDialog() {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialog.current?.showModal()
    return () => dialog.current?.close()
  }, [])

  return { dialog }
}

export default useDialog
