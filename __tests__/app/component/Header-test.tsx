// __tests__/Intro-test.js
import React from 'react';
import { Animated } from 'react-native';
import Header from '../../../app/component/Header';
import renderer from 'react-test-renderer';

test('Header renders correctly', () => {
  const tree = renderer.create(<Header scrollY={new Animated.Value(0)} />).toJSON();
  expect(tree).toMatchSnapshot();
});
