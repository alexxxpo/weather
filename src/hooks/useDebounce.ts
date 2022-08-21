import React from 'react'

export default function useDebounce(value: string, delay: number = 300): string {
    const [debounced, setDebounced] = React.useState(value)

    React.useEffect(() => {
        clearTimeout()
        const handler = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay])
    
    return debounced
}
