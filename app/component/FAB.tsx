import React, { PureComponent } from 'react';
import { Animated, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const FINAL_FAB_POSITION = 1;
const INITIAL_FAB_POSITION = 200;

export interface Props {
  scroll: any;
}

class FAB extends PureComponent<Props> {
  render() {
    const { scroll } = this.props;

    const fabAnimationY = scroll.interpolate({
      inputRange: [0, INITIAL_FAB_POSITION],
      outputRange: [INITIAL_FAB_POSITION, FINAL_FAB_POSITION],
      extrapolate: 'clamp'
    });

    const fabOpacity = scroll.interpolate({
      inputRange: [0, INITIAL_FAB_POSITION],
      outputRange: [0, FINAL_FAB_POSITION],
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
          opacity: fabOpacity,
          transform: [
            {
              translateY: fabAnimationY
            }
          ]
        }}
      >
        <AnimatedIcon raised name="search" type="font-awesome" color="#263238" onPress={Actions.searchScreen} />
      </Animated.View>
    );
  }
}
export default FAB;
