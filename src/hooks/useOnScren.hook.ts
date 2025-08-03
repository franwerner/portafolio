import { useEffect, useRef, useState } from "react";

export function useOnScreen<T extends Element>(options?: IntersectionObserverInit) {
    const ref = useRef<T | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            options
        );

        observer.observe(ref.current)

        return () => observer.disconnect()
    }, [ref.current, options])

    return { ref, isVisible }
}