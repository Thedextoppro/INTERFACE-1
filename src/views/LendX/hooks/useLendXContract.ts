/* eslint-disable @typescript-eslint/no-unused-vars */
import { MaxUint256 } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import axios from "axios";
import { useLendX } from 'hooks/useContract'
import { useCallback } from 'react'
import { lendX } from 'utils/calls'

export const useLending = () => {
  const lendXContract = useLendX()
  const handleLendX = useCallback(async (pid) => {
    return lendX(lendXContract, pid)
  }, [lendXContract])
  return { onLendX: handleLendX }
}

