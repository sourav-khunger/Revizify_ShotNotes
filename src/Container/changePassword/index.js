/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import React from 'react';

import {
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import AsyncStorage from '@react-native-community/async-storage';

import CustomHeader from '../../Component/CustomHeader';
import CustomTextInput from '../../Component/CustomTextInput';
import {updateData} from '../../Navigation/Drawer';
import api from '../../Resources/APIs';
import Colors from '../../Resources/Colors';
import Images from '../../Resources/Images';
import {style} from './style';

const axios = require('axios');
export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            data: {},
        };
        this.inputRef = {};
        this.current=true;
    }
    componentDidMount = () => {
        this.props.navigation.addListener('blur', (event) => {
      this.current = false;
    });
    this.props.navigation.addListener('focus', (event) => {
      this.current = true;});
        AsyncStorage.getItem('loginData')
            .then((res) => {
                this.setState({ ...this.state, data: JSON.parse(res) });
            })
            .catch((error) => {
                console.log('LoginData>>>', JSON.stringify(error));
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
        if (this.state.oldPassword == '') {
            Toast.show('Please enter the old password');
        } else if (this.state.newPassword == '') {
            Toast.show('Please enter the new password');
        } else if (this.state.confirmPassword == '') {
            Toast.show('Please enter the confirm password');
        } else if (this.state.newPassword != this.state.confirmPassword) {
            Toast.show('Please reenter the confirm password ');
        } else {
            Keyboard.dismiss();
            axios
                .post(api.CHANGEPASSWORD, {
                    id: this.state.data.id,
                    new_password: this.state.newPassword.replace("'", ''),
                    current_password: this.state.oldPassword.replace("'", ''),
                }, {
                    'headers': {
                        Authorization: 'Bearer ' + this.state.data.jwt,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                })
                .then((res) => {
                    if (res.data.success == 1) {
                        AsyncStorage.setItem(
                            'loginData',
                            '',
                        );
                        this.setState({ ...this.state, oldPassword: '', newPassword: '', confirmPassword: '' });
                        updateData();
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    } else {
                        Toast.show(JSON.stringify(res.data.message));
                    }
                })
                .catch((error) => console.log('res>>>>>', JSON.stringify(error)));
        }
    };


    render() {
        return (
            <View style={style.container}>
                <View style={style.emptyTopVw} />
                <CustomHeader
              title={'Change Password'}
              image={Images.menuIcon}
              leftBtn={() => this.props.navigation.openDrawer()}
              searchItem={() => { }}
            />
                <View style={style.subcontainer}>
                    <Image source={Images.SPLASH_ICON} style={style.img} />
                    <CustomTextInput
                        isImage={true}
                        image={Images.password}
                        placeholder="Old password"
                        placeholderTextColor={Colors.Black}
                        keyboardType={'default'}
                        value={this.state.oldPassword}
                        onchangeText={(text) => this.setState({ oldPassword: text })}
                        height={40}
                        secureTextEntry={true}
                        onkeyPress={(text) => {}}
                        onSubmitEditing={(text) => {}}
                        inputRefs={(input) => {
                        this.setInputRef(input);
          }}
                    />
                    <CustomTextInput
                        isImage={true}
                        image={Images.password}
                        placeholder="New password"
                        placeholderTextColor={Colors.Black}
                        keyboardType={'default'}
                        value={this.state.newPassword}
                        onchangeText={(text) => this.setState({ newPassword: text })}
                        height={40}
                        secureTextEntry={true}
                        onkeyPress={(text) => {}}
                        onSubmitEditing={(text) => {}}
                        inputRefs={(input) => {
            this.setInputRef(input);
          }}
                    />
                    <CustomTextInput
                        isImage={true}
                        image={Images.password}
                        placeholder="Confirm Password"
                        placeholderTextColor={Colors.Black}
                        keyboardType={'default'}
                        value={this.state.confirmPassword}
                        onchangeText={(text) => this.setState({ confirmPassword: text })}
                        height={40}
                        secureTextEntry={true}
                        onkeyPress={(text) =>{}}
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
