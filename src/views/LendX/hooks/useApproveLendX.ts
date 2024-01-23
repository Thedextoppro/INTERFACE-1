import { useCallback } from 'react'
import { MaxUint256 } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { useLendX, useNftContract, useNftSaleContract, useZapContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { getNftSaleContract } from 'utils/contractHelpers'

const useApproveLendX = (daiContract: Contract) => {
  const lendXContract = useLendX()
  const { callWithGasPrice } = useCallWithGasPrice()
  const handleApprove = useCallback(async () => {
    return callWithGasPrice(daiContract, 'approve', [lendXContract.address, MaxUint256])
  }, [daiContract, lendXContract, callWithGasPrice])

  return { onApprove: handleApprove }
}

export default useApproveLendX
