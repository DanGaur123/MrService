import React from 'react'
import {
  View,
  ImageBackground,
  Text,
  Dimensions,
  Pressable,
} from 'react-native'
import { Colors } from '@/Theme/Variables'
import { navigate } from '@/Navigators/utils'
const { width, height } = Dimensions.get('window')

const ServiceCard = ({ image, name }) => {
  return (
    <View
      style={{
        width: '100%',
        aspectRatio: 1.8,
        borderRadius: 10,
        elevation: 2,
        overflow: 'hidden',
        marginBottom: 20,
      }}
    >
      <ImageBackground
        source={image}
       
        style={{
          width: '100%',
          height: '100%',
          
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 10,
              backgroundColor:"rgba(0,0,0,0.6)"
            }}
          >
            <Text
              style={{
                color: Colors.white,
                fontSize: 14,
                fontFamily: 'Rubik-SemiBold',
              }}
            >
              {name}
            </Text>
            <Pressable
            onPress={() => navigate('Book Appointment')}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
                backgroundColor: Colors.linkColor,
              }}
            >
              <Text style={{ color: Colors.text, fontFamily: 'Rubik-Medium' }}>
                Book Appointment
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default ServiceCard
