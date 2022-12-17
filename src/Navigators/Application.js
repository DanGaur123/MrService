import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import {
  AllServicesContainer,
  DoctorContainer,
 
  LoginContainer,
  OTPContainer,
  StartupContainer,
} from '@/Containers'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'
import { Colors } from '@/Theme/Variables'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar
          barStyle={darkMode ? 'dark-content' : 'light-content'}
          backgroundColor={!darkMode ? Colors.primary : Colors.secondaryText}
        />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupContainer} />
          <Stack.Screen
            name="Login"
            component={LoginContainer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OTP"
            component={OTPContainer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              animationEnabled: true,
            }}
          />
          
          <Stack.Screen
            name="Doctor Services"
            component={DoctorContainer}
            options={{ headerShown: false }}
          />
        
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
