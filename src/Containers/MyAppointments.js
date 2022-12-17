import { AppointmentCard } from '@/Components'
import React from 'react'
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { Colors } from '@/Theme/Variables'
import { useNavigation } from '@react-navigation/native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { Component } from 'react'
import auth from '@react-native-firebase/auth'
 

const { width, height } = Dimensions.get('window')

class MyAppointments extends Component {
 
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.primary,
        }}
      >
        <Text
          style={{
            color: 'white',
            marginTop: width / 9,
            fontSize: 25,
            fontWeight: 'bold',
            marginLeft: width / 20,
            marginBottom: width / 20,
          }}
        >
          <IonIcons
            name="arrow-back"
            size={30}
            color={Colors.white}
            onPress={() => this.props.navigation.goBack()}
          />
        </Text>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Rubik-Medium',
            fontSize: 25,
            marginLeft: width / 20,
            marginBottom: width / 20,
          }}
        >
          My{'\n'}Appointments
        </Text>
        <ScrollView style={styles.formSection}>
          <AppointmentCard />
          <View style={{ paddingBottom: 80 }} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formSection: {
    width: width,
    backgroundColor: Colors.white,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: width / 22,
  },
})

export default MyAppointments
