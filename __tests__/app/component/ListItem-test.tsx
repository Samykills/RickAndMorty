// __tests__/Intro-test.js
import React from 'react';
import ListItem from '../../../app/component/ListItem';
import renderer from 'react-test-renderer';

const ITEM = { image: 'https://comicsalliance.com/files/2016/01/rick-and-morty.jpg', name: 'Rick', status: 'Alive' };
const NUM_COLUMNS = 3;
test('ListItem renders correctly', () => {
  const tree = renderer.create(<ListItem item={ITEM} numColumns={NUM_COLUMNS} />).toJSON();
  expect(tree).toMatchSnapshot();
});
