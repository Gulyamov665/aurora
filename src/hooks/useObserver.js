import { useState, useEffect } from "react"


export const useObserver = (refs, options) => {
    const { threshold } = options
    const [observerTarget, setObserverTarget] = useState([])

    useEffect(() => {
        const cb = (entries) => {
            setObserverTarget(entries)
        }
        const observer = new IntersectionObserver(cb,
            { threshold },
        )

        refs.current.forEach((sec) => {
            observer.observe(sec)
        })

        return () => {
            observer.disconnect()
        }
    }, [refs])

    return observerTarget
}

