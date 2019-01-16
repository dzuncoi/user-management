# Simple User Management using React/Redux/Antd/Formik

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running App

In the project directory, you need to run mock api and app using the following command:

### `yarn api`

Runs the mock server in development mode.<br>
Default port is 3001

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `jest`

Launches the test runner <br>

## API Endpoints

### GET `/users`

Get all the users with populated groups

### POST `/user`
```
{
  firstName: String,
  lastName: String,
  email: String,
  groups: Array<String>,
}
```

Create new user

### PATCH `/user/:id`
```
{
  firstName: String,
  lastName: String,
  email: String,
  groups: Array<String>,
}
```

Modify existed user, may change associated group object

### DELETE `/user/:id`

Delete existed user, may change associated group object

### GET `/groups`

Get all the groups with populated users

### POST `/group`
```
{
  name: String
}
```

Create new group

### PATCH `/group/:id`
```
{
  name: String
}
```

Modify existed group, may change associated user object

### DELETE `/group/:id`

Delete existed group, may change associated user object

## Technical Stack

### Redux / Redux Thunk

Use to manage app state / handle async call

### Formik

Build forms in React, without tears

### Ant Design

A design system with values of Nature and Determinacy for better user experience of enterprise applications

### Json-server

Create mock api server
