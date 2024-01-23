import presaleABI from 'config/abi/presale.json'
import { multicallv2 } from 'utils/multicall'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainId } from '@pancakeswap/sdk'
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'
import { getPresaleAddress } from '../../utils/addressHelpers'



const presaleCall = (chainId: ChainId) => {
  const presaleAddress = getPresaleAddress(chainId)
  
  return [
    {
      address: presaleAddress,
      name: 'endedOn',
    },
    {
      address: presaleAddress,
      name: 'totalClaimableTokens',
    },
    {
      address: presaleAddress,
      name: 'totalClaimedTokens',
    },
    {
      address: presaleAddress,
      name: 'totalEthDonated',
    },
    // {
    //   address: presaleAddress,
    //   name: 'endTime',
    // },
    // {
    //   address: presaleAddress,
    //   name: 'isClaimable'
    // },
    // {
    //   address: presaleAddress,
    //   name: 'claimableAmount'
    // },
  ]
}

export const fetchPresalePublicData = async (chainId: ChainId): Promise<any> => {
  const call = presaleCall(chainId)

  const callResult = await multicallv2({ abi: presaleABI, calls: call, chainId, options: { requireSuccess: false } })
  return callResult
}
