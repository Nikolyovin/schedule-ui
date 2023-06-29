import { useEffect, useRef, useState } from 'react'

interface IRef {
    width: number
}

export const useWindowSize = () => {
    const isClient = typeof window === 'object' //Object represents browser window
    const lastWidth = useRef<IRef>({ width: 0 })

    function getSize() {
        return {
            width: isClient ? window.innerWidth : 0
        }
    }

    const [windowSize, setWindowSize] = useState(getSize)

    useEffect(() => {
        // if (!isClient) {
        //     return false
        // }

        function handleResize() {
            if (window?.innerWidth !== lastWidth.current.width) {
                const width = getSize()
                lastWidth.current = width
                setWindowSize(width)
            }
        }
        window.addEventListener('resize', handleResize) // <-- I am only interested in window.innerWidth !
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return windowSize
}
