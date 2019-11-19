import React from 'react';
import { FlatList, View, Text, StyleSheet, Animated, Alert, Platform } from 'react-native';
import ListItem from '../../component/ListItem';
import RickAndMortyApiService from '../../service/RickAndMortyApiService';
import FAB from '../../component/FAB';
import Header from '../../component/Header';

const HEADER_MAX_HEIGHT = 200;
const NUMBER_OF_COLUMNS = 3;
const INITIAL_PAGE = 1;

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
    return (
      <View style={styles.fill}>
        {this._renderScrollViewContent()}
        <Header scrollY={this.state.scrollY} />
        <FAB scroll={this.state.scrollY} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#EEEEEE'
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT
  }
});

export default HomeScreen;
