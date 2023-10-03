import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import StoryCard from './StoryCard';
import firebase from 'firebase';
import * as Font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isEnabled: false,
      lightTheme: false,
      name: '',
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchuser();
  }
  async fetchuser() {
    var theme, name, lastname;
    await firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      .on('value', (data) => {
        theme = data.val().current_theme;
        name = data.val().first_name;
        lastname = data.val().last_name;
      });
    this.setState({
      name: name + lastname,
      lightTheme: theme === 'light' ? true : false,
      isEnabled: theme === 'light' ? true : false,
    });
  }
  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>App Narração de Histórias</Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.text}>{this.state.name}</Text>
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    } else {
      return <Text>carregando</Text>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#15193c',
    height: '100%',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    height: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  appIcon: {
    width: 50,
    height: 50,
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    marginLeft: 20,
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(25),
    fontFamily: 'Bubblegum-Sans',
  },
  cardContainer: {
    height: '70%',
  },
});
