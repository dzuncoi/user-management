import faker from 'faker'

export const users = {
  data: [{
    id: '8534a7c5-c8d7-46d8-a13e-119f5102a3ec',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    groups: ['4028c4bb-0330-4996-9721-24cafdf29d39', '77e85e8c-4c24-48f0-b6ae-4af0a4e1d29f'],
  }, {
    id: '02ee72e4-275c-48ec-8395-9512aff6d096',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    groups: ['77e85e8c-4c24-48f0-b6ae-4af0a4e1d29f'],
  }],
}

export default users
