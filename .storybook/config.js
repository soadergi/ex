import 'weplay-core/styles/style.scss'
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import Provider from 'react-redux/es/components/Provider'
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info';
import { addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import 'weplay-core/sprites/dist/styles/sprite-styles.scss'
import 'weplay-core/sprites/dist/sprites/sprite.m.svg'
import 'weplay-core/sprites/dist/sprites/sprite.c.svg'
import 'weplay-core/sprites/dist/sprites/sprite.svg'
import { updateLanguageByLocation } from 'weplay-core/helpers/languages';
import { axios } from 'weplay-core/services/axios';
import createStore from '../src/reduxs/store'

const sources = require.context('../src', true, /\_stories\.js$/);
const packages = require.context('../packages', true, /\_stories\.js$/);
function loadStories() {
  sources.keys().forEach(filename => sources(filename));
  packages.keys().forEach(filename => packages(filename));
}

const newViewports = {
  kindleFire2: {
    name: 'Kindle Fire 2',
    styles: {
      width: '600px',
      height: '963px',
    },
  },
  kindleFireHD: {
    name: 'Kindle Fire HD',
    styles: {
      width: '533px',
      height: '801px',
    },
  },
};

addParameters({
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      ...newViewports,
    },
  },
});

addDecorator(withInfo)
const history = createBrowserHistory()
const { store } = createStore(axios)
addDecorator((story) => (
  <Provider store={store}>
    <Router history={history}>
      { story() }
    </Router>
  </Provider>
))
addDecorator(withKnobs)
updateLanguageByLocation(window.location).then(() => {
  configure(loadStories, module);
})
