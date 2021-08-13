/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  ActivityIndicator,
  Keyboard,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import AsyncStorage from '@react-native-community/async-storage';

import CustomHeader from '../../Component/CustomHeader';
import {
  requestWallatApi,
  walletDataApi,
} from '../../Redux/ReduxAPIHandler/userApi';
import Colors from '../../Resources/Colors';
import Images from '../../Resources/Images';
import {style} from './style';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      walletData: {},
      isAmount: true,
      price: 0,
      errorMsg: '',
      isLoading: false,
    };
    this.inputRef = React.createRef();
    this.current = true;
  }

  componentDidMount = () => {
    this.props.navigation.addListener('blur', (event) => {
      this.current = false;
    });
    this.props.navigation.addListener('focus', (event) => {
      this.current = true;
    });
    this.getUserData();
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  };
  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  keyboardDidHide = () => {
    if (this.current) {
      if (this.inputRef.current.isFocused) {
        this.inputRef.current.blur();
        return true;
      }
      return false;
    }
  };

  getUserData = () => {
    AsyncStorage.getItem('loginData')
      .then((res) => {
        this.setState({...this.state, data: JSON.parse(res)});
        this.getWallet();
      })
      .catch((error) => {
        console.log('LoginData Error>>>', JSON.stringify(error));
      });
  };

  getWallet = async () => {
    try {
      let walletResponse = await walletDataApi({token: this.state.data.jwt});
      if (walletResponse.success == 1) {
        // console.log('success>>>', walletResponse);
        this.setState({...this.state, walletData: walletResponse});
      } else {
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  requestAmount = async (price) => {
    if (this.state.walletData.total_amount == 0) {
      Toast.show('Your balance is very low. You can not request a balance');
    } else {
      this.setState({...this.state, isLoading: true});
      try {
        let requestedData = await requestWallatApi({
          token: this.state.data.jwt,
          amount: price,
        });
        if (requestedData.success == 1) {
          // console.log('success>>>', requestedData);
          this.setState({
            ...this.state,
            walletData: requestedData,
            isAmount: true,
            price: 0,
            isLoading: false,
          });
        } else {
          this.setState({...this.state, isLoading: false});
          Toast.show(requestedData.message);
        }
      } catch (error) {
        this.setState({...this.state, isLoading: false});
        console.log('error', error);
      }
    }
  };
  paidNow = () => {
    if (this.state.walletData.bank_account) {
      if (this.state.isAmount) {
        this.requestAmount(this.state.walletData.total_amount);
      } else {
        if (this.state.price == 0) {
          this.setState({errorMsg: 'Please enter the amount'});
        } else if (
          Number(this.state.price) > Number(this.state.walletData.total_amount)
        ) {
          this.setState({
            errorMsg: 'Amount should not be greater than available balance',
          });
        } else {
          this.requestAmount(this.state.price);
        }
      }
    } else {
      Toast.show(
        "If you're a creator making paid courses on Revizify, kindly update your bank details by clicking the (bank icon) on top right side and all sections in 'Profile'. ",
        Toast.LONG,
      );
    }
  };
  changeText = (text) => {
    if (text.length >= 1) {
      this.setState({...this.state, price: text, errorMsg: ''});
    } else {
      this.setState({...this.state, price: text});
    }
  };
  render() {
    return (
      <View style={style.container}>
        <View style={style.emptyTopVw} />
        <CustomHeader
          title={'Wallet'}
          image={Images.menuIcon}
          leftBtn={() => this.props.navigation.openDrawer()}
          searchItem={() => this.props.navigation.navigate('AddBank')}
          rightImage={require('../../Navigation/Assets/bank.png')}
        />
        {/* ********************* Total_amount ***************************** */}
        <View style={[style.detailsVw, {marginTop: 30, marginBottom: 10}]}>
          <Text style={style.nameTx}>{'Available Balance (in INR):'}</Text>
          <Text style={style.namesTx} numberOfLines={1}>
            {this.state.walletData.total_amount == undefined
              ? 0
              : this.state.walletData.total_amount}
          </Text>
        </View>

        <View style={style.amountVw}>
          <Text style={style.amountTx}>Amount</Text>
          <View style={style.selectView}>
            <TouchableOpacity
              onPress={() => this.setState({isAmount: true})}
              style={[
                style.circleVw,
                {
                  backgroundColor: this.state.isAmount
                    ? Colors.mainColor
                    : Colors.White,
                },
              ]}
            />
            <Text>
              {this.state.walletData.total_amount == undefined
                ? 0
                : this.state.walletData.total_amount}
            </Text>
          </View>
          <View style={style.selectView}>
            <TouchableOpacity
              style={[
                style.circleVw,
                {
                  backgroundColor: this.state.isAmount
                    ? Colors.White
                    : Colors.mainColor,
                },
              ]}
              onPress={() => this.setState({isAmount: false})}
            />
            <Text style={style.otherTx}>{'Other amount (in INR)'}</Text>
          </View>
          {this.state.isAmount ? null : (
            <View style={style.txInVw}>
              <TextInput
                placeholder={'Enter the amount'}
                value={this.state.price}
                onChangeText={(text) => this.changeText(text)}
                keyboardType={'numeric'}
                style={style.amountTxIn}
                ref={this.inputRef}
              />
            </View>
          )}
          {this.state.isAmount ? null : (
            <Text style={style.errMsg}>{this.state.errorMsg}</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => this.paidNow()}
          style={style.submitBtn}>
          <Text style={style.giveTx}>{'Get Paid Now'}</Text>
        </TouchableOpacity>
        {this.state.walletData.bank_account ? null : (
          <Text style={style.MsgTx}>
            {
              "If you're a creator making paid courses on Revizify, kindly update your bank details by clicking the (bank icon) on top right side and all sections in 'Profile'. "
            }
          </Text>
        )}

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

export default Wallet;
