import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeContainer,MyAppointments,BookAppointment,MoreContainer } from '@/Containers'
import {CustomBottomBar} from '@/Components'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { navigate } from './utils'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomBottomBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          headerShown:false,
          tabBarIcon:({focused,size,color}) => <IonIcons name={focused? 'home' : 'home-outline'} size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="My Appointments"
        component={MyAppointments}
        options={{
          headerShown:false,
          tabBarIcon:({focused,size,color}) => <IonIcons name={focused? 'clipboard' : 'clipboard-outline'} size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Book Appointment"
        component={BookAppointment}
        options={{
          headerShown:false,
          tabBarIcon:({focused,size,color}) => <IonIcons name={focused? 'calendar' : 'calendar-outline'} size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreContainer}
        options={{
          headerShown:false,
          tabBarIcon:({focused,size,color}) => <IonIcons name={focused? 'apps' : 'apps-outline'} size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
