// __tests__/Intro-test.js
import React from 'react';
import HomeScreen from '../../../app/container/HomeScreen/HomeScreen';
import renderer from 'react-test-renderer';
beforeEach(() => {
  jest.useFakeTimers();
});
test('Header renders correctly', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
