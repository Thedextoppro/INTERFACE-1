import styled, { keyframes } from 'styled-components';
import { Text, Box, Flex, Button, Heading, AutoRenewIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { FlexGap } from 'components/Layout/Flex'
import { BURN_ADDRESS, EXCHANGE_DOCS_URLS } from 'config/constants'
import NumericalInput from 'components/CurrencyInputPanel/NumericalInput'
import { CurrencyLogo } from 'components/Logo'
import { useCurrency } from 'hooks/Tokens'
import { useCallback, useEffect, useState } from 'react'
import { CSSProperties } from 'react';
import { useCurrencyBalance } from 'state/wallet/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { usePresaleState, usePresaleUserData } from 'state/presale/hooks'
import { getBalanceAmount } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import useToast from 'hooks/useToast'
import useCatchTxError from 'hooks/useCatchTxError'
import { useERC20 } from 'hooks/useContract'
import { pulseChainTokens } from '@pancakeswap/tokens'
import { AutoColumn } from '../../components/Layout/Column'
import { Wrapper } from './components/styleds'
import { AppBody } from '../../components/App'
import Page from '../Page'
import { parseUnits } from '@ethersproject/units';
import { callWithEstimateGas } from 'utils/calls';
import { useGasPrice } from 'state/user/hooks';

const rotate = keyframes`
  100% {
    transform: rotate(1turn);
  }
`;
const ConicBorder = styled.div`
  position: relative;
  z-index: 0;
  margin: 20px;
  border-radius: 30px;
  overflow: hidden;
  padding: 4px !important;
  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: #1a232a;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 20%);
    animation: ${rotate} 2s linear infinite;
  }
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    border-radius: 5px;
  }
`;
const gradientOverlayStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'radial-gradient(circle, rgba(24, 48, 128, 1), rgba(12, 24, 64, 1), rgba(6, 12, 32, 1), rgba(0, 0, 0, 1), black)',
  opacity: 1,
  zIndex: -1,
};
const backgroundLogo: CSSProperties = {
  position: 'relative',
  background: `url('/images/home/lunar-bunny/background_logo.png') right bottom no-repeat`,
  backgroundSize: 'auto',
};
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`
const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  z-index: 1;
  width: 100%;
`
const Container = styled.div<{ error?: boolean }>`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme, error }) => theme.shadows[error ? 'warning' : 'inset']};
`
const InputRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
  flex-wrap: wrap;
`
export default function XAmplify() {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const xfnContract = useERC20(pulseChainTokens.xfn.address)
  const gasPrice = useGasPrice()
  const { data, userData } = usePresaleState()
  const { toastSuccess } = useToast()
  let isClaimable = false
  if (Number(data.endedOn) > 0) {
    isClaimable = true
  }
  const userAvailableAmount = getBalanceAmount(new BigNumber(userData.availableOf), 9).toString()
  const userClaimedAmount = getBalanceAmount(new BigNumber(userData.claimedOf), 9)
  usePresaleUserData()
  const inputCurrency = useCurrency(pulseChainTokens.xfn.address)
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, inputCurrency ?? undefined)
  const [inputAmount, setInputAmount] = useState<any>('')
  const [outputAmount, setOutputAmount] = useState<any>('')

  const handleInput = useCallback((val: any) => {
    setInputAmount(val)
    if (Number(val) === 0) {
      setOutputAmount(0)
    } else {
      setOutputAmount(Math.floor(Number(new BigNumber(val))) / 1000000)
    }
  }, [])

  useEffect(() => {
    if (Number(outputAmount) === 0) {
      setInputAmount(0)
    } else {
      setInputAmount(Math.floor(Number(new BigNumber(outputAmount))) / 1000000000000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputCurrency])
  const handleSelectMax = useCallback(() => {
    handleInput(selectedCurrencyBalance.toExact())
  }, [handleInput, selectedCurrencyBalance])

  const handleBurn = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return callWithEstimateGas(xfnContract, 'transfer', [BURN_ADDRESS, parseUnits(inputAmount, 9).toString()], {
        gasPrice,
      })
    })
    if (receipt?.status) {
      toastSuccess(
        t('You have burnt XFNs')        
      )
    }    
  }
  return (
    <>
      <div style={gradientOverlayStyle}></div>
      <div style={backgroundLogo}>
      <Page style={{ position: 'relative', minWidth:"400px" }} helpUrl={`${EXCHANGE_DOCS_URLS}/overview/ido`} >
        <Flex
          width="100%"
          justifyContent="center"
          position="relative"
          flexDirection={['column', 'column', 'column', 'row']}
        >
          <Flex
            flexDirection={['column', 'column', 'column', 'row']}
            justifyContent="center"
            alignItems={['center', 'center', 'center', 'start']}
          >
            <ConicBorder>
                <AppBody>
                  <Wrapper id="presale-page" style={{ minHeight: '372px', minWidth:"400px" }}>
                    <AutoColumn gap="sm">
                      <Flex alignItems="center" justifyContent="center" my="16px">
                          <CurrencyLogo currency={inputCurrency} size="32px" />
                          <Heading scale='lg' ml="10px">{inputCurrency?.name}</Heading>                        
                      </Flex>
                      <FlexGap gap="4px" flexDirection={['column', 'column', 'row']}>
                        <InputPanel>
                          <Flex justifyContent="space-between">
                          <Text>
                          {`${inputCurrency?.symbol} `}
                          {inputCurrency
                            ? t('Balance: %balance%', {
                                balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading'),
                              })
                            : ' -'}
                          </Text>
                            {account && (
                              <Button variant="text" scale="xs" onClick={handleSelectMax}>
                                MAX
                              </Button>
                            )}
                          </Flex>
                          <Container as="label">
                            <LabelRow>
                              <CurrencyLogo currency={inputCurrency} />
                              <NumericalInput
                                className="token-amount-input"
                                value={inputAmount}
                                onUserInput={handleInput}
                              />
                            </LabelRow>
                            <InputRow style={{ padding: '0.25rem 0.75rem 0.75rem 0.75rem' }} />
                          </Container>
                        </InputPanel>
                      </FlexGap>
                      {Number(userAvailableAmount) > 0 ? (
                        <>
                          <Flex justifyContent="space-between">
                            <Text>Estimate amount</Text>
                            <Text>{Number(userAvailableAmount) - Number(userClaimedAmount)} DEX</Text>
                          </Flex>
                        </>
                      ) : (
                        <></>
                      )}
                    </AutoColumn>                    
                    <Box width="100%" my="12px" mt="6px">
                      {!account ? (
                        <ConnectWalletButton width="100%" scale="md" />
                      ) : (     
                        <Button
                          isLoading={pendingTx}
                          endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
                          mt="20px"
                          width="100%"
                          onClick={handleBurn}
                        >
                          {pendingTx ? t('Burning') : t('Burn')}
                        </Button>                                              
                      )}
                    </Box>                    
                  </Wrapper>
                </AppBody>
            </ConicBorder>
          </Flex>
        </Flex>
      </Page>
      </div>
    </>
  )
}
