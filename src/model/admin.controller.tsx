import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import configs from 'configs'
import { DappManifest } from './dapp.controller'

const {
  api: { dapp },
} = configs

/**
 * Interface & Utility
 */
export type State = Record<string, DappManifest>

/**
 * Store constructor
 */

const NAME = 'admin'
const initialState: State = {}

/**
 * Actions
 */

export const getAllDApps = createAsyncThunk(`${NAME}/getAllDApps`, async () => {
  const { data } = await axios.get(dapp.index, {
    withCredentials: true,
  })
  const dapps: State = {}
  data.forEach((dapp: DappManifest) => (dapps[dapp.appId] = dapp))
  return dapps
})

export const verifyDApp = createAsyncThunk(
  `${NAME}/verifyDApp`,
  async (manifest: Pick<DappManifest, 'appId' | 'verified'>) => {
    const { data } = await axios.post(dapp.verify, manifest, {
      withCredentials: true,
    })
    return { [data.appId]: data }
  },
)

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(
        getAllDApps.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        verifyDApp.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
