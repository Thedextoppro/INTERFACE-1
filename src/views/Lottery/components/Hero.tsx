import styled, { keyframes } from 'styled-components'
import { Box, Flex, Heading, Skeleton } from '@pancakeswap/uikit'
import { LotteryStatus } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useLottery } from 'state/lottery/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'
import { TicketPurchaseCard } from '../svgs'
import BuyTicketsButton from './BuyTicketsButton'
import Spinner from '../../Swap/Spinner'
import Image from 'next/image';
import useGetNextLotteryEvent from '../hooks/useGetNextLotteryEvent'
import RoundClock from './RoundClock';

const textBox: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: 'rgba(100, 100, 100, 0.3)',
  borderRadius: '25px',
  border: '1px solid lightgray',
  padding: '5px',
  margin: '12px',
};

const floatingStarsLeft = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(10px, 10px);
  }
  to {
    transform: translate(0, -0px);
  }  
`

const floatingStarsRight = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-10px, 10px);
  }
  to {
    transform: translate(0, -0px);
  }  
`

const floatingTicketLeft = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-10px, 15px);
  }
  to {
    transform: translate(0, -0px);
  }  
`

const floatingTicketRight = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(10px, 15px);
  }
  to {
    transform: translate(0, -0px);
  }  
`

const mainTicketAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(6deg);
  }
  to {
    transform: rotate(0deg);
  }  
`

const TicketContainer = styled(Flex)`
  animation: ${mainTicketAnimation} 3s ease-in-out infinite;
`

const PrizeTotalBalance = styled(Balance)`
  background: ${({ theme }) => theme.colors.gradients.gold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const StyledBuyTicketButton = styled(BuyTicketsButton)<{ disabled: boolean }>`
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.disabled : 'linear-gradient(180deg, #3675D9 0%, #153a7a 100%)'};
  width: 200px;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 240px;
  }
`

const ButtonWrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-4deg);
`

const TicketSvgWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-4deg);
`

const Decorations = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(/images/decorations/bg-star.svg);
  background-repeat: no-repeat;
  background-position: center 0;
`

const StarsDecorations = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;

  & img {
    position: absolute;
  }

  & :nth-child(1) {
    animation: ${floatingStarsLeft} 3s ease-in-out infinite;
    animation-delay: 0.25s;
  }
  & :nth-child(2) {
    animation: ${floatingStarsLeft} 3.5s ease-in-out infinite;
    animation-delay: 0.5s;
  }
  & :nth-child(3) {
    animation: ${floatingStarsRight} 4s ease-in-out infinite;
    animation-delay: 0.75s;
  }
  & :nth-child(4) {
    animation: ${floatingTicketLeft} 6s ease-in-out infinite;
    animation-delay: 0.2s;
  }
  & :nth-child(5) {
    animation: ${floatingTicketRight} 6s ease-in-out infinite;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & :nth-child(1) {
      left: 3%;
      top: 42%;
    }
    & :nth-child(2) {
      left: 9%;
      top: 23%;
    }
    & :nth-child(3) {
      right: 2%;
      top: 24%;
    }
    & :nth-child(4) {
      left: 8%;
      top: 67%;
    }
    & :nth-child(5) {
      right: 8%;
      top: 67%;
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    & :nth-child(1) {
      left: 10%;
      top: 42%;
    }
    & :nth-child(2) {
      left: 17%;
      top: 23%;
    }
    & :nth-child(3) {
      right: 10%;
      top: 24%;
    }
    & :nth-child(4) {
      left: 17%;
      top: 67%;
    }
    & :nth-child(5) {
      right: 17%;
      top: 67%;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    & :nth-child(1) {
      left: 19%;
      top: 42%;
    }
    & :nth-child(2) {
      left: 25%;
      top: 23%;
    }
    & :nth-child(3) {
      right: 19%;
      top: 24%;
    }
    & :nth-child(4) {
      left: 24%;
      top: 67%;
    }
    & :nth-child(5) {
      right: 24%;
      top: 67%;
    }
  }
`

const Hero = () => {
  const { t } = useTranslation()
  const {
    currentRound: { amountCollectedInXfn, status, endTime },
    isTransitioning,
  } = useLottery()

  const cakePriceBusd = usePriceCakeBusd()
  const prizeInBusd = amountCollectedInXfn.times(cakePriceBusd)
  const prizeTotal = getBalanceNumber(prizeInBusd, 9)
  const ticketBuyIsDisabled = status !== LotteryStatus.OPEN || isTransitioning  
  const endTimeAsInt = parseInt(endTime, 10)
  const { nextEventTime, postCountdownText, preCountdownText } = useGetNextLotteryEvent(endTimeAsInt, status)

  const getHeroHeading = () => {
    if (status === LotteryStatus.OPEN) {
      return (
        <>
          <div style={{ marginBottom: '25px' }}>
            <div style={textBox}>
              <div style={{ marginLeft: '75px', marginRight: '75px' }}>
                {prizeInBusd.isNaN() ? (
                  <Skeleton my="7px" height={60} width={190} />
                ) : (
                  <PrizeTotalBalance fontSize="64px" bold prefix="$" value={prizeTotal} mb="8px" decimals={0} />
                )}
                <Heading mb="32px" scale="lg" color="#ffffff">
                  {t('in prizes!')}
                </Heading>
              </div>
            </div>
          </div>
        </>
      )
    }
    return (
      <Heading mb="24px" scale="xl" color="#ffffff">
        {t('Xfortune closed')}
      </Heading>
    )
  }

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Decorations />
      <StarsDecorations display={['none', 'none', 'block']}>
        <img src="/images/home/lunar-bunny/logo.gif?v=2" width="0px" height="0px" />
        <img src="/images/home/lunar-bunny/pulse-logo.png?v=2" width="0px" height="0px" />
        <img src="/images/home/lunar-bunny/logo.gif?v=2" width="0px" height="0px" />
        <img src="/images/home/lunar-bunny/logo.gif?v=2" width="144px" height="144px" />
        <img src="/images/home/lunar-bunny/pulse-logo.png?v=2" width="109px" height="109px" />
      </StarsDecorations>
      <div style={{ marginBottom: '25px', width: 'min(90%, 640px)' }}>
        <div style={textBox}>
          <Heading m="8px" scale="xl" color="#ffffff" id="lottery-hero-title">
            {t('Win Big With Xfortune')}
          </Heading>
        </div>
        <div style={{ margin: '0 auto', width: 'min(90%, 640px)' }}>
          <RoundClock nextEventTime={nextEventTime} />
        </div> 
      </div>
      {getHeroHeading()}
      <TicketContainer
        position="relative"
        width={['240px', '288px']}
        height={['94px', '113px']}
        alignItems="center"
        justifyContent="center"
        style={{ marginBottom: '50px' }}
      >
        <ButtonWrapper style={{ filter: 'drop-shadow(5px 5px 8px #222)' }}>
          <StyledBuyTicketButton disabled={ticketBuyIsDisabled} />
        </ButtonWrapper>
        <TicketSvgWrapper>
           <img src="/images/lottery/xfuzion_ticket.png?v=2" width="480px" height="240px" style={{ filter: 'drop-shadow(5px 5px 8px #222)' }} />
        </TicketSvgWrapper>
      </TicketContainer>
    </Flex>
  )
}

export default Hero
