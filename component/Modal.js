import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, Plateform} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';



export default class Modal extends React.Component{
  constructor(props){
    super(props);
    this.ratingCompleted = this.ratingCompleted.bind(this);
  }

  ratingCompleted(rating) {
    this.props.changeRating(rating);
  }

  render(){
      return(
        <View style={styles.container}>
        <AirbnbRating
          count={5}
          reviews={["Très mauvais", "Mauvais", "Moyen", "Bien", "Très bien"]}
          defaultRating={this.props.rating}
          size={40}
          onFinishRating={this.ratingCompleted}
        />
       </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    marginTop:0
}
});

//https://react-native-elements.github.io/react-native-elements/docs/0.19.1/rating.html
