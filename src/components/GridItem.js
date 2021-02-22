/* eslint-disable react-native/no-inline-styles */
import {Icon} from 'native-base';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const GridItem = ({onPress, iconName, text}) => {
  return (
    <TouchableOpacity
      style={{
        flexBasis: '47%',
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        borderRadius: 16,
        marginVertical: 8,
      }}
      onPress={onPress}>
      <Icon
        name={iconName}
        style={{fontSize: 80, color: '#2e2e2e', marginVertical: 24}}
      />
      <Text
        style={{
          fontSize: 18,
          color: '#2e2e2e',
          marginBottom: 16,
          textAlign: 'center',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default GridItem;
