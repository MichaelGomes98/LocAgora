import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Button, Image, TouchableHighlight, AppRegistry} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Modal from './Modal';
import MyStackNavigator from '../navigation/Navigation';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Dialog, ConfirmDialog} from 'react-native-simple-dialogs';
import CreationAgora from './donnees.js'
import { AsyncStorage } from 'react-native';


export default class Etiquette extends React.Component{
constructor(props){
  super(props);
  this.state = {
    dialogVisible:false,
    rating:0,
  }
  this.openModal = this.openModal.bind(this);
  this.closeModal = this.closeModal.bind(this);
}

_displayMaps = (agora) => {
   this.props.navigation.navigate("Maps", {agora})
 }

 openModal(){
   this.setState({dialogVisible: true});
 }

 closeModal(){
   this.setState({dialogVisible: false});
 }

checkRating(agoraTab, agoraActuelle){
  if (agoraTab == agoraActuelle){
    return agoraTab;
  }
}

 changeRating = (rating) =>{
   this.setState({rating});
   this.props.changeRating(rating);
   let agoraRating = {agora : this.props.agora, rating:rating}
   this.props.addRating(agoraRating);
 }

  generateStars(agora, tab){
  for(let r of tab){
    let rate = r.rating;
      if(agora.nom == r.agora.nom){
        switch(rate) {
          case(1):
            return(
                  <View style={styles.viewstar}>
                   <Image style={styles.pic} source={require('../assets/star.png')}/>
                   <Image style={styles.pic} source={require('../assets/starempty.png')}/>
                   <Image style={styles.pic} source={require('../assets/starempty.png')}/>
                   <Image style={styles.pic} source={require('../assets/starempty.png')}/>
                   <Image style={styles.pic} source={require('../assets/starempty.png')}/>
                 </View>
            );
          case(2):
            return(
                  <View style={styles.viewstar}>
                   <Image style={styles.pic} source={require('../assets/star.png')}/>
                   <Image style={styles.pic} source={require('../assets/star.png')}/>
                   <Image style={styles.pic} source={require('../assets/starempty.png')}/>
                   <Image style={styles.pic} source={require('../assets/starempty.png')}/>
                   <Image style={styles.pic} source={require('../assets/starempty.png')}/>
                 </View>
            );
          case(3):
            return(
                    <View style={styles.viewstar}>
                     <Image style={styles.pic} source={require('../assets/star.png')}/>
                     <Image style={styles.pic} source={require('../assets/star.png')}/>
                     <Image style={styles.pic} source={require('../assets/star.png')}/>
                     <Image style={styles.pic} source={require('../assets/starempty.png')}/>
                     <Image style={styles.pic} source={require('../assets/starempty.png')}/>
                   </View>
              );
          case(4):
              return(
                    <View style={styles.viewstar}>
                     <Image style={styles.pic} source={require('../assets/star.png')}/>
                     <Image style={styles.pic} source={require('../assets/star.png')}/>
                     <Image style={styles.pic} source={require('../assets/star.png')}/>
                     <Image style={styles.pic} source={require('../assets/star.png')}/>
                     <Image style={styles.pic} source={require('../assets/starempty.png')}/>
                    </View>
                  );
          case(5):
            return(
                    <View style={styles.viewstar}>
                     <Image style={styles.pic} source={require('../assets/star.png')}/>
                     <Image style={styles.pic} source={require('../assets/star.png')}/>
                     <Image style={styles.pic} source={require('../assets/star.png')}/>
                     <Image style={styles.pic} source={require('../assets/star.png')}/>
                     <Image style={styles.pic} source={require('../assets/star.png')}/>
                    </View>
              );
          }
        }
      }
    return(
        <View style={styles.viewstar}>
        <Image style={styles.pic} source={require('../assets/starempty.png')}/>
        <Image style={styles.pic} source={require('../assets/starempty.png')}/>
        <Image style={styles.pic} source={require('../assets/starempty.png')}/>
        <Image style={styles.pic} source={require('../assets/starempty.png')}/>
        <Image style={styles.pic} source={require('../assets/starempty.png')}/>
       </View>

     );
}

render(){
  const agora = this.props.agora
  let tabComplete = this.props.tabRating;
    return (
      <View style={styles.contenu} >
        <View style={styles.vuContenu}>
          <ConfirmDialog
           title={agora.nom}
           visible={this.state.dialogVisible}
           onTouchOutside={() => this.setState({dialogVisible: false})}
           positiveButton={{
               title: "OK",
               onPress: () => this.closeModal()
           }} >
           <View>
               <Modal  ref="Modal"  changeRating = {this.changeRating} rating={this.state.rating}/>
           </View>
           </ConfirmDialog>
             <Text >
               <Text style={styles.contenu}>
                  {agora.nom} {"\n"}
               </Text>

               <Text style={styles.ville}>
                  {agora.quartier} |
                   <TouchableHighlight onPress={this.openModal}>
                    {this.generateStars(agora, tabComplete)}
                  </TouchableHighlight>
               </Text>
              </Text>
          </View>
          <View style={styles.vuIcon}>
               <View style={styles.openMaps}>
               <Text >
                 <TouchableHighlight style={{margin:5}} onPress={() => (this._displayMaps(agora))}>
                  <Image style={styles.pic} source={require('../assets/next.png')}  />
                 </TouchableHighlight>
               </Text>
               </View>
          </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  contenu:{
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderWidth: 1,
    textAlign:"left",
    borderRadius: 2,
    fontSize: 25,
    height: 65,
    margin:5,
    color : "black",
    fontWeight: "bold",
    paddingLeft: 20
  },
  ville:{
    fontSize: 20,
  },
  mapsView:{
    width: "10%",
  },
  pictest:{
    width:30,
    height:30,
  },
  openMaps:{
    paddingLeft:0,

  },
  pic:{
    width:15,
    height:15,
  },
  viewstar:{
    flexDirection:'row',
    paddingLeft:10,
  },
  vuContenu:{
    width : "90%",
  },
  vuIcon:{
    marginTop : 30,
    width : "10%",
  },
});
