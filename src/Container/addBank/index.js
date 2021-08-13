/* eslint-disable quotes */
/* eslint-disable eqeqeq */
/* eslint-disable semi */
/* eslint-disable keyword-spacing */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import AsyncStorage from '@react-native-community/async-storage';

import CustomHeader from '../../Component/CustomHeader';
import CustomInputView from '../../Component/CustomInputView';
import {
  accountInfo,
  accountInfoSave,
  accountInfoUpdate,
} from '../../Redux/ReduxAPIHandler/userApi';
import Images from '../../Resources/Images';
import {style} from './style';

class AddBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      bankName: '',
      accountNo: '',
      ifsc: '',
      isLoading: false,
      data: {},
      account: '',
    };
    this.inputRef= {};
    this.current=true;
  }

  componentDidMount = () => {
    this.props.navigation.addListener('blur', (event) => {
      this.current=false;
    });
    this.props.navigation.addListener('focus', (event) => {
      this.current=true;
      this.getToken();
    });
    this.getToken();
     this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  };

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

  getToken = () => {
    AsyncStorage.getItem('loginData')
      .then((res) => {
        this.setState({...this.state, data: JSON.parse(res)});
        this.getAccountData();
      })
      .catch((error) => {
        console.log('LoginData>>>', JSON.stringify(error));
      });
  };

  getAccountData = async () => {
    this.setState({...this.state, isLoading: true});
    try {
      let getData = await accountInfo({token: this.state.data.jwt});
      console.log('getData>>>>', getData);
      if (getData.success == 1) {
        this.setState({
          ...this.state,
          Name: getData.account_holder_name,
          accountNo: getData.account_number,
          bankName: getData.bank_name,
          ifsc: getData.account_ifsc_code,
          account: getData.account_number == null ? '' : getData.account_number,
          isLoading: false,
        });
      } else {
        this.setState({...this.state, isLoading: false});
      }
    } catch (error) {
      this.setState({...this.state, isLoading: false});
      console.log(error);
    }
  };
  save = async () => {
    if (this.state.Name == '') {
      Toast.show('Please enter the account holder name');
    } else if (this.state.bankName == '') {
      Toast.show('Please enter the bank name');
    } else if (this.state.accountNo == '') {
      Toast.show('Please enter the account number');
    } else if (this.state.ifsc == '') {
      Toast.show('Please enter the ifsc code');
    } else {
      this.setState({...this.state, isLoading: true});
      try {
        if (this.state.account == '') {
          let saveResponse = await accountInfoSave({
            token: this.state.data.jwt,
            name: this.state.Name,
            bank_name: this.state.bankName,
            account_number: this.state.accountNo,
            ifsc: this.state.ifsc,
          });
          this.setState({...this.state, isLoading: false});
          if (saveResponse.success == 1) {
            Toast.show(saveResponse.message);
          } else {
            Toast.show(saveResponse.message);
          }
        } else {
          let updateResponse = await accountInfoUpdate({
            token: this.state.data.jwt,
            name: this.state.Name,
            bank_name: this.state.bankName,
            account_number: this.state.accountNo,
            ifsc: this.state.ifsc,
          });
          this.setState({...this.state, isLoading: false});
          console.log('res>>>', updateResponse);
          if (updateResponse.success == 1) {
            Toast.show(updateResponse.message);
          }
        }
      } catch (error) {
        this.setState({...this.state, isLoading: false});
        console.log('error:', error);
      }
    }
  };
  setInputRef = (data) => {
    this.inputRef = data;
  };
  render() {
    return (
      <View style={style.container}>
        <View style={style.emptyTopVw} />

        <CustomHeader
          title={'Add Bank Details'}
          image={Images.leftArrow}
          leftBtn={() => this.props.navigation.goBack()}
          searchItem={() => {}}
        />
        <View style={[style.container, {width: '100%'}]}>
          <KeyboardAvoidingView>
            <ScrollView>
              <View
                style={{width: Dimensions.get('window').width, padding: 20}}
              />
              <CustomInputView
                title={'Account holder name'}
                placeholder={'Enter account holder name'}
                value={this.state.Name}
                onChangeText={(text) =>
                  this.setState({...this.state, Name: text})
                }
                maxLength={40}
                inputRefs={(input) => {
                  this.setInputRef(input);
                }}
              />
              <CustomInputView
                title={'Bank name'}
                placeholder={'Enter bank name'}
                value={this.state.bankName}
                onChangeText={(text) =>
                  this.setState({...this.state, bankName: text})
                }
                inputRefs={(input) => {
                  this.setInputRef(input);
                }}
              />
              <CustomInputView
                title={'Account Number'}
                placeholder={'Enter account number'}
                value={this.state.accountNo}
                onChangeText={(text) =>
                  this.setState({...this.state, accountNo: text})
                }
                keyboardType={'numeric'}
                maxLength={20}
                inputRefs={(input) => {
                  this.setInputRef(input);
                }}
              />
              <CustomInputView
                title={'IFSC Code'}
                placeholder={'Enter ifsc code'}
                value={this.state.ifsc}
                onChangeText={(text) =>
                  this.setState({...this.state, ifsc: text})
                }
                inputRefs={(input) => {
                  this.setInputRef(input);
                }}
              />

              <TouchableOpacity
                style={[style.loginBtn, {width: '80%', marginBottom: 30}]}
                onPress={() => this.save()}>
                <Text style={style.logTx}>
                  {this.state.account == '' ? 'SAVE' : 'UPDATE'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isLoading}>
          <View style={style.popupView}>
            {this.state.isLoading ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : null}
          </View>
        </Modal>
      </View>
    );
  }
}

export default AddBank;
