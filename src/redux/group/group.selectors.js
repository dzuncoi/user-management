import { createSelector } from 'reselect'

export const getGroups = state => state.groups

export const getGroupsList = createSelector(
  getGroups,
  ({ data }) => data,
)

export const getGroupsListLoadingStatus = createSelector(
  getGroups,
  ({ loadingStatus }) => loadingStatus,
)

export const getCurrentGroupData = createSelector(
  getGroups,
  ({ currentGroup: { data } }) => data,
)

export const getCurrentGroupLoadingStatus = createSelector(
  getGroups,
  ({ currentGroup: { loadingStatus } }) => loadingStatus,
)
