import React, { PureComponent } from 'react';
import { Animated, StyleSheet, Text, Platform } from 'react-native';

const HEADER_IMAGE = 'https://comicsalliance.com/files/2016/01/rick-and-morty.jpg';
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = Platform.OS == 'ios' ? 80 : 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export interface Props {
  scrollY: any;
}

class Header extends PureComponent<Props> {
  render() {
    const headerHeight = this.props.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });
    const imageOpacity = this.props.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    });
    const imageTranslate = this.props.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp'
    });
    const headerOpacity = this.props.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    });

    return (
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.Image
          resizeMode={'cover'}
          style={[styles.backgroundImage, { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] }]}
          source={{ uri: HEADER_IMAGE }}
        />
        <Animated.View style={[styles.bar, { opacity: headerOpacity }]}>
          <Text style={styles.title}>All Characters</Text>
        </Animated.View>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#212121',
    overflow: 'hidden'
  },
  bar: {
    marginTop: Platform.OS == 'ios' ? 38 : 15,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: undefined,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover'
  }
});
export default Header;
