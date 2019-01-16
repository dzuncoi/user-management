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

export const getGroup = groupId => async (dispatch) => {
  dispatch({
    type: types.GET_GROUP_REQUEST,
  })

  try {
    const data = await GroupAPI.getGroup(groupId)
    dispatch({
      type: types.GET_GROUP_SUCCESS,
      data,
    })
  } catch (error) {
    dispatch({
      type: types.GET_GROUP_FAILURE,
      error,
    })
  }
}

export const createGroup = body => async (dispatch) => {
  dispatch({
    type: types.MODIFY_GROUP_REQUEST,
  })

  try {
    const data = await GroupAPI.createGroup(body)
    dispatch({
      type: types.MODIFY_GROUP_SUCCESS,
      data,
    })
  } catch (error) {
    dispatch({
      type: types.MODIFY_GROUP_FAILURE,
      error,
    })
  }
}

export const editGroup = (id, body) => async (dispatch) => {
  dispatch({
    type: types.MODIFY_GROUP_REQUEST,
  })

  try {
    const data = await GroupAPI.editGroup(id, body)
    dispatch({
      type: types.MODIFY_GROUP_SUCCESS,
      data,
    })
  } catch (error) {
    dispatch({
      type: types.MODIFY_GROUP_FAILURE,
      error,
    })
  }
}
