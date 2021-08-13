/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import CustomTextInput from '../../Component/CustomTextInput';
import api from '../../Resources/APIs';
import Colors from '../../Resources/Colors';
import Images from '../../Resources/Images';
import {style} from './style';

const axios = require('axios');
export default class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
        this.inputRef = {};
        this.current = true;
    }
    componentDidMount = () => {
        this.props.navigation.addListener('blur', (event) => {
      this.current = false;
    });
    this.props.navigation.addListener('focus', (event) => {
      this.current = true;
    });
        this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
    }
    componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  keyboardDidHide = () => {
      if(this.current){

      
    if (this.inputRef.isFocused) {
      this.inputRef.blur();
      return true;
    }
    return false;
      }
  };
  setInputRef = (data) => {
    this.inputRef = data;
  };

    login = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.email == '') {
            Toast.show('Please enter the email');
        } else if (reg.test(this.state.email) === false) {
            Toast.show('Please enter the vaild email');
        } else {
            Keyboard.dismiss();
            axios.post(api.FORGET, {
                email: this.state.email,
            }).then((res) => {
                if (res.data.success == 1) {
                    Toast.show(res.data.message);
                    this.props.navigation.navigate('Login');
                }
                else {
                    Toast.show(JSON.stringify(res.data.message));
                }
            }
            ).catch((error) => console.log('res>>>>>', JSON.stringify(error)));
        }
    };


    render() {
        return (
            <View style={style.container}>
                <View style={style.emptyTopVw} />
                <View style={style.mainVw}>
                        <TouchableOpacity style={style.backBtn} onPress={() => this.props.navigation.goBack()}>
                            <Image style={style.backImg} source={Images.leftArrow} />
                        </TouchableOpacity>
                        <Text style={style.headerNameTx}>
                            {'Forget Password'}
                        </Text>
                    </View>
                <View style={style.subcontainer}>
                    

                    <Image source={Images.SPLASH_ICON} style={style.img} />
                    <CustomTextInput
                        isImage={true}
                        image={Images.email}
                        placeholder=" Enter registered email"
                        placeholderTextColor={Colors.Black}
                        keyboardType={'email-address'}
                        value={this.state.email}
                        onchangeText={(text) => this.setState({ email: text })}
                        height={40}
                        onkeyPress={(text) => {}}
                        onSubmitEditing={(text) => {}}
                        inputRefs={(input) => {
            this.setInputRef(input);
          }}
                    />


                    <TouchableOpacity style={[style.loginBtn, { width: '100%' }]}>
                        <Text style={style.logTx} onPress={() => this.login()}>
                            {'Next'}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}
