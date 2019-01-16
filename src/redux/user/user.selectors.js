import { createSelector } from 'reselect'

export const getUsers = state => state.users

export const getUsersList = createSelector(
  getUsers,
  ({ data }) => data,
)

export const getUsersListLoadingStatus = createSelector(
  getUsers,
  ({ loadingStatus }) => loadingStatus,
)
