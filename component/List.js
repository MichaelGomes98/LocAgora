import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Button, SearchBar, TextInput, AppRegistry} from 'react-native';
import Etiquette from './Etiquette';
import MyStackNavigator from '../navigation/Navigation';
import CreationAgora from './donnees.js'


export default class List extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchtext: '',
      rating:0,
      ratings: [],
    }
    this._retrieveData();
  }

  getRating = (rating) =>{
    this.setState({rating});
  }

  storeData = async (tab) => {
    try {
      await AsyncStorage.setItem(
        'AgorasRating',
        JSON.stringify(tab)
      );
    } catch (error) {
      console.log(error);
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("AgorasRating");
      if (value !== null) {
        JSON.parse(this.setState(ratings, value));
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  addRating = rating => {
    let flag = true;
    for(r of this.state.ratings){
      if(rating.agora.nom === r.agora.nom){
        flag = false;
        r.rating = rating.rating;
      }
    }
    if(flag){
      this.setState({ ratings: [...this.state.ratings, rating] });
      this.storeData(this.state.ratings);
    }
  }

  render(){
    let tabRating = this.state.ratings;
    let filtre = CreationAgora().filter(t=>{
      return this.state.searchtext.length == 0 || t.nom.startsWith(this.state.searchtext);
    })

    return (
      <View style={styles.container}>
        <TextInput style={styles.search}
          placeholder="Rechercher une agora…"
          onChangeText={(searchtext) => this.setState({ searchtext })}
        />
         <FlatList style={styles.list}
          data={filtre}
          renderItem={({item})=> <Etiquette agora={item} recherche={this.state.searchtext} navigation={this.props.navigation} changeRating = {this.getRating} rating={this.state.rating} addRating = {this.addRating} tabRating={tabRating}/>}
          />
       </View>
    );
 }
}

const styles = StyleSheet.create({
  container: {
   alignSelf: 'stretch'
  },
  search: {
    margin: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    top:10,
    textAlign:"left"
  },
  list: {
  marginTop: 20,
  marginBottom:50
  },
});
