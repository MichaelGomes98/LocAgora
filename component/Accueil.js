import * as React from 'react';
import { NavigationContainer, StackNavigator } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import List from './List';
import Maps from './Maps';


const Tab = createBottomTabNavigator();

function AccueilScreen({ navigation }){
  const liste = props => (
    <List navigation={navigation} />
  )
  return(
    <Tab.Navigator>
          <Tab.Screen name="Agora" component={liste} />
          <Tab.Screen name="Maps" component={Maps} />
    </Tab.Navigator>
    );
}

export default class Accueil extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <NavigationContainer>
        <AccueilScreen navigation={this.props.navigation}/>
      </NavigationContainer>
    );
 }
}
