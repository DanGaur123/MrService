import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { setDefaultTheme } from '@/Store/Theme'
import auth from '@react-native-firebase/auth'
import { navigateAndSimpleReset } from '@/Navigators/utils'

const StartupContainer = () => {
  const { Layout, Gutters, Fonts } = useTheme()

  const { t } = useTranslation()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      },10000),
    )
    await setDefaultTheme({ theme: 'default', darkMode: null })
    //navigateAndSimpleReset('Login')
  }

  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])
  const onAuthStateChanged = user => {
   
   

    if (user) {
    navigateAndSimpleReset('Main')
    } else {
      navigateAndSimpleReset('Login')
    }
  }

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
      {/* <Text style={Fonts.textCenter}>{t('welcome')}</Text> */}
    </View>
  )
}

export default StartupContainer
