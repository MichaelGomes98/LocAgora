// Navigation/Navigation.js

import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Etiquette from '../component/Etiquette';
import Maps from '../component/Maps';
import List from '../component/List';
import Accueil from '../component/Accueil';



const MyStackNavigator = createStackNavigator({
  Accueil: {
    screen: Accueil
  },
  Maps:{
    screen: Maps
  }
})

export default createAppContainer(MyStackNavigator)
