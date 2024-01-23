import { useEffect, useState, useRef } from 'react'

const useNextEventCountdown = (nextEventTime: number): number => {
  const [secondsRemaining, setSecondsRemaining] = useState(null)
  const timer = useRef(null)

  useEffect(() => {
    const currentSeconds = Math.floor(Date.now() / 1000)
    const secondsRemainingCalc = nextEventTime - currentSeconds
    setSecondsRemaining(secondsRemainingCalc)

    timer.current = setInterval(() => {
      setSecondsRemaining((prevSecondsRemaining) => {
        if (prevSecondsRemaining <= 1) {
          clearInterval(timer.current)
        }
        return prevSecondsRemaining - 1
      })
    }, 1000)

    return () => clearInterval(timer.current)
  }, [setSecondsRemaining, nextEventTime, timer])

  return secondsRemaining
}

export default useNextEventCountdown
