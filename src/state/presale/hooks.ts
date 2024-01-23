import { useWeb3React } from '@pancakeswap/wagmi'
import { SLOW_INTERVAL } from 'config/constants'
import useSWRImmutable from 'swr/immutable'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { fetchPresaleData, fetchPresaleUserDataAsync } from '.'

export function usePresaleState(): AppState['presale'] {
  return useSelector<AppState, AppState['presale']>((state) => state.presale)
}

export const usePresaleUserData = () => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useActiveWeb3React()

  useSWRImmutable(
    ['presaleData'],
    () => {
      dispatch(fetchPresaleData(chainId))
    },
    {
      refreshInterval: SLOW_INTERVAL,
    },
  )

  useSWRImmutable(
    account ? ['presaleWithUserData', account] : null,
    () => {
      dispatch(fetchPresaleUserDataAsync({ account }))
    },
    {
      refreshInterval: SLOW_INTERVAL,
    },
  )
}
