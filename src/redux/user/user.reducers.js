import {
  NOT_LOADED,
  LOADING,
  SUCCEEDED,
  FAILED,
} from '../../constants/loading-status'

import * as types from '../types'

export const initialState = {
  data: [],
  loadingStatus: NOT_LOADED,
  error: undefined,
  currentUser: {
    data: undefined,
    loadingStatus: NOT_LOADED,
    error: undefined,
  },
}

export default function userReducers(state = initialState, action) {
  switch (action.type) {
    case types.GET_USERS_REQUEST: return {
      ...state,
      loadingStatus: LOADING,
    }

    case types.GET_USERS_SUCCESS: return {
      ...state,
      loadingStatus: SUCCEEDED,
      data: action.data,
      error: undefined,
    }

    case types.GET_USERS_FAILURE: return {
      ...state,
      loadingStatus: FAILED,
      error: action.error,
    }

    default: return state
  }
}
