import React from 'react';
import { mount,configure } from 'enzyme';
import App from './App';
import {MemoryRouter} from 'react-router'
import Adapter from 'enzyme-adapter-react-16'
import StarterPage from './components/starterpage'
import Profile from './components/profile'
configure({adapter:new Adapter()});


describe("check routes of the main page",()=>{
  test('renders component according to / route', () => {
    const wrapper = mount(<MemoryRouter initialEntries={[ '/' ]}><App /></MemoryRouter>);
    expect(wrapper.find(StarterPage)).toHaveLength(1)
    expect(wrapper.find(Profile)).toHaveLength(0)
    console.log(wrapper.debug())
  });

  test('renders component according to /profile route', () => {
    const wrapper = mount(<MemoryRouter initialEntries={ ['/profile' ]}><App /></MemoryRouter>);
    const button=wrapper.find('[data-testid="signInButton"]')
    console.log(button.debug())
    expect(button).toHaveLength(1)
    console.log(wrapper.debug())
  });

})


