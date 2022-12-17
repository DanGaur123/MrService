import { Colors } from '@/Theme/Variables'
import React from 'react'
import { Component } from 'react'
import {
  Dimensions,
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'
import auth from '@react-native-firebase/auth'
import { navigate } from '@/Navigators/utils'
import Modal from 'react-native-modal'

const { width, height } = Dimensions.get('window')

class AppointmentCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      AppointmentData: {},
      isModalVisible: false,
    }
  }

  componentDidMount() {
    this.fetchDataFromFirebase()
  }


 onSelect=(x)=>{
  let  tempData=this.state.AppointmentData
   tempData.map((item,index)=>{
    if(x-1==index){
      item.marked=x
    }
    if(x-1!=index){
      item.marked=-1
    }
   })

   let temp=[]
   tempData.map(item=>{
    temp.push(item)
   })

   this.setState({AppointmentData:temp})
 }


  fetchDataFromFirebase = () => {
    const user = auth().currentUser

    if (user.phoneNumber == '+919170541352') {
      firestore()
        .collection('Appointments')
        .orderBy('Date.timestamp', 'desc')
        .get()
        .then(querySnapshot => {
          const data = []

          querySnapshot.forEach(documentSnapshot => {
            const {
              Full_Name,
              ServiceType,
              Date,
              Mobile_Number,
              Description,
              District,
              NearByLandmark,
              Pincode,
              State,
              Village,
            } = documentSnapshot.data()
            data.push({
              id: documentSnapshot.id,
              Full_Name,
              ServiceType,
              Date,
              Mobile_Number,
              Description,
              District,
              NearByLandmark,
              Pincode,
              State,
              Village,
              marked:-1
            })
          })
          this.setState({ AppointmentData: data })
        })
    }
    if (user.phoneNumber != '+919170541352') {
      firestore()
        .collection('Appointments')
        .where('User_Number', '==', user.phoneNumber)
        .orderBy('Date.timestamp', 'desc')
        .get()
        .then(querySnapshot => {
          const data = []

          querySnapshot.forEach(documentSnapshot => {
            const {
              Full_Name,
              ServiceType,
              Date,
              Mobile_Number,
              Description,
              District,
              NearByLandmark,
              Pincode,
              State,
              Village,
            } = documentSnapshot.data()
            data.push({
              id: documentSnapshot.id,
              Full_Name,
              ServiceType,
              Date,
              Mobile_Number,
              Description,
              District,
              NearByLandmark,
              Pincode,
              State,
              Village,
              marked:-1
            })
          })
          this.setState({ AppointmentData: data })
        })
    }
  }

  render() {
    const user = auth().currentUser
    Item = ({
      Full_Name,
      ServiceType,
      Date,
      Mobile_Number,
      Description,
      District,
      NearByLandmark,
      Pincode,
      State,
      Village,
      index,
      marked
    }) => (
      <>
        <TouchableOpacity
        activeOpacity={0.6}
          onPress={() => {
            user.phoneNumber == '+919170541352'
              ? this.state.isModalVisible
                ? this.setState({ isModalVisible: false })
                : this.setState({ isModalVisible: true })
              : ''
              this.onSelect(index+1)
              
          }}
          style={{
            elevation: 2,
            backgroundColor: 'white',
            borderRadius: 10,
            marginVertical: 5,
            marginHorizontal: 5,

            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: 'Rubik-Regular',
                  fontSize: 16,
                  color: 'gray',
                }}
              >
                {moment(Date?.dateString).format('ddd')}
              </Text>
              <Text
                style={{
                  fontSize: 40,
                  fontFamily: 'Rubik-SemiBold',
                  color: Colors.primary,
                  marginVertical: 5,
                }}
              >
                {Date?.day}
              </Text>
              <Text
                style={{
                  fontFamily: 'Rubik-Regular',
                  fontSize: 16,
                  color: 'gray',
                }}
              >
                {moment(Date?.dateString).format('MMMM')}
              </Text>
            </View>
            <View
              style={{
                height: '70%',
                backgroundColor: Colors.secondaryText,
                width: 1,
                marginHorizontal: 20,
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Rubik-Regular',
                  marginBottom: 3,
                  color: 'gray',
                }}
              >
                Appointment Type
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: Colors.text,
                  fontFamily: 'Rubik-Regular',
                  width: 150,
                }}
              >
                {ServiceType?.label}
              </Text>
              <View
                style={{
                  width: '100%',
                  backgroundColor: Colors.secondaryText,
                  height: 1,
                  marginVertical: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Rubik-Regular',
                  marginBottom: 3,
                  color: 'gray',
                }}
              >
                Mobile No.
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: Colors.text,
                  fontFamily: 'Rubik-Regular',
                }}
              >
                {Mobile_Number}
              </Text>
            </View>
            {user.phoneNumber !== '+919170541352' ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.white,
                    width: '100%',
                  }}
                >
                  <IonIcons
                    name="logo-whatsapp"
                    size={30}
                    color={'#25D366'}
                    onPress={() => {
                      Linking.openURL(
                        'whatsapp://send?text=Hello Mr.Rupesh&phone=+919170541352',
                      )
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Colors.white,
                    width: '100%',
                  }}
                >
                  <IonIcons
                    name="call"
                    size={30}
                    color={Colors.primary}
                    onPress={() => {
                      Linking.openURL('tel:9170541352')
                    }}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  backgroundColor: Colors.white,
                  width: '100%',
                }}
              >
                <IonIcons
                  name="call"
                  size={30}
                  color={Colors.primary}
                  onPress={() => {
                    Linking.openURL(`tel:${encodeURIComponent(Mobile_Number)}`)
                  }}
                />
              </View>
            )}
          </View>
          {this.state.isModalVisible && marked!=-1 ? (
            <View
              style={{
                backgroundColor: Colors.secondaryText,
                width: '100%',
                alignSelf: 'center',
                marginVertical: 20,
                borderRadius: 20,
                padding: 10,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: Colors.primary, fontSize: 18 }}>
                  Name :
                </Text>
                <Text style={{ fontSize: 16, color: 'black', marginLeft: 5 }}>
                  {Full_Name}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 18,
                    alignSelf: 'flex-start',
                  }}
                >
                  Village :
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    marginLeft: 5,
                    width: width / 2,
                  }}
                >
                  {Village}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: Colors.primary, fontSize: 18 }}>
                  District :
                </Text>
                <Text style={{ fontSize: 16, color: 'black', marginLeft: 5 }}>
                  {District}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: Colors.primary, fontSize: 18 }}>
                  State :
                </Text>
                <Text style={{ fontSize: 16, color: 'black', marginLeft: 5 }}>
                  {State}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: Colors.primary, fontSize: 18 }}>
                  Pincode :
                </Text>
                <Text style={{ fontSize: 16, color: 'black', marginLeft: 5 }}>
                  {Pincode}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 18,
                    alignSelf: 'flex-start',
                  }}
                >
                  Near By Landmark :
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    marginLeft: 5,
                    width: width / 4,
                  }}
                >
                  {NearByLandmark}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: Colors.primary, fontSize: 18 }}>
                  Problem :
                </Text>
                <Text style={{ fontSize: 16, color: 'black', marginLeft: 5 }}>
                  {Description}
                </Text>
              </View>
            </View>
          ) : (
            ''
          )}
        </TouchableOpacity>
      </>
    )
    renderItem = ({ item, index }) => (
      <Item
        Full_Name={item.Full_Name}
        ServiceType={item.ServiceType}
        Date={item.Date}
        Mobile_Number={item.Mobile_Number}
        Description={item.Description}
        District={item.District}
        NearByLandmark={item.NearByLandmark}
        Pincode={item.Pincode}
        State={item.State}
        Village={item.Village}
        index={index}
        marked={item.marked}
      />
    )
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.state.AppointmentData == '' ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={require('Assets/Images/notFound.png')}
              style={{ height: height / 4, aspectRatio: 1 }}
            />
            <Text
              style={{
                color: Colors.primary,
                fontSize: 15,

                fontFamily: 'Rubik-Medium',
              }}
            >
              You have't booked any Appointment{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigate('Book Appointment')}
              style={{
                paddingHorizontal: 20,
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
                Book an Appointment
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <FlatList
              data={this.state.AppointmentData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </SafeAreaView>
    )
  }
}

export default AppointmentCard
