import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native'
import React, { Component } from 'react'
import PhoneInput from 'react-native-phone-number-input'
import { Colors } from '@/Theme/Variables'
import { navigate } from '@/Navigators/utils'
import auth from '@react-native-firebase/auth'

export const HEIGHT = Dimensions.get('window').height
export const WIDTH = Dimensions.get('window').width

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      number: '',
      loader: false,
    }
  }
  signInWithPhoneNumber = async () => {
    this.setState({
      loader: true,
    })

    const { number } = this.state
    if (number == ''|| number.length!=13) {
      ToastAndroid.show(
        'Enter Valid mobile number',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        
      )
      this.setState({
        loader: false,
      })

      return
    }
    const confirmation = await auth().signInWithPhoneNumber(number)

    // setConfirm(confirmation)
    if (confirmation._auth._authResult) {
      navigate('OTP', {
        confirmation: confirmation,
        number: this.state.number,
      })
    } else {
      alert('Internal Error')
    }
  }
  render() {
    return (
      <>
        {this.state.loader && (
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
            source={require('@/Assets/Images/loginImage.jpg')}
            style={styles.image}
          />
          <Text style={styles.loginText}>Login</Text>
          <Text
            style={{
              marginTop: 25,
              fontSize: 16,
              fontFamily: 'Rubik-Medium',
              color: 'gray',
            }}
          >
            An OTP will be sent to your Mobile Number
          </Text>
          <Text style={{ fontFamily: 'Rubik-Medium', color: 'gray' }}>
            Enter your number
          </Text>
          <PhoneInput
            defaultValue=""
            defaultCode="IN"
            layout="first"
            withShadow
            autoFocus={false}
            placeholder="Phone Number"
            containerStyle={{ marginTop: 40 }}
            textContainerStyle={{ paddingVertical: 0 }}
            textInputStyle={{ color: Colors.text, fontFamily: 'Rubik-Regular' }}
            codeTextStyle={{ color: Colors.text, fontFamily: 'Rubik-Regular' }}
            onChangeFormattedText={number => {
              this.setState({ number: number })
            }}
          />
          <TouchableOpacity onPress={this.signInWithPhoneNumber}>
            <View style={styles.button}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontFamily: 'Rubik-Medium',
                }}
              >
                Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: HEIGHT / 2,
    width: WIDTH,
  },
  loginText: {
    color: Colors.primary,
    fontSize: 25,
    // fontWeight: 'bold',
    marginTop: 15,
    fontFamily: 'Rubik-SemiBold',
  },
  button: {
    backgroundColor: Colors.primary,
    height: 42,
    width: WIDTH / 1.25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    elevation: 2,
  },
})
