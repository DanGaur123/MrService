import React, { useState, useEffect,useMemo } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Pressable,
  Alert,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { changeTheme } from '@/Store/Theme'
import { Colors } from '@/Theme/Variables'
import IonIcons from 'react-native-vector-icons/Ionicons'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { CarouselPagination, ServiceItem } from '@/Components'
import Carousel from 'react-native-reanimated-carousel'
import { useSharedValue } from 'react-native-reanimated'
import { navigate, navigateAndSimpleReset } from '@/Navigators/utils'
import auth from '@react-native-firebase/auth'



const { width, height } = Dimensions.get('window')

const HomeContainer = () => {
  useEffect(() => {
    Greeting()
    
  })

  

  const Greeting = () => {
    let myDate = new Date()
    let hours = myDate.getHours()
    let greet
    if (hours < 12) greet = 'Good Morning !'
    else if (hours >= 12 && hours < 16) greet = 'Good Afternoon !'
    else if (hours >= 16 && hours < 22) greet = 'Good Evening !'
    else if (hours >= 22 && hours < 24) greet = 'Good Night !'
    return <Text>{greet}</Text>
  }

  const progressValue = useSharedValue(0)

  const CarouselItem = [
    {
      image: require('../Assets/Images/1.png'),
    },
    {
      image: require('../Assets/Images/2.png'),
    },
    {
      image: require('../Assets/Images/3.png'),
    },
  ]
  return (
    <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
      <View
        style={{
          backgroundColor: Colors.primary,
        }}
      >
        <View
          style={{
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: width,
          }}
        >
          <View style={{ marginLeft: 10 }}>
            <Image
              source={require('../Assets/Images/logo.png')}
              style={{
                width: 100,
                height: 50,
              }}
            />
          </View>
          <View style={{ marginRight: 15, alignItems: 'center' }}>
            <IonIcons
              name="exit-outline"
              size={28}
              color={Colors.white}
              onPress={() =>
                Alert.alert('Alert', 'Are you sure to Log Out !', [
                  {text:'NO'},
                  {
                    text: 'YES',
                    onPress: () =>
                      auth()
                        .signOut()
                        .then(() => navigateAndSimpleReset('Login')),
                  },
                ])
              }
            />
            <Text
              style={{
                fontSize: 11,
                fontFamily: 'Rubik-Medium',
                color: Colors.background,
              }}
            >
              Logout
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: Colors.white,
              fontFamily: 'Rubik-Regular',
            }}
          >
            Hi, there
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: Colors.white,
              fontFamily: 'Rubik-Medium',
            }}
          >
            {Greeting()}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: width,
          height: height * 0.76,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: Colors.primary,
          elevation: 3,
          paddingBottom: 10,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ height: height * 0.31 }}>
            <Carousel
              loop
              autoPlay
              data={CarouselItem}
              width={width}
              height={height * 0.3}
              pagingEnabled
              onProgressChange={(_, absoluteProgress) =>
                (progressValue.value = absoluteProgress)
              }
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: width * 0.17,
                parallaxAdjacentItemScale: 0.7,
              }}
              scrollAnimationDuration={2000}
              style={{ marginBottom: 25 }}
              renderItem={({ index, item }) => {
                return (
                  <View
                    style={{
                      borderRadius: 20,
                      overflow: 'hidden',
                      elevation: 1,
                      backgroundColor: 'white',
                      alignItems: 'center',
                      width: width,
                      height: height * 0.3,
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </View>
                )
              }}
            />
            {!!progressValue && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignSelf: 'center',
                  width: 70,
                  position: 'absolute',
                  bottom: 0,
                }}
              >
                {CarouselItem.map((val, i) => {
                  return (
                    <CarouselPagination
                      key={i}
                      length={CarouselItem.length}
                      backgroundColor="black"
                      animValue={progressValue}
                      index={i}
                    />
                  )
                })}
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.white,
                flex: 1,
                height: 2,
                borderRadius: 100,
                marginHorizontal: 10,
                marginLeft: 20,
              }}
            />
            <Text
              style={{
                color: Colors.white,
                fontFamily: 'Rubik-Medium',
                fontSize: 16,
              }}
            >
              SERVICES
            </Text>
            <View
              style={{
                backgroundColor: Colors.white,
                flex: 1,
                height: 2,
                borderRadius: 100,
                marginHorizontal: 10,
                marginRight: 20,
              }}
            />
          </View>

          <View style={{ width: '100%', paddingBottom: 10, marginTop: 5 }}>
            
           
           
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 20,
              }}
            >
              <ServiceItem
                name="Blood Text"
                image={require('../Assets/Images/allBloodTest.png')}
                path="Doctor Services"
              />
              <ServiceItem
                name="Medicine"
                image={require('../Assets/Images/allMedicine.jpg')}
                path="Doctor Services"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 20,
              }}
            >
              <ServiceItem
                name="Animal Doctor"
                image={require('../Assets/Images/animalDoctor.jpg')}
                path="Doctor Services"
              />
              <ServiceItem
                name="Prescription"
                image={require('../Assets/Images/prescription.jpg')}
                path="Doctor Services"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 20,
              }}
            >
              <ServiceItem
                name="Body CheckUp"
                image={require('../Assets/Images/fullBodyCheck.jpg')}
                path="Doctor Services"
              />
              <ServiceItem
                name="Skin Doctor"
                image={require('../Assets/Images/skinDoctor.jpg')}
                path="Doctor Services"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginTop: 20,
                marginLeft:30
              }}
            >
              <ServiceItem
                name="Doctor"
                image={require('../Assets/Images/doctor-services.jpg')}
                path="Doctor Services"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default HomeContainer
