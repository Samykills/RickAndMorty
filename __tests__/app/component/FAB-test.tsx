// __tests__/Intro-test.js
import React from 'react';
import { Animated } from 'react-native';
import FAB from '../../../app/component/FAB';
import renderer from 'react-test-renderer';

test('FAB renders correctly', () => {
  const tree = renderer.create(<FAB scroll={new Animated.Value(0)} />).toJSON();
  expect(tree).toMatchSnapshot();
});
