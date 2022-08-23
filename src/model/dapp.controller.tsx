import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type State = Record<string, ComponentManifest>

/**
 * Store constructor
 */

const NAME = 'dapp'
const initialState: State = {}

/**
 * Actions
 */

export const getDApps = createAsyncThunk(`${NAME}/getDApps`, async () => {
  return {}
})

export const submitDApp = createAsyncThunk(
  `${NAME}/submitDApp`,
  async (manifest: ComponentManifest) => {
    return { [manifest.appId]: manifest }
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
        getDApps.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        submitDApp.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
