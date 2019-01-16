export const required = (message = 'Required') => value => ((value && /\S/.test(value)) ? undefined : message)

export const email = value => (
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value)
    ? undefined
    : 'Email is not valid'
)
