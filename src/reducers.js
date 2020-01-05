import { combineReducers } from 'redux'
import layoutReducer from '@/layout/reducer'
import loginReducer from '@/views/login/reducer'

const rootReducer = combineReducers({
  ...loginReducer,
  ...layoutReducer
})

export default rootReducer
