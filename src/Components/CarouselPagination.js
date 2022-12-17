import { Colors } from '@/Theme/Variables';
import React from 'react'
import { View } from 'react-native'
import Animated, { Extrapolate,interpolate,useAnimatedStyle } from 'react-native-reanimated';

const CarouselPagination = ({index,length,animValue,backgroundColor}) => {
    const width = 10
    const animStyle = useAnimatedStyle(() => {
        let inputRange = [index - 1, index, index + 1];
        let outputRange = [-width, 0, width];

        if (index === 0 && animValue?.value > length - 1) {
            inputRange = [length - 1, length, length + 1];
            outputRange = [-width, 0, width];
        }

        return {
            transform: [
                {
                    translateX: interpolate(
                        animValue?.value,
                        inputRange,
                        outputRange,
                        Extrapolate.CLAMP
                    ),
                },
            ],
        };
    }, [animValue, index, length]);
  return (
    <View style={{backgroundColor:Colors.background,width:width,borderRadius:50,overflow:'hidden',aspectRatio:1}}>
      <Animated.View style={[{borderRadius:50,backgroundColor,flex:1},animStyle]}/>
    </View>
  )
}

export default CarouselPagination