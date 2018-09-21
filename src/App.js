import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { FIREBASE_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DB_URL, FIREBASE_PROJECT_ID, FIREBASE_MESSAGE_SENDER_ID } from 'react-native-dotenv';

import { MyStatusBar } from './components/common';
import Router from './Router';

export default class App extends Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: FIREBASE_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      databaseURL: FIREBASE_DB_URL,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: '',
      messagingSenderId: FIREBASE_MESSAGE_SENDER_ID
    })
  }

  render() {

    console.disableYellowBox = true

    return (
      <Router />
    );
  }
}