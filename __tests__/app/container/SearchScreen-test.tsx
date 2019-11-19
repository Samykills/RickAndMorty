// __tests__/Intro-test.js
import React from 'react';
import SearchScreen from '../../../app/container/SearchScreen/SearchScreen';
import renderer from 'react-test-renderer';

test('Header renders correctly', () => {
  const tree = renderer.create(<SearchScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
