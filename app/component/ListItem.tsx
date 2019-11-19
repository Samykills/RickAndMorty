import React, { PureComponent } from 'react';
import { View, Dimensions, Animated, Text, Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

const ITEM_WIDTH = Dimensions.get('window').width;
const ANIMATION_DURATION = 250;

class ListItem extends PureComponent<Props> {
  listItemAnimation = new Animated.Value(0);

  onPressInEffect = () => {
    Animated.timing(this.listItemAnimation, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start();
  };

  onPressOutEffect = () => {
    Animated.timing(this.listItemAnimation, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { item, numColumns } = this.props;
    const listItemScale = this.listItemAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.2],
      extrapolate: 'clamp'
    });

    const listItemImageOpacity = this.listItemAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
      extrapolate: 'clamp'
    });

    const listItemTextOpacity = this.listItemAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    const CALC_ITEM_WIDTH = (ITEM_WIDTH - 20 * numColumns) / numColumns;

    return (
      <TouchableWithoutFeedback onPressIn={this.onPressInEffect} onPressOut={this.onPressOutEffect}>
        <Animated.View
          style={{
            margin: 10,
            transform: [
              {
                scale: listItemScale
              }
            ]
          }}
        >
          <Animated.Image
            style={{
              height: 100,
              width: CALC_ITEM_WIDTH,
              borderRadius: 5,
              opacity: listItemImageOpacity
            }}
            resizeMode='cover'
            source={{
              uri: item.image
            }}
          />
          <Animated.View
            style={{
              position: 'absolute',
              top: '50%',
              backgroundColor: '#FAFAFAA0',
              opacity: listItemTextOpacity,
              width: CALC_ITEM_WIDTH
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold'
              }}
              ellipsizeMode='tail'
              numberOfLines={2}
            >
              {item.name}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 9,
                color: item.status == 'Alive' ? 'green' : 'red'
              }}
            >
              {item.status}
            </Text>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export interface Props {
  item: object;
  numColumns: number;
}
export default ListItem;
