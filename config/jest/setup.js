import 'whatwg-fetch'
import jestFetch from 'jest-fetch-mock'
import { configure, shallow, render, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

global.fetch = jestFetch
configure({ adapter: new EnzymeAdapter() })

global.fetch = jestFetch
global.shallow = shallow
global.render = render
global.mount = mount
