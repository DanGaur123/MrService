import { ServiceCard } from '@/Components'
import { Colors } from '@/Theme/Variables'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  ScrollView,
  View,
  Image,
  Dimensions,
  Text,
  Pressable,
  ImageBackground,
} from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { navigate } from '@/Navigators/utils'

const { width, height } = Dimensions.get('window')

const DoctorContainer = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: width, height: height * 0.55 }}>
        <Image
          source={require('@/Assets/Images/doctor-services.jpg')}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
          }}
        />
        <IonIcons
          onPress={() => navigation.goBack()}
          name="arrow-back-outline"
          color={Colors.white}
          size={30}
          style={{ margin: 15 }}
        />
      </View>
      <View
        style={{
          width: width,
          position: 'absolute',
          bottom: 0,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          height: height * 0.6,
          backgroundColor: Colors.white,
          paddingTop: 35,
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: -20,
            left: 40,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: Colors.text,
            height: 45,
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}
        >
          <IonIcons name="medkit-outline" size={25} color={'#F3F3F3'} />
        </View>
        <Text
          style={{
            fontSize: 25,
            color: Colors.text,
            fontFamily: 'Rubik-SemiBold',
            marginLeft: 10,
          }}
        >
          Medical Services
        </Text>

        <View
          style={{
            paddingBottom: 25,
            marginVertical: 50,
            width: width / 1.1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              fontSize: 18,
              color: Colors.text,
              fontFamily: 'Rubik-Medium',
            }}
          >
            All types of Medical Services are available..
          </Text>
          <Pressable
            onPress={() => navigate('Book Appointment')}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 50,
              
              height: 50,
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: Colors.primary,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontFamily: 'Rubik-Medium',
                alignSelf: 'center',
                fontSize: 20,
              }}
            >
              Book Your Appointment
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default DoctorContainer
