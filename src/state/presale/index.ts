import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import { ChainId } from '@pancakeswap/sdk'
import { resetUserState } from '../global/actions'
import { fetchPresalePublicData } from './fetctPresalePublicData'
import { fetchPresaleUser } from './fetchPresaleUser'

const initialState = {
  data: {
    // hardCap: '0',
    // softCap: '0',
    // maxLimit: '0',
    // minLimit: '0',
    // totalRaised: '0',
    // startTime: '0',
    // endTime: '0',
    // presaleRatio: '0',
    // isClaimable: false,
    endedOn: '0',
    totalClaimableTokens: '0',
    totalClaimedTokens: '0',
    totalEthDonated: '0',

  },
  userData: {
    availableOf: '0',
    claimedOf: '0',
    donationsOf: '0',
  },
  userDataLoaded: false,
}

export const fetchPresaleData = createAsyncThunk('farms/fetchPresaleData', async (chainId: ChainId) => {
  const farms = await fetchPresalePublicData(chainId)
  return {
    // isClaimable: farms[8] ?? false,
    endedOn: new BigNumber(farms[0]).toJSON(),
    totalClaimableTokens: new BigNumber(farms[1]).toJSON(),
    totalClaimedTokens: new BigNumber(farms[2]).toJSON(),
    totalEthDonated: new BigNumber(farms[3]).toJSON(),
  }
})

export const fetchPresaleUserDataAsync = createAsyncThunk<any, { account: string }>(
  'farms/fetchPresaleUserDataAsync',
  async ({ account }) => {
    const userInfo = await fetchPresaleUser(account)
    return {
      availableOf: new BigNumber(userInfo[0]).toJSON(),
      claimedOf: new BigNumber(userInfo[1]).toJSON(),
      donationsOf: new BigNumber(userInfo[2]).toJSON(),
    }
  },
)

export const presaleSlice = createSlice({
  name: 'Presale',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetUserState, (state) => {
      state.userData = {
        availableOf: '0',
        claimedOf: '0',
        donationsOf: '0',
      }
      state.userDataLoaded = false
    })
    builder.addCase(fetchPresaleData.fulfilled, (state, action) => {
      state.data = { ...action.payload }
    })
    builder.addCase(fetchPresaleUserDataAsync.fulfilled, (state, action) => {
      state.userData = { ...action.payload }
      state.userDataLoaded = true
    })
  },
})

export default presaleSlice.reducer
