import { useState, useEffect } from "react";

// Reusable debounce hook
export function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler); // Cleanup on change/unmount
    }, [value, delay]);

    return debouncedValue;
}
