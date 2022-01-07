import * as React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import{
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';


import { AppRoutes } from './src/routes/app.routes'

import theme from './src/global/styles/theme';

import { NavigationContainer } from '@react-navigation/native'

import { Signin } from './src/screnns/Signin'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading/>
  }
  return(
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="light-content"/>
        <Signin/> 
      </NavigationContainer>
    </ThemeProvider>
  )    
}


