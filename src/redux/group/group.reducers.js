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
  currentGroup: {
    data: undefined,
    loadingStatus: NOT_LOADED,
    error: undefined,
  },
}

export default function userReducers(state = initialState, action) {
  switch (action.type) {
    case types.GET_GROUPS_REQUEST: return {
      ...state,
      loadingStatus: LOADING,
    }

    case types.GET_GROUPS_SUCCESS: return {
      ...state,
      loadingStatus: SUCCEEDED,
      data: action.data,
      error: undefined,
    }

    case types.GET_GROUPS_FAILURE: return {
      ...state,
      loadingStatus: FAILED,
      error: action.error,
    }

    case types.GET_GROUP_REQUEST: return {
      ...state,
      currentGroup: {
        ...state.currentGroup,
        loadingStatus: LOADING,
      },
    }

    case types.GET_GROUP_SUCCESS: return {
      ...state,
      currentGroup: {
        ...state.currentGroup,
        loadingStatus: SUCCEEDED,
        data: action.data,
        error: undefined,
      },
    }

    case types.GET_GROUP_FAILURE: return {
      ...state,
      currentGroup: {
        ...state.currentGroup,
        loadingStatus: FAILED,
        error: action.error,
      },
    }

    default: return state
  }
}
