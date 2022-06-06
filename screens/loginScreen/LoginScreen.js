import React from 'react'
import {View,Text, TextInput, TouchableOpacity} from 'react-native'
import { useState } from 'react'
import { authentication } from '../../components/firebaseConfig/firebase-config'
import { createUserWithEmailAndPassword } from 'firebase/auth'


export default function LoginScreen() {
  const[email,setEmail]= useState('')
  const[password,setPassword]= useState('')

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
      <View>
        <center>
        <Text>Sign Up</Text>
        </center>
        <TextInput placeholder='Email' value={email} onChangeText={text=>setEmail(text)}/>
        <TextInput placeholder='Password'value={password} onChangeText={text=>setPassword(text)}/>
        <TouchableOpacity onPress={RegisterUser}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
  )
}


