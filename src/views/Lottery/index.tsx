import { useState } from 'react'
import styled from 'styled-components'
import { Box, Flex, Heading, Skeleton } from '@pancakeswap/uikit'
import { LotteryStatus } from 'config/constants/types'
import PageSection from 'components/PageSection'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { useFetchLottery, useLottery } from 'state/lottery/hooks'
import {
  TITLE_BG,
  GET_TICKETS_BG,
  FINISHED_ROUNDS_BG,
  FINISHED_ROUNDS_BG_DARK,
  CHECK_PRIZES_BG,
} from './pageSectionStyles'
import useGetNextLotteryEvent from './hooks/useGetNextLotteryEvent'
import useStatusTransitions from './hooks/useStatusTransitions'
import Hero from './components/Hero'
import NextDrawCard from './components/NextDrawCard'
import Countdown from './components/Countdown'
import HistoryTabMenu from './components/HistoryTabMenu'
import YourHistoryCard from './components/YourHistoryCard'
import AllHistoryCard from './components/AllHistoryCard'
import CheckPrizesSection from './components/CheckPrizesSection'
import HowToPlay from './components/HowToPlay'
import useShowMoreUserHistory from './hooks/useShowMoreUserRounds'
import { PageMeta } from '../../components/Layout/Page'

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
  boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.5)',
};

const LotteryPage = styled.div`
  min-height: calc(100vh - 64px);
`

const Lottery = () => {
  useFetchLottery()
  useStatusTransitions()
  const { t } = useTranslation()
  const { isDark, theme } = useTheme()
  const {
    currentRound: { status, endTime },
  } = useLottery()
  const [historyTabMenuIndex, setHistoryTabMenuIndex] = useState(0)
  const endTimeAsInt = parseInt(endTime, 10)
  const { nextEventTime, postCountdownText, preCountdownText } = useGetNextLotteryEvent(endTimeAsInt, status)
  const { numUserRoundsRequested, handleShowMoreUserRounds } = useShowMoreUserHistory()

  return (
    <>
      <PageMeta />
      <LotteryPage>
        <PageSection background={TITLE_BG} index={1} hasCurvedDivider={false}>
          <Hero />
        </PageSection>
        <PageSection
          containerProps={{ style: { marginTop: '-30px' } }}
          background={GET_TICKETS_BG}
          index={2}
          hasCurvedDivider={false}
        >
          <Flex alignItems="center" justifyContent="center" flexDirection="column" pt="24px">
            {status === LotteryStatus.OPEN && (
              <div style={{ marginBottom: '25px', width: 'min(90%, 640px)' }}>
                <div style={textBox}>
                  <Heading scale="xl" color="#ffffff" mb="5px" textAlign="center">
                    {t('Get your tickets now!')}
                  </Heading>
                </div>
              </div>
            )}
            <div style={{ margin: '0 auto', width: 'min(90%, 480px)' }}>
              <img src="/images/lottery/get_your_tickets_now.jpg" alt="" style={{ borderRadius: '25px', boxShadow: '0 0 8px rgba(0, 0, 0, 1)' }}/>
            </div> 
              <div style={{ marginBottom: '25px', width: 'min(90%, 480px)' }}>
                <div style={textBox}>
                  <div style={{ margin: '12px', width: 'min(80%, 360px)' }}>
                    <img src="/images/lottery/xfortune_balls.jpg" alt="" style={{ borderRadius: '25px', boxShadow: '0 0 8px rgba(0, 0, 0, 1)' }}/>
                  </div> 
                  <div style={textBox}>
                    <Flex alignItems="center" justifyContent="center" mb="12px" ml="12px" mr="12px">
                      {nextEventTime && (postCountdownText || preCountdownText) ? (
                        <Countdown
                          nextEventTime={nextEventTime}
                          postCountdownText={postCountdownText}
                          preCountdownText={preCountdownText}
                        />
                      ) : (
                        <Skeleton height="41px" width="250px" />
                      )}
                    </Flex>
                  </div>
                </div>
              </div>
            <NextDrawCard />
          </Flex>
        </PageSection>
        <PageSection background={CHECK_PRIZES_BG} hasCurvedDivider={false} index={2}>
          <div style={textBox}>
            <div style={{ margin: '12px auto', width: 'min(90%, 320px)' }}>
              <img src="/images/lottery/winner.jpg" alt="" style={{ borderRadius: '25px', boxShadow: '0 0 8px rgba(0, 0, 0, 1)' }}/>
              <CheckPrizesSection />
            </div> 
          </div>
        </PageSection>
        <PageSection
          innerProps={{ style: { margin: '0', width: '100%' } }}
          background={isDark ? FINISHED_ROUNDS_BG_DARK : FINISHED_ROUNDS_BG}
          hasCurvedDivider={false}
          index={2}
        >
          <div style={{ margin: '12px auto', width: 'min(90%, 320px)' }}>
            <img src="/images/lottery/finished_rounds.jpg" alt="" style={{ borderRadius: '25px', boxShadow: '0 0 8px rgba(0, 0, 0, 1)' }}/>
          </div> 
          <Flex width="100%" flexDirection="column" alignItems="center" justifyContent="center">
            <Heading mb="24px" scale="xl">
              {t('Finished Rounds')}
            </Heading>
            <Box mb="24px">
              <HistoryTabMenu
                activeIndex={historyTabMenuIndex}
                setActiveIndex={(index) => setHistoryTabMenuIndex(index)}
              />
            </Box>
            {historyTabMenuIndex === 0 ? (
              <AllHistoryCard />
            ) : (
              <YourHistoryCard
                handleShowMoreClick={handleShowMoreUserRounds}
                numUserRoundsRequested={numUserRoundsRequested}
              />
            )}
          </Flex>
        </PageSection>
        <PageSection
          index={2}
        >
        </PageSection>
      </LotteryPage>
    </>
  )
}

export default Lottery
