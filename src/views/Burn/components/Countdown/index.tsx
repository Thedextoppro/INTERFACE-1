import { Flex, Heading, Skeleton } from '@pancakeswap/uikit'
import getTimePeriods from 'utils/getTimePeriods'
import Timer from './Timer'
import useNextEventCountdown from '../../hooks/useNextEventCountdown'

interface CountdownProps {
  nextEventTime: number
  preCountdownText?: string
  postCountdownText?: string
}

const Countdown: React.FC<CountdownProps> = ({ nextEventTime, preCountdownText, postCountdownText }) => {
  const secondsRemaining = useNextEventCountdown(nextEventTime)
  let { days, hours, minutes, seconds } = getTimePeriods(secondsRemaining)
  if (nextEventTime === 0) {
    days = 0
    hours = 0
    minutes = 0
    seconds = 0
  }

  return (
    <>
      {secondsRemaining ? (
        <Flex display="inline-flex" justifyContent="center" alignItems="flex-end">
          {preCountdownText && (
            <Heading mr="12px" color="#ffff">
              {preCountdownText}
            </Heading>
          )}
          <Timer
            minutes={minutes} // We don't show seconds - so values from 0 - 59s should be shown as 1 min
            hours={hours}
            days={days}
            seconds={seconds}
          />
          {postCountdownText && <Heading color="#ffff">{postCountdownText}</Heading>}
        </Flex>
      ) : (
        <Skeleton height="41px" width="250px"  margin='auto'/>
      )}
    </>
  )
}

export default Countdown
