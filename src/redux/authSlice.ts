import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, logOut } from '@/api/login'

export const fetchLogin = createAsyncThunk(
  'auth/featchLogin',
  async params => await login(params as any),
)

export const fetchLogOut = createAsyncThunk('auth/featchLogOut', async () => await logOut())

type userType = {
  roles: string[]
  name: string
  menu: string[]
}

type loginStatus = 'login_idle' | 'login_loading' | 'login_succeeded' | 'login_failed'
type logOutStatus = 'logOut_idle' | 'logOut_loading' | 'logOut_succeeded' | 'logOut_failed'

interface AuthState {
  status: logOutStatus | loginStatus
  error: string | null
  data: userType | null
}
const initialState: AuthState = {
  status: 'idle',
  error: null,
  data: {
    roles: [],
    name: '',
    menu: [],
  },
}

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // log in
      .addCase(fetchLogin.pending, (state, action) => {
        state.status = 'login_loading'
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'login_succeeded'
        state.data = Object.assign({}, state.data, action.payload.data)
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = 'login_failed'
        state.error = action.payload ?? null
      })
      // log out
      .addCase(fetchLogOut.pending, (state, _action) => {
        state.status = 'logOut_loading'
      })
      .addCase(fetchLogOut.fulfilled, (state, _action) => {
        state.status = 'logOut_succeeded'
        state.data = Object.assign({}, state.data, {
          roles: [],
          name: '',
          menu: [],
        })
      })
      .addCase(fetchLogOut.rejected, (state, action) => {
        state.status = 'logOut_failed'
        state.error = action.payload ?? null
      })
  },
})

// Action creators are generated for each case reducer function
// export const { SetAuth, GetAuth, Pedding } = authSlice.actions

export default authSlice.reducer
