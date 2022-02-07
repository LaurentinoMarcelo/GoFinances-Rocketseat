import { Text, View, TextInput, Button } from 'react-native';
import React from 'react';

export function Profile(){
  return (
    <View>
      <Text
      testID='text-title'
      >Perfil</Text>
      <TextInput testID='input-name' placeholder='Nome' autoCorrect={false} value='Marcelo'/>
      <TextInput testID='input-surname' placeholder='sobrenome' autoCorrect={false} value='Laurentino' />
      <Button
        title='salvar'
        onPress={() => {}}
      />
    </View>
  );
}


