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
} from 'react-native'
import React from 'react'
import AddressDropdown from '@/Components/Dropdown'
import { Colors } from '@/Theme/Variables'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { Component } from 'react'
import firestore from '@react-native-firebase/firestore'
import { check, request, RESULTS, PERMISSIONS } from 'react-native-permissions'
import SmsAndroid from 'react-native-get-sms-android'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { navigate } from '@/Navigators/utils'
import moment from 'moment'
import auth from '@react-native-firebase/auth'


export const HEIGHT = Dimensions.get('window').height
export const WIDTH = Dimensions.get('window').width

export default class Appointment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullname: '',
      mNumber: '',
      EmailId: '',
      state: '',
      district: '',
      pincode: '',
      village: '',
      nearByLandmark: '',
      date: {
        dateString: moment().format('YYYY-MM-DD').toString(),
        day: moment().date().toString(),
        timestamp: moment().valueOf().toString(),
      },
      serviceType: '',
      description: '',
      number: '9170541352',
      userNumber:''
    }
  }

  onAuthStateChanged = user => {
    this.setState({
      userNumber:user.phoneNumber
     })
    }

    componentDidMount() {
      const subscriber = auth().onAuthStateChanged(this.onAuthStateChanged)
      return subscriber
    }
  validateName = name => {
    var re = /^[a-zA-Z]{2,40}([a-zA-Z]{2,40})+$/
    return re.test(name)
  }

  validateNumber = number => {
    var re = /^[0]?[789]\d{9}$/
    return re.test(number)
  }

  sendDataToFirebase = () => {
    console.log(moment().date().toString())
    if (
      !this.validateName(this.state.serviceType) &&
      !this.validateName(this.state.village) &&
      !this.validateNumber(this.state.pincode) &&
      !this.validateName(this.state.district) &&
      !this.validateName(this.state.state) &&
      !this.validateName(this.state.fullname) &&
      !this.validateNumber(this.state.mNumber)
    ) {
      Alert.alert('Invalid !', 'Given input is invalid. Try Once....', [
        { text: 'OK' },
      ])
    } else {
      firestore()
        .collection('Appointments')
        .add({
          Full_Name: this.state.fullname,
          Mobile_Number: this.state.mNumber,
          Email_Id: this.state.EmailId,
          State: this.state.state,
          District: this.state.district,
          Pincode: this.state.pincode,
          Village: this.state.village,
          NearByLandmark: this.state.nearByLandmark,
          Date: this.state.date,
          ServiceType: this.state.serviceType,
          Description: this.state.description,
          User_Number:this.state.userNumber

        })
        .then(() => {
          Alert.alert('Status', 'Appointment Booked successfully !', [
            { text: 'OK', onPress: () => navigate('Home') },
          ])
        })
       
    }
  }



  handleDistrict = district => {
    this.setState({ district: district })
  }
  handleState = state => {
    this.setState({ state: state })
  }
  handleServiceType = serviceType => {
    this.setState({ serviceType: serviceType })
  }

  render() {
    return (
      <SafeAreaView
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
            marginLeft: WIDTH / 20,
            marginBottom: WIDTH / 20,
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
            marginLeft: WIDTH / 20,
            marginBottom: WIDTH / 20,
          }}
        >
          Schedule{'\n'}Appointment
        </Text>
        <ScrollView style={styles.formSection}>
          {/* **Personal Details* */}

          <Text style={styles.headerText}>Personal Details</Text>
          <View
            style={{
              backgroundColor: 'white',
              elevation: 5,
              padding: 10,
              marginHorizontal: 5,
              borderRadius: 20,
            }}
          >
            <View style={{ margin: 12 }}>
              <Text style={styles.text}>Full Name *</Text>
              <TextInput
                style={styles.input}
                onChangeText={fullname => this.setState({ fullname })}
                // value={number}
                placeholder="Enter Your Name"
                placeholderTextColor={Colors.secondaryText}
              />
            </View>
            <View style={{ margin: 12 }}>
              <Text style={styles.text}>Mobile Number *</Text>
              <TextInput
                style={styles.input}
                onChangeText={mNumber => this.setState({ mNumber })}
                // value={number}
                placeholder="Enter Your Mobile Number"
                keyboardType="numeric"
                placeholderTextColor={Colors.secondaryText}
              />
            </View>
            <View style={{ margin: 12 }}>
              <Text style={styles.text}>Email Id (Optional)</Text>
              <TextInput
                style={styles.input}
                onChangeText={EmailId => this.setState({ EmailId })}
                // value={number}
                placeholder="Enter Your Email Address"
                keyboardType="email-address"
                placeholderTextColor={Colors.secondaryText}
              />
            </View>
          </View>

          {/* **Address Information* */}

          <Text style={styles.headerText}>Address</Text>
          <View
            style={{
              backgroundColor: 'white',
              elevation: 5,
              padding: 10,
              marginHorizontal: 5,
              borderRadius: 20,
            }}
          >
            <View style={{ margin: 12 }}>
              <Text style={styles.text}>State *</Text>
              <AddressDropdown point={state} getValue={this.handleState} />
            </View>
            <View style={{ margin: 12 }}>
              <Text style={styles.text}>District *</Text>
              <AddressDropdown
                point={district}
                getValue={this.handleDistrict}
              />
            </View>
            <View style={{ margin: 12 }}>
              <Text style={styles.text}>Pincode *</Text>
              <TextInput
                style={[styles.input, { width: WIDTH / 4 }]}
                onChangeText={pincode => this.setState({ pincode })}
                // value={number}
                placeholder="Pincode"
                keyboardType="numeric"
                placeholderTextColor={Colors.secondaryText}
              />
            </View>
            <View style={{ margin: 12 }}>
              <Text style={styles.text}>Village * </Text>
              <TextInput
                style={styles.input}
                onChangeText={village => this.setState({ village })}
                // value={number}
                placeholder="e.g Dhaskari Bhagwanpur"
                placeholderTextColor={Colors.secondaryText}
              />
            </View>
            <View style={{ margin: 12 }}>
              <Text style={styles.text}>Near by Landmark (Optional)</Text>
              <TextInput
                style={styles.input}
                onChangeText={nearByLandmark =>
                  this.setState({ nearByLandmark })
                }
                // value={number}
                placeholder="e.g Tubewell ke bagal me"
                placeholderTextColor={Colors.secondaryText}
              />
            </View>
          </View>

          {/* **Others* */}

          <Text style={styles.headerText}>Others</Text>
          <View
            style={{
              backgroundColor: 'white',
              elevation: 5,
              padding: 10,
              marginHorizontal: 5,
              borderRadius: 20,
            }}
          >
            <View style={{ margin: 12 }}>
              <Text style={styles.text}>Choose Date *</Text>
              <Calendar
                style={{ borderColor: 'white' }}
                theme={{
                  monthTextColor: Colors.text,
                  selectedDayBackgroundColor: Colors.primary,
                  arrowColor: Colors.primary,
                  calendarBackground: '#f5f5f5',
                  dayTextColor: Colors.text,
                  textDayFontFamily: 'Rubik-Regular',
                  textMonthFontFamily: 'Rubik-Regular',
                  textDayHeaderFontFamily: 'Rubik-Regular',
                }}
                // Initially visible month. Default = now
                initialDate={this.state.date.dateString}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={Date()}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined

                // markedDates={{
                //   [this.state.currentDate]: {
                //     selected: true,
                //   },
                // }}
                //date={this.state.currentDate}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={day => {
                  console.log('selected day', day)
                  this.setState({
                    date: day,
                  })
                }}
                // Handler which gets executed on day long press. Default = undefined
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'MMMM yyyy'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={month => {
                  console.log('month changed', month)
                }}
                // Hide month navigation arrows. Default = false
                hideArrows={false}
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                // Do not show days of other months in month page. Default = false
                // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={false}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                // Hide day names. Default = false
                // Show week numbers to the left. Default = false

                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={subtractMonth => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
                enableSwipeMonths={true}
              />
            </View>
            <View style={{ margin: 12 }}>
              <Text style={styles.text}>Service Type *</Text>
              <AddressDropdown
                point={service}
                getValue={this.handleServiceType}
              />
            </View>
            <View style={{ margin: 12 }}>
              <Text style={styles.text}>Description (Optional)</Text>
              <TextInput
                style={styles.input}
                textAlignVertical="top"
                onChangeText={description =>
                  description == '' ? '' : this.setState({ description })
                }
                // value={number}
                placeholder="Tell me your issue"
                placeholderTextColor={Colors.secondaryText}
                multiline={true}
                numberOfLines={7}
              />
            </View>
          </View>
          <TouchableOpacity onPress={this.sendDataToFirebase}>
            <View style={styles.button}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,

                  textAlign: 'center',
                  fontFamily: 'Rubik-Medium',
                }}
              >
                Book Appointment
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
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
  input: {
    borderWidth: 0.5,
    padding: 10,
    borderColor: 'gray',
    borderRadius: 8,
    color: Colors.primary,
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    
  },
  text: {
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Rubik-Medium',
    color: Colors.text,
  },
  headerText: {
    fontFamily: 'Rubik-Medium',
    color: Colors.primary,
    fontSize: 18,

    marginTop: WIDTH / 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    width: WIDTH / 1.1,
    height: 50,
    elevation: 5,
    marginTop: 45,
    marginBottom: 80,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
})

const state = [
  { label: 'Andhra Pradesh', value: '1' },
  { label: 'Arunachal Pradesh', value: '2' },
  { label: 'Assam', value: '3' },
  { label: 'Bihar', value: '4' },
  { label: 'Chhattisgarh', value: '5' },
  { label: 'Goa', value: '6' },
  { label: 'Gujarat', value: '7' },
  { label: 'Haryana', value: '8' },
  { label: 'Himachal Pradesh', value: '9' },
  { label: 'Jammu and Kashmir', value: '10' },
  { label: 'Jharkhand', value: '11' },
  { label: 'Karnataka', value: '12' },
  { label: 'Kerala', value: '13' },
  { label: 'Madhya Pradesh	', value: '14' },
  { label: 'Maharashtra', value: '15' },
  { label: 'Manipur', value: '16' },
  { label: 'Meghalaya', value: '17' },
  { label: 'Mizoram', value: '18' },
  { label: 'Nagaland', value: '19' },
  { label: 'Odisha', value: '20' },
  { label: 'Punjab', value: '21' },
  { label: 'Rajasthan', value: '22' },
  { label: 'Sikkim', value: '23' },
  { label: 'Tamil Nadu', value: '24' },
  { label: 'Telangana', value: '25' },
  { label: 'Tripura', value: '26' },
  { label: 'Uttar Pradesh', value: '27' },
  { label: 'Uttarakhand', value: '28' },
  { label: 'West Bengal', value: '29' },
]

const service = [
  { label: 'TV', value: '1' },
  { label: 'AC', value: '2' },
  { label: 'Washing Machine', value: '3' },
  { label: 'Fridge', value: '4' },
  { label: 'Cooler', value: '5' },
  { label: 'Clock', value: '6' },
  { label: 'Fan', value: '7' },
  { label: 'Mixer', value: '8' },
  { label: 'DTH', value: '9' },
  { label: 'Gas Cylinder', value: '10' },
  { label: 'Interior', value: '11' },
  { label: 'Bike', value: '12' },
  { label: 'Car', value: '13' },
  { label: 'All Blood Test', value: '14' },
  { label: 'Medicines', value: '15' },
  { label: 'Animal Doctor', value: '16' },
  { label: 'Doctor Prescription', value: '17' },
  { label: 'Full Body CheckUp', value: '18' },
  { label: 'Skin Doctor', value: '19' },
  { label: 'Inverter', value: '20' },
  { label: 'Wiring', value: '21' },
  { label: 'Lightning', value: '22' },
  { label: 'Grocery', value: '23' },
  { label: 'Car Booking', value: '24' },
  { label: 'Chhota Hathi', value: '25' },
  { label: 'Tractor', value: '26' },
  { label: 'JCB', value: '27' },
]

const district = [
  { label: 'Agra', value: '1' },
  { label: 'Aligarh', value: '2' },
  { label: 'Allahabad ', value: '3' },
  { label: 'Ambedkar Nagar', value: '4' },
  { label: 'Amethi ', value: '5' },
  { label: 'Amroha ', value: '6' },
  { label: 'Auraiya ', value: '7' },
  { label: 'Azamgarh ', value: '8' },
  { label: 'Badaun ', value: '9' },
  { label: 'Bagpat ', value: '10' },
  { label: 'Bahraich ', value: '11' },
  { label: 'Ballia ', value: '12' },
  { label: 'Balrampur ', value: '13' },
  { label: 'Banda District	 ', value: '14' },
  { label: 'Barabanki ', value: '15' },
  { label: 'Bareilly ', value: '16' },
  { label: 'Basti ', value: '17' },
  { label: 'Bhadohi ', value: '18' },
  { label: 'Bijnor ', value: '19' },
  { label: 'Bulandshahr ', value: '20' },
  { label: 'Chandauli(Varanasi Dehat) ', value: '21' },
  { label: 'Chitrakoot ', value: '22' },
  { label: 'Deoria ', value: '23' },
  { label: 'Etah ', value: '24' },
  { label: 'Etawah ', value: '25' },
  { label: 'Faizabad ', value: '26' },
  { label: 'Farrukhabad ', value: '27' },
  { label: 'Fatehpur ', value: '28' },
  { label: 'Firozabad ', value: '29' },
  { label: 'Gautam Buddha Nagar	 ', value: '30' },
  { label: 'Ghaziabad ', value: '31' },
  { label: 'Ghazipur ', value: '32' },
  { label: 'Gonda ', value: '33' },
  { label: 'Gorakhpur ', value: '34' },
  { label: 'Hamirpur ', value: '35' },
  { label: 'Hapur District	 ', value: '36' },
  { label: 'Hardoi ', value: '37' },
  { label: 'Hathras ', value: '38' },
  { label: 'Jaunpur District	 ', value: '39' },
  { label: 'Jhansi ', value: '40' },
  { label: 'Kannauj ', value: '41' },
  { label: 'Kanpur Dehat	 ', value: '42' },
  { label: 'Kanpur Nagar	 ', value: '43' },
  { label: 'Kasganj ', value: '44' },
  { label: 'Kaushambi ', value: '45' },
  { label: 'Kushinagar ', value: '46' },
  { label: 'Lakhimpur ', value: '47' },
  { label: 'Lalitpur ', value: '48' },
  { label: 'Lucknow ', value: '49' },
  { label: 'Maharajganj ', value: '50' },
  { label: 'Mahoba ', value: '51' },
  { label: 'Mainpuri ', value: '52' },
  { label: 'Mathura ', value: '53' },
  { label: 'Mau ', value: '54' },
  { label: 'Meerut ', value: '55' },
  { label: 'Mirzapur ', value: '56' },
  { label: 'Moradabad ', value: '57' },
  { label: 'Muzaffarnagar ', value: '58' },
  { label: 'Pilibhit ', value: '59' },
  { label: 'Pratapgarh ', value: '60' },
  { label: 'PrayagRaj', value: '61' },
  { label: 'Rae Bareli	 ', value: '62' },
  { label: 'Rampur ', value: '63' },
  { label: 'Saharanpur	 ', value: '64' },
  { label: 'Sant Kabir Nagar	 ', value: '65' },
  { label: 'Sambhal ', value: '66' },
  { label: 'Shahjahanpur ', value: '67' },
  { label: 'Shamli ', value: '68' },
  { label: 'Shravasti ', value: '69' },
  { label: 'Siddharthnagar ', value: '70' },
  { label: 'Sitapur ', value: '71' },
  { label: 'Sonbhadra ', value: '72' },
  { label: 'Sultanpur ', value: '73' },
  { label: 'Unnao ', value: '74' },
  { label: 'Varanasi', value: '75' },
]
