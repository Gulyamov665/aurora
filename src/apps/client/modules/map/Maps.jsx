import React, { useCallback, useRef, useState } from 'react'
import { GoogleMap, LoadScriptNext, MarkerF } from '@react-google-maps/api'


const containerStyle = {
  width: '100%',
  height: '500px',
}

const defaultCenter = {
  lat: 39.7467565,
  lng: 64.4111207,
}

const libraries = ['places']

function Map() {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter)
  const [mapCenter, setMapCenter] = useState(defaultCenter)
  const mapRef = useRef(null)

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  const handleMapCenterChanged = useCallback(() => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter()
      setMapCenter({
        lat: newCenter.lat(),
        lng: newCenter.lng(),
      })
    }
  }, [])

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert('Ваш браузер не поддерживает Geolocation API.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCurrentPosition({ lat: latitude, lng: longitude })
        console.log(currentPosition)
      },
      (error) => {
        alert('Не удалось получить местоположение: ' + error.message)
      }
    )
  }

  const mapOptions = {
    scrollwheel: true, // Включить скролл колесиком мыши
    disableDefaultUI: false, // Показать стандартные элементы управления
    zoomControl: true, // Включить элементы управления зумом
    scaleControl: true,
    streetViewControl: false, // Отключаем уличный вид для мобильных устройств
    fullscreenControl: false, // Отключаем полноэкранный режим на мобильных устройствах
    disableDoubleClickZoom: true, // Отключаем зумирование на двойной клик
    gestureHandling: 'greedy',
  }

  console.log(mapCenter)

  return (
    <LoadScriptNext googleMapsApiKey={apiKey} libraries={libraries}>
      <div style={{ position: 'relative' }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={16}
          onLoad={(map) => (mapRef.current = map)}
          options={mapOptions}
          onCenterChanged={handleMapCenterChanged}
          onDragEnd={() => console.log('onDragEnd',mapCenter)}
        >
          <MarkerF position={mapCenter} />
        </GoogleMap>
        <button
          onClick={handleGeolocation}
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 1000,
            padding: '10px',
            background: '#e7e7e7',
            border: '1px solid black',
            borderRadius: '5px',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0px 0px 10px 0px gray'
            
          }}
        >
          Определить местоположение
        </button>
      </div>
    </LoadScriptNext>
  )
}

export default Map
