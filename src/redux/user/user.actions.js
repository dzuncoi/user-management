import * as types from '../types'
import UserAPI from '../../apis/user/user'

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

export default getUsersList
