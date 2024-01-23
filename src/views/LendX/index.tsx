import styled, { keyframes } from 'styled-components';
import { Text, Box, Flex, Button, Heading, LinkExternal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { EXCHANGE_DOCS_URLS } from 'config/constants'
import { useCurrency } from 'hooks/Tokens'
import { useCallback, useMemo, useState } from 'react'
import { CSSProperties } from 'react';
import { useCurrencyBalance } from 'state/wallet/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useToast from 'hooks/useToast'
import { useAppDispatch } from 'state'
import useCatchTxError from 'hooks/useCatchTxError'
import { pulseChainTokens } from '@pancakeswap/tokens'
import { AutoColumn } from '../../components/Layout/Column'
import { Wrapper } from './components/styleds'
import { AppBody } from '../../components/App'
import Page from '../Page'
import { useLending } from './hooks/useLendXContract'
import { getLendXAddress } from 'utils/addressHelpers'
import React from 'react';
import { useLendXState, useLendXUserData } from 'state/lendx/hooks';
import { fetchLendXUserDataAsync } from 'state/lendx';
import { lendX } from 'utils/calls';
import { ToastDescriptionWithTx } from 'components/Toast';
import { useERC20 } from 'hooks/useContract';
import useApproveLendX from './hooks/useApproveLendX';
import { getFullDisplayBalance } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';

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

export default function LendX() {
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const { account } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  useLendXUserData()
  const XFNCurrency = useCurrency(pulseChainTokens.xfn.address)
  const DAICurrency = useCurrency(pulseChainTokens.dai.address)
  const XFNBalance = useCurrencyBalance(account ?? undefined, XFNCurrency ?? undefined)
  const DAIBalance = useCurrencyBalance(account ?? undefined, DAICurrency ?? undefined)
  const { fetchWithCatchTxError } = useCatchTxError()
  const [pendingClaimTx, setPendingLendXTx] = useState(false)
  const [pendingApproveTx, setApprovingTx] = useState(false)
  const { data, userData } = useLendXState()
  const [lendXType, setLendXType] = useState('0')
  const { onLendX } = useLending()
  const daiContract = useERC20(pulseChainTokens.dai.address)
  const handleLendX = async (pid) => {
    const receipt: any = await fetchWithCatchTxError(() => {
      return onLendX(pid)
    })
    if (receipt?.status) {
      toastSuccess(`${t('Successful')}!`)
      dispatch(fetchLendXUserDataAsync({ account }))
    }
  }

  function convertToShortScale(number) {
    const trillion = 1e12;
    const billion = 1e9;
    const million = 1e6;
    if (number >= trillion) {
      return `${(number / trillion).toFixed(2)  }T`;
    }  if (number >= billion) {
      return `${(number / billion).toFixed(2)  }B`;
    }  if (number >= million) {
      return `${(number / million).toFixed(2)  }M`;
    // eslint-disable-next-line no-lone-blocks
    }  {
      return number.toString();
    }
  }

  const { onApprove } = useApproveLendX(daiContract)

  const handleApprove = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onApprove()
    })
    if (receipt?.status) {
      toastSuccess(t('Contract Enabled'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      dispatch(fetchLendXUserDataAsync({ account }))
    }
  }, [onApprove, dispatch, account, t, toastSuccess, fetchWithCatchTxError])


  const [btnTextClaim, disabledClaim] = useMemo(() => {
    if (pendingClaimTx) {
      return ['Lending', true]
    }
    if (userData.isAvailable) {
      if(lendXType === '0' && Number(DAIBalance?.toFixed(2)) >= 0.1)
        return ['Lend', false]
      if(lendXType === '1' && Number(DAIBalance?.toFixed(2)) >= 0.5)
        return ['Lend', false]
      return ['Lend', true]  
    }
    return ['Lend', true]
  }, [DAIBalance, lendXType, pendingClaimTx, userData.isAvailable])

  const [btnTextApprove, disabledApprove] = useMemo(() => {
    if (pendingApproveTx) {
      return ['Approving', true]
    }
    if (Number(userData.isAllowance) === 0) {
      return ['Approve', false]
    }
    return ['Approve', true]
  }, [pendingApproveTx, userData.isAllowance])

  return (
    <>
      <div style={gradientOverlayStyle}></div>
      <div style={backgroundLogo}>
      <Page style={{ position: 'relative' }} helpUrl={`${EXCHANGE_DOCS_URLS}/overview/ido`}>
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
                  <Wrapper id="presale-page" style={{ minHeight: '372px', minWidth: '400px' }}>
                    <AutoColumn gap="sm">
                      <Flex alignItems="center" justifyContent="center" mt="16px">
                        <Heading color="$isActive" scale="lg">
                          LendX
                        </Heading>
                      </Flex>
                    
                    </AutoColumn>
                    <AutoColumn>
                      <label htmlFor='radio'>
                        <input type="radio" name="radio" value={0} checked={lendXType === '0'} onChange={(e) => setLendXType(e.target.value)} />
                        <span>100 DAI</span>
                      </label>

                      <label htmlFor='radio'>
                        <input type="radio" name="radio" value={1} checked={lendXType === '1'} onChange={(e) => setLendXType(e.target.value)} />
                        <span>500 DAI</span>
                      </label>
                    </AutoColumn>
                    <Box width="100%" my="12px">
                      {!account ? (
                        <ConnectWalletButton width="100%" scale="md" />
                      ) : (
                        <>     
                        {Number(userData.isAllowance) === 0 ?                     
                          <Button
                            scale="md"
                            width="100%"
                            disabled={disabledApprove}
                            onClick={async () => {
                              setApprovingTx(true)
                              await handleApprove()
                              setApprovingTx(false)
                            }}
                          >
                            {btnTextApprove}
                          </Button>
                          :
                          <Button
                            scale="md"
                            width="100%"
                            disabled={disabledClaim}
                            onClick={async () => {
                              setPendingLendXTx(true)
                              await handleLendX(lendXType)
                              setPendingLendXTx(false)
                            }}
                          >
                            {btnTextClaim}
                          </Button>
                        }
                        </>
                      )}
                    </Box>
                    <Flex justifyContent="space-between">
                      <Text>Contract Address:</Text>
                      <LinkExternal href="https://scan.pulsechain.com/address/0xA8109AaDa855f906BdA4035931A57c83944337C2/">
                        {`${`${getLendXAddress(369).slice(0, 6)  }...${  getLendXAddress(369).slice(-4)}`}`}{' '}
                      </LinkExternal>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text>DEX (100B Required):</Text>
                      <Text>{convertToShortScale(Number(XFNBalance?.toFixed(2)))}{` XFNs`}</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text>DAI Balance:</Text>
                      <Text>{DAIBalance?.toFixed(2)}{` DAI`}</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text>DAI Invested:</Text>
                      <Text>{getFullDisplayBalance(new BigNumber(userData.totalInvested))} DAI </Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text>DAI Claimable (Automatic):</Text>
                      <Text>{Number(userData.totalInvested) > 0 && (Number(userData.totalInvested) * 2 - Number(userData.totalClaimed) === 0) ?  <span style={{color: "green"}}>Claimed</span> : <span>(getFullDisplayBalance(new BigNumber(Number(userData.totalInvested) * 2 - Number(userData.totalClaimed))) DAI)</span> }  </Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text>Claimed DAI:</Text>
                      <Text>{getFullDisplayBalance(new BigNumber(userData.totalClaimed))} DAI </Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text>Total Lenders:</Text>
                      <Text>{data.totalInvestors} </Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text>LendX Total:</Text>
                      <Text>{getFullDisplayBalance(new BigNumber(data.totalRaised)) } DAI</Text>
                    </Flex>
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
