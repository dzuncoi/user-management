import 'whatwg-fetch'
import jestFetch from 'jest-fetch-mock'

global.fetch = jestFetch
