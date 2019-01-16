import {
  email,
  required,
} from './validations'

describe('validations', () => {
  describe('required', () => {
    it('Pass validation if value is not empty', () => {
      expect(required('message')('value')).toBeUndefined()
      expect(required('message')(100)).toBeUndefined()
      expect(required('message')(true)).toBeUndefined()
      expect(required('message')({})).toBeUndefined()
    })

    it('Return error message if value is empty', () => {
      const message = 'error'
      expect(required(message)()).toEqual(message)
      expect(required(message)('')).toEqual(message)
      expect(required(message)(' ')).toEqual(message)
      expect(required(message)(null)).toEqual(message)
      expect(required(message)(undefined)).toEqual(message)
    })
  })

  describe('email', () => {
    it('Pass validation if email format is correct', () => {
      expect(email('test@example.com')).toBeUndefined()
      expect(email('*@example.com')).toEqual(undefined)
      expect(email('**@example.com')).toEqual(undefined)
      expect(email('dev@goigi.technology')).toEqual(undefined)
      expect(email('a@bb.cc')).toEqual(undefined)
      expect(email('test@example.com')).toEqual(undefined)
    })

    it('Return error if email format is invalid', () => {
      expect(email('test@')).toEqual('Email is not valid')
      expect(email('a@b.c')).toEqual('Email is not valid')
    })
  })
})
