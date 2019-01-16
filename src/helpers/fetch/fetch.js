export default (url, options = {}) => (
  fetch(url, options).then(res => res.json())
)
