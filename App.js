import * as React from "react";
import { View, Text, Platform, StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import DeckDetail from './components/DeckDetail';
import middleware from './middleware';
import reducer from './reducers'

const store = createStore(reducer, middleware);

import { white, black } from './utils/colors'

function ProjectStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = Platform.OS === 'ios'
  ? createBottomTabNavigator()
  : createMaterialTopTabNavigator()

// const Tabs = createBottomTabNavigator()

const TabNav = () => (
  <Tabs.Navigator
    initialRouteName="AddEntry"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let icon;
        if (route.name === "Decks") {
          icon = (
            <MaterialCommunityIcons name="cards" size={size} color={color} />
          );
        } else if (route.name === "Add Deck") {
          icon = (
            <Ionicons name="md-add-circle" size={size} color={color} />
          );
        }
        return icon;
      }
    })}
    tabBarOptions={{
      header: null,
      activeTintColor: Platform.OS === "ios" ? black : white,
      showIcon: true,
      style: {
        height: 80,
        backgroundColor: Platform.OS === "ios" ? white : black,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }}
  >
    <Tabs.Screen name="Decks" component={DeckList} />
    <Tabs.Screen name="Add Deck" component={AddDeck} />
  </Tabs.Navigator>
);

const Stack = createStackNavigator();

const MainNav = () => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name="Home"
      component={TabNav}
      options={{ headerShown: false }} />
    <Stack.Screen
      name="DeckDetail"
      component={DeckDetail}
      options={{
        headerTintColor: white, headerStyle: {
          backgroundColor: black,
        }
      }} />
  </Stack.Navigator>
);

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <ProjectStatusBar backgroundColor={black} barStyle="light-content" />
            <MainNav />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
