/* eslint-disable @typescript-eslint/no-unused-vars */

import { useERC20 } from 'hooks/useContract'
import { useCallback } from 'react'
import { BURN_ADDRESS } from 'config/constants';
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice';
import useCatchTxError from 'hooks/useCatchTxError';
import { useToast } from '@pancakeswap/uikit';
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from 'contexts/Localization';

const useBurn = (address: string) => {
  const { t } = useTranslation()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()
  const tokenContract = useERC20(address)
  const handleBurn = useCallback(
    async (amount: string) => {
      const receipt = await fetchWithCatchTxError(() => {
        return callWithGasPrice(tokenContract, 'transfer', [BURN_ADDRESS, amount])
      })
      if (receipt?.status) {
        toastSuccess(
          t('You have burned DEX tokens')
          // <ToastDescriptionWithTx txHash={receipt.transactionHash}>{successMsg}</ToastDescriptionWithTx>,
        )
      }
    },
    [callWithGasPrice, fetchWithCatchTxError, t, toastSuccess, tokenContract],
  )
  return { onBurn: handleBurn }
}

export default useBurn
