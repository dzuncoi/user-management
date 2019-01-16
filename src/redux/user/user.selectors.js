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

export const getCurrentUserData = createSelector(
  getUsers,
  ({ currentUser: { data } }) => data,
)

export const getCurrentLoadingStatus = createSelector(
  getUsers,
  ({ currentUser: { loadingStatus } }) => loadingStatus,
)
