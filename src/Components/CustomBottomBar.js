import { Colors } from '@/Theme/Variables'
import { transform } from '@babel/core'
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated as Animated1,
  Easing,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

const { width, height } = Dimensions.get('window')
const CustomBottomBar = ({ state, descriptors, navigation }) => {
  const TAB_WIDTH = width / state.routes.length
  const offsetX = useSharedValue(0)
  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(offsetX.value * width, { duration: 500 }) },
      ],
    }
  })

  useEffect(() => {
    offsetX.value = (TAB_WIDTH * state.index) / width
  }, [state.index])

  return (
    <View
      style={{
        flexDirection: 'row',
        width: width,
        backgroundColor: '#f5f5f5',
        alignSelf: 'center',
        paddingVertical: 15,
        position: 'absolute',
        bottom: 0,
      }}
    >
      <View
        style={{
          width: TAB_WIDTH,
          ...StyleSheet.absoluteFillObject,
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={[
            {
              width: 10,
              aspectRatio:1,
              borderRadius: 50,
              backgroundColor: Colors.primary,
            },
            animStyle,
          ]}
        />
      </View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        const icon = options.tabBarIcon !== undefined ? options.tabBarIcon : ''

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'column', alignItems: 'center',marginTop:5}}>
              <Icon
                isFocused={isFocused}
                index={state.index}
                icon={() =>
                  icon({
                    focused: isFocused,
                    size: 20,
                    color: isFocused ? Colors.primary : Colors.text,
                  })
                }
              />
              {/* {isFocused && (
                <Text
                  style={{
                    color: isFocused ? Colors.primary : '#222',
                    textAlign: 'center',
                    fontSize: 13,
                    fontFamily: 'Rubik-Medium',
                  }}
                >
                  {label}
                </Text>
              )} */}
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const Icon = ({ isFocused, index, icon }) => {
  const [translateY] = useState(new Animated1.Value(0))

  const transformIcon = val => {
    Animated1.timing(translateY, {
      toValue: val,
      useNativeDriver: true,
      duration: 500,
      easing: Easing.bezier(0.45, 0, 0.55, 1),
    }).start()
  }
  useEffect(() => {
    if (isFocused) {
      transformIcon(0)
    } else {
      transformIcon(0)
    }
  }, [index])
  return (
    <Animated1.View style={{ transform: [{ translateY }] }}>
      {icon()}
    </Animated1.View>
  )
}

export default CustomBottomBar
