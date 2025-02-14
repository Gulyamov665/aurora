import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'

function Marker({ position, children, onClick }) {
  const rootRef = useRef()
  const markerRef = useRef()

  useEffect(() => {
    if (!rootRef.current) {
      const container = document.createElement('div')
      rootRef.current = createRoot(container)

      markerRef.current = new google.maps.marker.AdvancedMarkerView({
        position,
        content: container,
      })
    }

    return () => (markerRef.current.map = null)
  }, [])

  useEffect(() => {
    rootRef.current.render(children)
    markerRef.current.position = position
    //   const listener = markerRef.current.addListener("click", onClick);
    //   return () => listener.remove();
  }, [position, children])

}

export default Marker
