import presaleABI from 'config/abi/presale.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getPresaleAddress } from 'utils/addressHelpers'
import { bscTokens } from 'config/constants/tokens'
import { pulseChainTokens } from '@pancakeswap/tokens'

export const fetchPresaleUser = async (account: string) => {
  const presaleAddress = getPresaleAddress()

  const calls = [
    {
      address: presaleAddress,
      name: 'availableOf',
      params: [account],
    },
    {
      address: presaleAddress,
      name: 'claimedOf',
      params: [account],
    },
    {
      address: presaleAddress,
      name: 'donationsOf',
      params: [account],
    },
  ]

  const callResult = await multicall(presaleABI, calls)
  return callResult
}

// export const fetchUsdtUser = async (account: string) => {
//   const presaleAddress = getPresaleAddress()

//   const calls = [
//     {
//       address: presaleAddress,
//       name: 'availableOf',
//       params: [account],
//     },
//     {
//       address: presaleAddress,
//       name: 'claimedOf',
//       params: [account],
//     },
//     {
//       address: presaleAddress,
//       name: 'donationsOf',
//       params: [account],
//     },
//   ]

//   const callResult = await multicall(erc20ABI, calls)
//   return callResult[0]
// }
