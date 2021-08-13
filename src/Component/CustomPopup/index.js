/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  ActivityIndicator,
  View,
} from 'react-native';

export const LoaderPopup = ({isLoading, defaultRating, sendRating}) => {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
      {isLoading ? <ActivityIndicator size="large" color="#ffffff" /> : null}
      </View>
      
    </View>
  );
};
