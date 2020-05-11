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
import MyBooks from './screens/tabs/MyBooks'
import MyQuotes from './screens/modelPages/MyQuotes'
import AddBook from './screens/functionPages/AddBook'
import AllQuotePage from './screens/modelPages/AllQuotePage'

console.disableYellowBox = true;

const MyQuotesStack = createStackNavigator(
  {
    MyBooks: {
      screen: MyBooks,
      navigationOptions: {
        headerShown: false
      }
    },
    MyQuotes: {
      screen: MyQuotes,
      navigationOptions: {
        headerShown: false
      }
    },
    AddBook: {
      screen: AddBook,
      navigationOptions: {
        headerShown: false
      }
    },
    AllQuotePage: {
      screen: AllQuotePage,
      navigationOptions: {
        headerShown: true
      }
    }
  }
)

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
    MyActivities: {
      screen: MyQuotesStack,
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