import * as types from '../types'
import UserAPI from '../../apis/user/user'
import { getGroupsList } from '../group/group.actions'

export const getUsersList = () => async (dispatch) => {
  dispatch({
    type: types.GET_USERS_REQUEST,
  })

  try {
    const data = await UserAPI.getUsers()
    dispatch({
      type: types.GET_USERS_SUCCESS,
      data,
    })
  } catch (error) {
    dispatch({
      type: types.GET_USERS_FAILURE,
      error,
    })
  }
}

export const getUser = userId => async (dispatch) => {
  dispatch({
    type: types.GET_USER_REQUEST,
  })

  try {
    const data = await UserAPI.getUser(userId)
    dispatch({
      type: types.GET_USER_SUCCESS,
      data,
    })
  } catch (error) {
    dispatch({
      type: types.GET_USER_FAILURE,
      error,
    })
  }
}

export const createUser = body => async (dispatch) => {
  dispatch({
    type: types.MODIFY_USER_REQUEST,
  })

  try {
    const data = await UserAPI.createUser(body)
    dispatch({
      type: types.MODIFY_USER_SUCCESS,
      data,
    })
  } catch (error) {
    dispatch({
      type: types.MODIFY_USER_FAILURE,
      error,
    })
  }
}

export const editUser = (id, body) => async (dispatch) => {
  dispatch({
    type: types.MODIFY_USER_REQUEST,
  })

  try {
    const data = await UserAPI.editUser(id, body)
    dispatch({
      type: types.MODIFY_USER_SUCCESS,
      data,
    })
  } catch (error) {
    dispatch({
      type: types.MODIFY_USER_FAILURE,
      error,
    })
  }
}

export const deleteUser = id => async (dispatch) => {
  dispatch({
    type: types.MODIFY_USER_REQUEST,
  })

  try {
    const data = await UserAPI.deleteUser(id)
    dispatch({
      type: types.MODIFY_USER_SUCCESS,
      data,
    })
    dispatch(getUsersList())
    dispatch(getGroupsList())
  } catch (error) {
    dispatch({
      type: types.MODIFY_USER_FAILURE,
      error,
    })
  }
}
