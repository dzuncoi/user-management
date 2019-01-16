import * as types from '../types'
import GroupAPI from '../../apis/group/group'

export const getGroupsList = () => async (dispatch) => {
  dispatch({
    type: types.GET_GROUPS_REQUEST,
  })

  try {
    const data = await GroupAPI.getGroups()
    dispatch({
      type: types.GET_GROUPS_SUCCESS,
      data,
    })
  } catch (error) {
    dispatch({
      type: types.GET_GROUPS_FAILURE,
      error,
    })
  }
}

export default getGroupsList
