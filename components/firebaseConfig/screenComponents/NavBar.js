import React from 'react'
import { View ,Text,StyleSheet, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'

 
export default function NavBar() {

  const navigation= useNavigation()

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
        <Text>H</Text>
        </TouchableOpacity>
        <Text>P</Text>
        <Text>S</Text>
    </View>
  )
}

const styles= StyleSheet.create({
  container:{
    flexDirection:'row',
    marginHorizontal:10
  }
})
