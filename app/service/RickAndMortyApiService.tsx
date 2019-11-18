class RickAndMortyApiService {
  static fetchCharacters = (pageNo: number) => {
    return new Promise((resolve, reject) => {
      fetch(`https://rickandmortyapi.com/api/character?page=${pageNo}`)
        .then(response => response.json())
        .then(responseData => {
          resolve(responseData);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}
export default RickAndMortyApiService;
