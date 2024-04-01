import { View, Text } from 'react-native';
import React from 'react';

export default function PlaceholderImage() {
  return (
    <View
      style={{
        height: 400,
        width: '70%',
        backgroundColor: 'gray',
        alignSelf: 'center',
        marginTop: 24,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>PLACEHOLDER</Text>
    </View>
  );
}
