import * as React from "react";
import Home from "./components/Home.js";
import Search from "./components/Search.js";
import CardDetail from "./components/CardDetail.js";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Reducer from "./redux/reducer";

const store = createStore(Reducer);

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    CardDetail: CardDetail,
    Search: Search
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: { header: null }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
