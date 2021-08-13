/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {
  Linking,
  Text,
  View,
} from 'react-native';

import CustomHeader from '../../Component/CustomHeader';
import Colors from '../../Resources/Colors';
import Images from '../../Resources/Images';
import {style} from './style';

class Contact extends Component {
  render() {
    return (
      <View style={style.container}>
      <View style={style.emptyTopVw} />
      <CustomHeader
              title={'Contact us'}
              image={Images.menuIcon}
              leftBtn={() => this.props.navigation.openDrawer()}
              searchItem={() => { }}
            />
             <View style={[style.container,{alignItems: 'center'}]}>
        <Text  style={style.aboutTx}>{'Kindly email at '}<Text style={{color: Colors.mainColor}} onPress={()=>Linking.openURL('mailto:contact@shotnotes.in?subject=SendMail&body=Description')}>{'contact@shotnotes.in'}</Text>  {'for any queries/complaints.'}</Text>
        </View>
      </View>
    );
  }
}

export default Contact;
