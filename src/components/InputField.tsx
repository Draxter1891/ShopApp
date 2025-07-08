import { KeyboardTypeOptions, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import React from 'react'

type InputFieldProps = {
    placeholder: string;
    keyboard: KeyboardTypeOptions;
} & TextInputProps;

const InputField = ({placeholder,keyboard,...rest}:InputFieldProps) => {
  return (
    <View style={{borderBottomColor:'#dcdee0',borderBottomWidth:1,marginBottom:15,width:'90%'}}>
      <TextInput placeholder={placeholder} keyboardType={keyboard} 
      {...rest}/>
    </View>
  )
}

export default InputField