// import React, { useEffect } from 'react'
import {View,Text, TextInput, TouchableOpacity,StyleSheet} from 'react-native'
import { useState } from 'react'
import { authentication } from '../../components/firebaseConfig/firebase-config'
import { createUserWithEmailAndPassword } from 'firebase/auth'



export default function Login() {
  const[email,setEmail]= useState('')
  const[password,setPassword]= useState('')

  // const navigation = useNavigation()

  // useEffect(()=>{
  //    auth.onAuthStateChanged(user =>{
  //     if(user){
  //       navigation.navigate("Home")
  //     }
  //   })

    
  // }, [])

  const RegisterUser = ()=>{
    createUserWithEmailAndPassword(authentication,email,password)
    .then((re)=>{
      console.log(re);
    })
    .catch((re)=>{
      console.log
    })
    setEmail('')
    setPassword('')
    
  }
  return (
      <View styles={styles.container}>
        <Text>Sign Up</Text>
        
        <TextInput placeholder='Email' value={email} onChangeText={text=>setEmail(text)}/>
        <TextInput placeholder='Password'value={password} secureTextEntry onChangeText={text=>setPassword(text)}/>
        <TouchableOpacity onPress={RegisterUser}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        
      </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black'

  }
})


