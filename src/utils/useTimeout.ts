const useTimeout = (delay = 250) => {
    let timeout: ReturnType<typeof setTimeout>
    return (fn: () => void) => {
        clearTimeout(timeout)
        timeout = setTimeout(fn, delay)
    }
}

export default useTimeout
