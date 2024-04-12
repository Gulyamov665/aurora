import { useState, useEffect } from "react"


export const useObserver = (refs, options) => {
    const [observerTarget, setObserverTarget] = useState([])
    useEffect(() => {
        const cb = (entries) => {
            setObserverTarget(entries)
        }
        const observer = new IntersectionObserver(cb,
            options,
        )
        refs.current.forEach((sec) => {
            observer.observe(sec)
        })
    }, [refs])

    return observerTarget
}

