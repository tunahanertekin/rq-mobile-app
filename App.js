import 'react-native-gesture-handler';
import * as React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import { View, Text } from 'react-native';

import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'

import UserList from './screens/tabs/UserList'
import QuoteList from './screens/tabs/QuoteList'
import MyQuotes from './screens/tabs/MyQuotes'


const AppTabNavigator = createBottomTabNavigator(
  {
    UserList: {
      screen: UserList
    },
    QuoteList: {
      screen: QuoteList
    },
    MyQuotes: {
      screen: MyQuotes
    }
  }
)


const AppStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false
      }
    }
  }
)


export default createAppContainer(
  createStackNavigator(
    {
      Loading: LoadingScreen,
      App: {
        screen: AppStack,
        navigationOptions: {
          headerShown: false
        }
      },
      LoggedIn: AppTabNavigator
    },
    {
      initialRouteName: "App"
    }
  )
)