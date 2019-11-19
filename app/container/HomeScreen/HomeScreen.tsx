import React from 'react';
import { FlatList, View, Text, StyleSheet, Animated, Alert, Platform } from 'react-native';
import ListItem from '../../component/ListItem';
import RickAndMortyApiService from '../../service/RickAndMortyApiService';
import FAB from '../../component/FAB';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = Platform.OS == 'ios' ? 80 : 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const NUMBER_OF_COLUMNS = 3;
const INITIAL_PAGE = 1;
const HEADER_IMAGE = 'https://comicsalliance.com/files/2016/01/rick-and-morty.jpg';

class HomeScreen extends React.Component {
  state = {
    scrollY: new Animated.Value(0),
    pageNo: INITIAL_PAGE,
    characterList: [],
    apiInfo: {},
    loading: false,
    totalPages: INITIAL_PAGE
  };

  componentDidMount = () => {
    this.fetchCharacterData();
  };

  fetchCharacterData = () => {
    if (!this.state.loading) {
      this.setState({ loading: true });
      console.log(this.state.pageNo, this.state.characterList);
      RickAndMortyApiService.fetchCharacters(this.state.pageNo).then(
        (res: any) => {
          this.setState({
            apiInfo: res.info,
            characterList: [].concat(this.state.characterList, res.results),
            pageNo: this.state.pageNo + 1,
            loading: false,
            totalPages: res.info.pages
          });
        },
        err => {
          this.setState({ loading: false });
          Alert.alert('', err.toString());
        }
      );
    }
  };

  _renderScrollViewContent = () => {
    return (
      <FlatList
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
        numColumns={NUMBER_OF_COLUMNS}
        contentContainerStyle={styles.scrollViewContent}
        data={this.state.characterList}
        refreshing={this.state.loading}
        onEndReached={this.fetchCharacterData}
        onEndReachedThreshold={0.99}
        removeClippedSubviews={true}
        renderItem={({ item }) => {
          return <ListItem item={item} numColumns={NUMBER_OF_COLUMNS} />;
        }}
        ListEmptyComponent={() => {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>All Characters from the show Rick and Morty!</Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => {
          return index + '';
        }}
      />
    );
  };

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp'
    });

    const headerOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    });

    return (
      <View style={styles.fill}>
        {this._renderScrollViewContent()}
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
        <FAB scroll={this.state.scrollY} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor:'#EEEEEE'
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center'
  },
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
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT
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
export default HomeScreen;
