const findResourceById = Resource => id => Resource.find(record => record.id === id)
export default findResourceById
