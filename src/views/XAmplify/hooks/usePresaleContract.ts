/* eslint-disable @typescript-eslint/no-unused-vars */
import { MaxUint256 } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import axios from "axios";
import { usePresale } from 'hooks/useContract'
import { useCallback } from 'react'
import { buy, claim } from 'utils/calls'

const useBuy = () => {
  const presaleContract = usePresale()
  const handleBuy = useCallback(
    async (amount: string) => {
      return buy(presaleContract, amount)
    },
    [presaleContract],
  )
  return { onBuy: handleBuy }
}

export const useClaim = () => {
  const presaleContract = usePresale()
  const handleCliam = useCallback(async () => {
    return claim(presaleContract)
  }, [presaleContract])
  return { onClaim: handleCliam }
}

/**
 * gets price of token from coingecko
 * @param tokenId STRING taken from https://www.coingecko.com/api/documentations/v3#/coins/get_coins_list
 * @returns INTEGER usd value
 */
export async function getTokenPrice(tokenId = "pulsechain"): Promise<number> {
  let tokenPrice = 0.0000685;
  try {
    const cgResp = (await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`,
    )) as {
      data: { [id: string]: { usd: number } };
    };
    tokenPrice = cgResp.data[tokenId].usd;
  } catch (e) {
    console.warn(`Error accessing coinGecko API for ${tokenId}`);
  }
  return tokenPrice;
}

// export const useApprove = (usdtContact: Contract) => {
//   const presaleContract = usePresale()
//   // const { callWithGasPrice } = useCallWithGasPrice()
//   // const handleApprove = useCallback(async () => {
//   //   return callWithGasPrice(usdtContact, 'approve', [presaleContract.address, MaxUint256])
//   // }, [callWithGasPrice, usdtContact, presaleContract.address])
//   const handleApprove = useCallback(async () => {
//     return approve(usdtContact, presaleContract.address)
//   }, [presaleContract.address, usdtContact])
//   return { onApprove: handleApprove }
// }

export default useBuy
