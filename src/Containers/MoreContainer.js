import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Image,
} from 'react-native'
import React from 'react'
import AddressDropdown from '@/Components/Dropdown'
import { Colors } from '@/Theme/Variables'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

export const HEIGHT = Dimensions.get('window').height
export const WIDTH = Dimensions.get('window').width

const MoreContainer = () => {
  const navigation = useNavigation()
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
          marginTop: WIDTH / 9,
          fontSize: 25,
          fontWeight: 'bold',
          marginLeft: WIDTH / 20,
          marginBottom: WIDTH / 20,
        }}
      >
        <IonIcons
          name="arrow-back"
          size={30}
          color={Colors.white}
          onPress={() => navigation.goBack()}
        />
      </Text>
      <Text
        style={{
          color: 'white',
          fontSize: 25,
          marginLeft: WIDTH / 20,
          marginBottom: WIDTH / 20,
          fontFamily: 'Rubik-Medium',
        }}
      >
        Options
      </Text>
      <ScrollView style={styles.formSection}>
        <View
          style={{
            backgroundColor: 'white',
            elevation: 3,
            padding: 10,
            marginHorizontal: 5,
            marginVertical: 5,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: Colors.primary,
              fontSize: 18,
              fontFamily: 'Rubik-Medium',
              marginVertical: 5,
            }}
          >
            Pay Now
          </Text>
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <Text
              style={{
                color: Colors.secondaryText,
                fontFamily: 'Rubik-Regular',
                fontSize: 15,
              }}
            >
              UPI ID:{' '}
            </Text>
            <Text
              style={{
                color: Colors.text,
                fontFamily: 'Rubik-Medium',
                fontSize: 15,
              }}
            >
              rupeshyadav9170@okicici
            </Text>
          </View>
          <TouchableOpacity
            style={{
              height: 50,
              width: WIDTH / 2,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              elevation: 4,
              alignSelf:'center',
              marginVertical:20
            }}
            onPress={() => {
              Linking.openURL(
                'upi://pay?pa=rupeshyadav9170@okicici&pn=Rupesh%20Yadav&aid=uGICAgICt6uj5QQ',
              )
            }}
          >
            <Image
              source={require('Assets/Images/gPay.png')}
              style={{ width: 60, height: 40, alignSelf: 'center' }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            elevation: 3,
            padding: 10,
            marginHorizontal: 5,
            marginVertical: 15,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: Colors.primary,
              fontSize: 18,
              fontFamily: 'Rubik-Medium',
              marginVertical: 5,
            }}
          >
            Contact Us
          </Text>
          <Text style={{ color: Colors.text, fontFamily: 'Rubik-Medium' }}>
          Rupesh Yadav
          </Text>
          <Text
            style={{
              color: Colors.text,
              fontFamily: 'Rubik-Medium',
              marginVertical: 5,
            }}
          >
            rupeshyadav9170@gmail.com
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
              paddingVertical: 10,
              alignSelf: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('tel:9170541352')
              }}
              style={{
                height: 45,
                width: WIDTH / 3,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.primary,
                elevation: 4,
              }}
            >
              <IonIcons name="call" size={25} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  'whatsapp://send?text=Hello Mr.Rupesh&phone=+919170541352',
                )
              }}
              style={{
                height: 45,
                width: WIDTH / 3,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'green',
                elevation: 4,
              }}
            >
              <IonIcons name="logo-whatsapp" size={25} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  formSection: {
    width: WIDTH,
    backgroundColor: Colors.white,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: WIDTH / 22,
  },
  button: {
    backgroundColor: 'white',
    width: WIDTH * 0.5,
    height: 50,
    elevation: 4,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 15,
  },
})

export default MoreContainer
