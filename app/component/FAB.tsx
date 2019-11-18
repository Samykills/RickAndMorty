import React, { Component } from 'react';
import { Animated, Platform, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const HEADER_MAX_HEIGHT = 1;

export interface Props {
  scroll: any;
}

class FAB extends Component<Props> {
  render() {
    const { scroll } = this.props;

    const fabAnimationY = scroll.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [100, HEADER_MAX_HEIGHT],
      extrapolate: 'clamp'
    });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          bottom: Platform.OS == 'ios' ? 50 : 30,
          right: 25,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [
            {
              translateY: fabAnimationY
            }
          ]
        }}
      >
        <Icon raised name='search' type='font-awesome' color='#f50' onPress={Actions.searchScreen} />
      </Animated.View>
    );
  }
}
export default FAB;
