import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid
} from 'react-native'
import React from 'react'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Colors } from '@/Theme/Variables'
import { useState } from 'react'
import { useEffect } from 'react'
import { navigate, navigateAndSimpleReset } from '@/Navigators/utils'
import auth from '@react-native-firebase/auth'

export const HEIGHT = Dimensions.get('window').height
export const WIDTH = Dimensions.get('window').width

export default function Otp(props) {
  const [verifyNumber, setVerifyNumber] = useState(props.route.params.number)
  const [confirmation, setConfirmation] = useState(
    props.route.params.confirmation,
  )
  const [code, setCode] = useState('')
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    console.log(props)
  })
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        props.navigation.navigate('Main')
      } else {
        console.log('errrrorror')
      }
    })
  }, [])

  const confirmCode = async code => {
    setLoader(true)
    //  const { confirmation, verifyNumber } = this.state

    try {
       await confirmation.confirm(code)
      
      navigateAndSimpleReset('Main')
    } catch (error) {
      ToastAndroid.show('Enter Valid OTP', ToastAndroid.LONG, ToastAndroid.TOP)
       setLoader(false)
      console.log(error) 
    }
  }

  return (
    <>
      {loader && (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10,
              backgroundColor: 'white',
              opacity: 0.5,
            },
          ]}
        >
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Image
          source={require('@/Assets/Images/otpImage.jpg')}
          style={styles.image}
        />
        <Text style={styles.otpText}>OTP Verification</Text>
        <View style={{ width: WIDTH / 1.5 }}>
          <Text
            style={{
              marginTop: 20,
              fontSize: 16,
              alignSelf: 'center',
              textAlign: 'center',
              color: Colors.text,
              fontFamily: 'Rubik-Medium',
            }}
          >
            Enter the Verification Code we have just sent to you on your number
          </Text>
        </View>

        <OTPInputView
          style={{ width: '80%', height: 200, alignSelf: 'center' }}
          pinCount={6}
          //code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          //onCodeChanged={code => setCode(code)}
          autoFocusOnLoad={true}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            confirmCode(code)
          }}
        />
        <TouchableOpacity activeOpacity={0.6} onPress={confirmCode}>
          <View style={styles.button}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'Rubik-Medium',
              }}
            >
              Verify
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    height: HEIGHT / 2,
    width: WIDTH,
  },
  otpText: {
    color: Colors.primary,
    fontSize: 25,

    marginTop: 15,
    fontFamily: 'Rubik-SemiBold',
  },

  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 1,
    color: '#50577A',
    fontSize: 20,
  },

  underlineStyleHighLighted: {
    borderColor: '#50577A',
  },
  button: {
    backgroundColor: Colors.primary,
    height: 42,
    width: WIDTH / 1.25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 2,
    position: 'absolute',
    bottom: 0,
  },
})
