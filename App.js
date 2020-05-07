import 'react-native-gesture-handler';
import * as React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'


import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'

import UserList from './screens/tabs/UserList'
import QuoteList from './screens/tabs/QuoteList'
import MyQuotes from './screens/tabs/MyQuotes'


const AppTabNavigator = createBottomTabNavigator(
  {
    UserList: {
      screen: UserList,
      navigationOptions: {
        headerShown: false,
        tabBarIcon: () => (
          <Icon name="users" size={30} />
        )
      }
    },
    QuoteList: {
      screen: QuoteList,
      navigationOptions: {
        headerShown: false,
        tabBarIcon: () => (
          <Icon name="quote-right" size={30} />
        )
      }
    },
    MyQuotes: {
      screen: MyQuotes,
      navigationOptions: {
        headerShown: false,
        tabBarIcon: () => (
          <Icon name="pen-fancy" size={30} />
        )
      }
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
    },
    Login: {
      screen: LoginScreen,
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
      LoggedIn: {
        screen: AppTabNavigator,
        navigationOptions: {
          headerShown: true,
          headerLeft: null,
          headerTitle: "Read&Quote"
        }
      }
    },
    {
      initialRouteName: "App"
    }
  )
)