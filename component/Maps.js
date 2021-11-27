import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import MapView from "react-native-maps";
import Creation from "./donnees.js";
import CreationAgora from './donnees.js'


export default class Maps extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    generateMarker(agora){
      return(<MapView.Marker
      coordinate={{latitude: agora.latitude,
      longitude: agora.longitude}}
      title={agora.nom}
      description={"Se situe dans le quatier de " +agora.quartier}
      />)
    }

    generateTabMarker(tab){
      let mar = []
      for(let i in tab){
        //console.log(tab[i].nom);
        mar.push(this.generateMarker(tab[i]));
      }
      return mar;
    }

    render() {
      console.log(this.props);
      let marker = null;
      let tab = CreationAgora();
      const agora = this.props.agora;
      if(this.props.navigation.state){
        let agora = this.props.navigation.state.params.agora;
        marker = this.generateMarker(agora);
      }
      else{
       marker = this.generateTabMarker(tab);
      }

      return (
        <View style={styles.container}>
          <MapView style={styles.map}
            initialRegion={{
              latitude: 46.2,
              longitude: 6.1667,
              latitudeDelta: 0.09,
              longitudeDelta: 0.09,
            }}
            >
            {marker}
          </MapView>
        </View>
      );
    }
  };


let styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F5FCFF',
 },
   map: {
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
   }
});

//https://stackoverflow.com/questions/40710408/react-native-how-to-display-map-using-react-native-maps
