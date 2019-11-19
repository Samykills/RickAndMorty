import React, { Component } from 'react';
import { SafeAreaView, View, Text, FlatList, StatusBar, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import RickAndMortyApiService from '../../service/RickAndMortyApiService';
import ListItem from '../../component/ListItem';

const NUM_COLUMNS = 3;

class SearchScreen extends Component {
  state = {
    searchText: '',
    results: [],
    loading: false,
    error: ''
  };

  searchCharacters = () => {
    if (this.state.searchText.trim()) {
      this.setState({ loading: true });
      RickAndMortyApiService.fetchSearchCharacter(this.state.searchText).then(
        (res: any) => {
          if (res.error) {
            this.setState({ error: res.error, loading: false, results: [] });
          } else {
            this.setState({ loading: false, results: res.results, error: '' });
          }
        },
        err => {
          this.setState({ loading: false, error: '', results: [] });
        }
      );
    }
  };

  renderItems = (item: any) => {
    return <ListItem item={item.item} numColumns={NUM_COLUMNS} />;
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#212121' }}>
        <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
          <SearchBar
            selectTextOnFocus={true}
            autoFocus={true}
            placeholder="Search"
            round
            onChangeText={v => {
              this.setState({ searchText: v }, this.searchCharacters);
            }}
            value={this.state.searchText}
            showLoading={this.state.loading}
          />
          {this.state.error ? (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={{ color: '#607D8B' }}>{this.state.error}</Text>
            </View>
          ) : null}
          {this.state.results.length > 0 ? (
            <FlatList
              renderItem={this.renderItems}
              data={this.state.results}
              numColumns={NUM_COLUMNS}
              removeClippedSubviews={true}
              keyExtractor={(item: any) => {
                return item.id;
              }}
            />
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}
export default SearchScreen;
