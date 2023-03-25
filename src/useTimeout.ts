const useTimeout = (delay = 250) => {
    let timeout: NodeJS.Timeout
    return (fn: () => void) => {
        clearTimeout(timeout)
        timeout = setTimeout(fn, delay)
    }
}

export default useTimeout
