import styled from 'styled-components'
import { Box, Flex, Heading, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

export interface TimerProps {
  seconds?: number
  minutes?: number
  hours?: number
  days?: number
  wrapperClassName?: string
}

const StyledTimerFlex = styled(Flex) <{ showTooltip?: boolean }>`
  ${({ theme, showTooltip }) => (showTooltip ? ` border-bottom: 1px dashed ${theme.colors.textSubtle};` : ``)}
  div:last-of-type {
    margin-right: 0;
  }
`

const StyledTimerText = styled(Heading)`
  background: ${({ theme }) => theme.colors.backgroundDisabled};
  border-radius: 6px;
  padding-bottom: 8px;
  width: 64px;
  height: 64px;
  padding-top: 8px;
  font-weight: 500;
  line-height: initial;
  ${({ theme }) => theme.mediaQueries.xxl} {
    padding-bottom: 12px;
    padding-top: 12px;
    width: 84px;
    height: 84px;
  }
`

const CounterBox = styled(Box)`
  text-align: center;
  min-width: 48px;
  ${({ theme }) => theme.mediaQueries.xxl} {
    min-width: 64px;
  }
`

const Wrapper: React.FC<TimerProps> = ({ minutes, hours, days, seconds, wrapperClassName }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  return (
    <StyledTimerFlex alignItems="flex-end" className={wrapperClassName}>
      <CounterBox>
        <StyledTimerText mb="0px" scale="xl" mr={!isMobile ? '16px' : '4px'}>
          {days}
        </StyledTimerText>
        <Text style={{ marginRight: !isMobile ? '16px' : '4px' }}>{t('Days')}</Text>
      </CounterBox>
      <CounterBox>
        <StyledTimerText mb="0px" scale="xl" mr={!isMobile ? '16px' : '4px'}>
          {hours}
        </StyledTimerText>
        <Text style={{ marginRight: !isMobile ? '16px' : '4px' }}>{t('Hours')}</Text>
      </CounterBox>
      <CounterBox>
        <StyledTimerText mb="0px" scale="xl" mr={!isMobile ? '16px' : '4px'}>
          {minutes}
        </StyledTimerText>
        <Text style={{ marginRight: !isMobile ? '16px' : '4px' }}>{t('Minutes')}</Text>
      </CounterBox>
      <CounterBox>
        <StyledTimerText mb="0px" scale="xl">
          {seconds}
        </StyledTimerText>
        <Text>{t('Seconds')}</Text>
      </CounterBox>
    </StyledTimerFlex>
  )
}

export default Wrapper
