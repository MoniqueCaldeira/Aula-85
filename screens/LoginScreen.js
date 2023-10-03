import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

const appIcon = require('../assets/logo.png');

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fontsLoaded: false,
      userSignedIn: false,
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  signIn = async (email, password) => {
    

  };

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      const { email, password } = this.state;

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <Text style={styles.appTitleText}>Narração de Histórias</Text>
          <Image source={appIcon} style={styles.appIcon} />
          
          
             
        </View>
      );
    } else {
      return <Text>carregando</Text>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appIcon: {
    width: RFValue(200),
    height: RFValue(200),
    resizeMode: 'contain',
    marginBottom: RFValue(20),
  },
  appTitleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: RFValue(40),
    fontFamily: 'Bubblegum-Sans',
    marginBottom: RFValue(20),
  },
  textInput: {
    width: 200,
    height: 70,
    borderWidth: 10,
    borderRadius: 20,
    borderColor: 'white',
    marginTop: 30,
    color: 'white',
  },
 logintext: {
    color: 'white',
    textAlign: 'center',
    fontSize: RFValue(20),
    fontFamily: 'Bubblegum-Sans',
   } ,
   buttom: {
     backgroundColor:"orange" ,
     width:200,
     height:50,
     borderRadius:20,
     justifyContent:"center",
     marginTop:30,


     
    
   } 
});
