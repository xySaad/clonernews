const throttle = (func, wait = 0) => {
    let lastInvoke = 0
    let lastTimeout = 0

    return (...args) => {
        if (lastInvoke == 0) {
            func(...args)
            lastInvoke = Date.now()
            return
        }

        clearTimeout(lastTimeout)

        lastTimeout = setTimeout(() => {
            lastInvoke = Date.now()
            func(...args)
        }, wait - (Date.now() - lastInvoke))
    }
}

const throttleWithLeading = (func, wait) => {
    let lastInvoke = 0
    let lastTimeout = 0

    return (...args) => {
        if (lastInvoke == 0) {
            func(...args)
            lastInvoke = Date.now()
            return
        }

        clearTimeout(lastTimeout)

        lastTimeout = setTimeout(() => {
            lastInvoke = 0
        }, wait - (Date.now() - lastInvoke))
    }
}

const throttleWithTrailing = (func, wait) => {
    let lastInvoke = 0
    let lastTimeout = 0

    return (...args) => {
        clearTimeout(lastTimeout)
        const timeout = (Date.now() - lastInvoke) < wait ? wait - (Date.now() - lastInvoke) : wait

        lastTimeout = setTimeout(() => {
            lastInvoke = Date.now()
            func(...args)
        }, timeout)
    }
}

const opThrottle = (func, wait = 0, options) => {
    const leading = options?.leading ?? false
    const trailing = options?.trailing ?? true

    if (leading && trailing) {
        return throttle(func, wait)
    }
    if (leading) {
        return throttleWithLeading(func, wait)
    }
    if (trailing) {
        return throttleWithTrailing(func, wait)
    }
}

export { throttle, opThrottle }