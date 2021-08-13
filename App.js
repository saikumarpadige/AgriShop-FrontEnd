import React from 'react'
import ApplyTheme from './components/theme/ApplyTheme';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './components/navigation/MainStack';

const App = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  )
}

export default ApplyTheme(App)
