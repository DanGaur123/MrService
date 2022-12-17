import React from 'react'
import { View, Text, Dimensions, Image, Pressable } from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { Colors } from '@/Theme/Variables'
import { navigate } from '@/Navigators/utils'
const { width, height } = Dimensions.get('window')

const ServiceItem = ({ name,image,path }) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          display: 'flex',
          width: width * 0.4,
          aspectRatio: 1,
        }}
      >
        <Image
          source={image}
          style={{ height: '100%', width: '100%' }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          zIndex: 100,
          width: '100%',
          height: '25%',
          backgroundColor: "rgba(0,0,0,0.6)",
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          flexDirection:'row',
          justifyContent:'space-between',
          paddingHorizontal:10,
          alignItems:'center'
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontFamily: 'Rubik-Medium',
            color: Colors.white,
          }}
        >
          {name}
        </Text>
        <Pressable onPress={() => navigate(path)} style={{flexDirection:'row',alignItems:'center'}}><Text style={{color:Colors.linkColor,fontFamily:'Rubik-Regular'}}>More</Text><IonIcons name='arrow-forward-outline'size={15} color={Colors.linkColor} style={{marginLeft:2,marginTop:1.5}}/></Pressable>
      </View>
    </View>
  )
}

export default ServiceItem
