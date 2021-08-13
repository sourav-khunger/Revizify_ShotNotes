/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-did-mount-set-state */
import React from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
import {
  NavigationActions,
  StackActions,
} from 'react-navigation';

import AsyncStorage from '@react-native-community/async-storage';

import {userData} from '../../Redux/ReduxAPIHandler/userApi';
import api from '../../Resources/APIs';
import Colors from '../../Resources/Colors';
import Images from '../../Resources/Images';

const axios = require('axios');
let isSelect = '1';
export const updateData = async (id) => {
    isSelect = id == undefined ? '1' : id;

};

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});
export default class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // isSelect: '11',
            data: {},
            deviceId: '',
            isLoading: false,
            name: '',
            imageuri: '',
        };
    }
    componentDidMount = () => {

        this.props.navigation.addListener('blur', (event) => {
      this.current = false;
    });
    this.props.navigation.addListener('focus', (event) => {
      this.current = true;
      this.getDetails();
    });
this.getDetails();
    

        

        let deviceId = DeviceInfo.getUniqueId();
        // console.log('deviceId>>>', JSON.stringify(deviceId));
        this.setState({ ...this.state, deviceId: deviceId });
    }

    getuserApi = async (data) => {
        let usData = await userData({ token: data.jwt, id: data.id })
        if(usData.success==1){
            this.setState({ ...this.state, name: usData.name, imageuri: usData.profile_photo == undefined ? '' : usData.profile_photo });
        }
        else{
            null;
        }
        


    }
    logoutBtn = () => {
        Alert.alert(
            'Do you want to Log Out?',
            '',
            [
                {
                    text: 'NO',
                    onPress: () => { },
                },
                {
                    text: 'YES',
                    onPress: () => this.logout(),
                    style: 'destructive',
                },
            ],
            { cancelable: false },
        );
    }
    logout = () => {
        this.setState({ ...this.state, isLoading: true });
        axios
            .post(api.LOGOUT, {
                id: this.state.data.id,
                device_id: this.state.deviceId,
                push_token: 'true',
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
                    isSelect = '21';
                    this.setState({ ...this.state, isLoading: false });
                    this.props.navigation.closeDrawer();
                    // this.props.navigation.navigate('Login');
                    this.props.navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
                    // navigation.reset('Login');
                } else {
                    this.setState({ ...this.state, isLoading: false });
                    Toast.show(JSON.stringify(res.data.message));
                }
            })
            .catch((error) => {
                this.setState({ ...this.state, isLoading: false });
                console.log('res>>>>>', JSON.stringify(error));
            });
    };

    getDetails=()=>{
AsyncStorage.getItem('loginData')
            .then((res) => {
                this.setState({ ...this.state, data: JSON.parse(res) });
                 this.getuserApi(JSON.parse(res));
            })
            .catch((error) => {
                console.log('LoginData>>>', JSON.stringify(error));
            });
    } 
    render() {
        // this.getuserApi(this.state.data);
        return (
            <View
                style={{

                    height: '100%',
                    width: '100%',
                    shadowRadius: 1,
                    backgroundColor: Colors.drkWhite,
                }}>
                <View
                    style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: Colors.drkWhite,
                    }}>
                    <View style={{ height: 15, backgroundColor: Colors.headerColor }} />
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                            borderBottomWidth: 2,
                            borderColor: 'white',
                            backgroundColor: Colors.headerColor,
                            padding: 10,
                            paddingTop: 20,
                        }}>
                        <View
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: '3%',
                            }}>
                            <Image
                                style={{ height: 50, width: 50, resizeMode: 'cover', borderRadius: 50, }}
                                source={this.state.imageuri == undefined || this.state.imageuri == '' ? Images.AvterImg : { uri: this.state.imageuri }}
                            />
                        </View>

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                marginLeft: '7%',
                                color: 'white',
                                width: '75%',
                            }}
                            numberOfLines={2}>
                            {this.state.name == undefined || this.state.name == '' ? 'ShotNOTES' : this.state.name}
                        </Text>
                    </View>

                    {/* ***************************** Home ***************************** */}
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            marginTop: 5,
                            marginBottom: 5,
                            height: 35,
                            minWidth: 50,
                            alignItems: 'center',
                            paddingLeft: 35,
                            backgroundColor:
                                isSelect == '1' ? Colors.mainColor : 'transparent',
                        }}
                        onPress={() => {
                            isSelect = '1';
            //                 this.props.navigation.reset({
            //   index: 1,
            //   routes: [{name: 'HomeStack'}],
            // });
                             this.props.navigation.navigate('HomeStack');
                            // this.props.navigation.dispatch(resetAction);
                            this.props.navigation.closeDrawer();
                        }}>
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                                tintColor: isSelect == '1' ? Colors.White : Colors.Black,
                            }}
                            source={
                                isSelect == '1'
                                    ? require('../Assets/home.png')
                                    : require('../Assets/home.png')
                            }
                        />

                        <Text
                            style={{
                                color: isSelect == '1' ? Colors.White : Colors.Black,
                                fontSize: 20,
                                paddingLeft: 10,
                                fontWeight: 'bold',
                            }}>
                            {'Home'}
                        </Text>
                    </TouchableOpacity>

                    {/* ***************************** Find Courses ***************************** */}
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            marginTop: 5,
                            marginBottom: 5,
                            height: 35,
                            minWidth: 50,
                            alignItems: 'center',
                            paddingLeft: 35,
                            backgroundColor:
                                isSelect == '2' ? Colors.mainColor : 'transparent',
                        }}
                        onPress={() => {
                            isSelect = '2';
                            // openSearch();
                            this.props.navigation.navigate('FindCourse');
                            this.props.navigation.closeDrawer();
                        }}>
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                            }}
                            source={
                                isSelect == '2'
                                    ? require('../Assets/language.png')
                                    : require('../Assets/language1.png')
                            }
                        />

                        <Text
                            style={{
                                color: isSelect == '2' ? Colors.White : Colors.Black,
                                fontSize: 20,
                                paddingLeft: 10,
                                fontWeight: 'bold',
                            }}>
                            {'Find Courses'}
                        </Text>
                    </TouchableOpacity>

                    {/* ***************************** Profile ***************************** */}
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            marginTop: 5,
                            marginBottom: 5,
                            height: 35,
                            minWidth: 50,
                            alignItems: 'center',
                            paddingLeft: 35,
                            backgroundColor:
                                isSelect == '3' ? Colors.mainColor : 'transparent',
                        }}
                        onPress={() => {
                            isSelect = '3';
                            this.props.navigation.closeDrawer();
                            this.props.navigation.navigate('Profile');
                        }}>
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                            }}
                            source={
                                isSelect == '3'
                                    ? require('../Assets/user.png')
                                    : require('../Assets/user1.png')
                            }
                        />

                        <Text
                            style={{
                                color: isSelect == '3' ? Colors.White : Colors.Black,
                                fontSize: 20,
                                paddingLeft: 10,
                                fontWeight: 'bold',
                            }}>
                            {'Profile'}
                        </Text>
                    </TouchableOpacity>

                    {/* ***************************** Wallet ***************************** */}
                    {/* <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            marginTop: 5,
                            marginBottom: 5,
                            height: 35,
                            minWidth: 50,
                            alignItems: 'center',
                            paddingLeft: 35,
                            backgroundColor:
                                isSelect == '9' ? Colors.mainColor : 'transparent',
                        }}
                        onPress={() => {
                            isSelect = '9';
                            this.props.navigation.closeDrawer();
                            this.props.navigation.navigate('Wallet');
                        }}>
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                                tintColor: isSelect == '9' ? 'white' : 'black'

                            }}
                            source={
                                isSelect == '9'
                                    ? require('../Assets/wallet1.png')
                                    : require('../Assets/wallet1.png')
                            }
                        />

                        <Text
                            style={{
                                color: isSelect == '9' ? Colors.White : Colors.Black,
                                fontSize: 20,
                                paddingLeft: 10,
                                fontWeight: 'bold',
                            }}>
                            {'Wallet'}
                        </Text>
                    </TouchableOpacity> */}


                    {/* ***************************** Rate App ***************************** */}
                    {/* <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            marginTop: 5,
                            marginBottom: 5,
                            height: 35,
                            minWidth: 50,
                            alignItems: 'center',
                            paddingLeft: 35,
                            backgroundColor:
                                isSelect == '4' ? Colors.mainColor : 'transparent',
                        }}
                        onPress={() => { isSelect = '4'; }}>
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                            }}
                            source={
                                isSelect == '4'
                                    ? require('../Assets/star.png')
                                    : require('../Assets/star1.png')
                            }
                        />

                        <Text
                            style={{
                                color: isSelect == '4' ? Colors.White : Colors.Black,
                                fontSize: 20,
                                paddingLeft: 10,
                                fontWeight: 'bold',
                            }}>
                            {'Rate App'}
                        </Text>
                    </TouchableOpacity> */}
                    {/* ***************************** About ***************************** */}
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            marginTop: 5,
                            marginBottom: 5,
                            height: 35,
                            minWidth: 50,
                            alignItems: 'center',
                            paddingLeft: 35,
                            backgroundColor:
                                isSelect == '5' ? Colors.mainColor : 'transparent',
                        }}
                        onPress={() => { isSelect = '5';
                        this.props.navigation.closeDrawer();
                            this.props.navigation.navigate('About'); }}>
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                            }}
                            source={
                                isSelect == '5'
                                    ? require('../Assets/info.png')
                                    : require('../Assets/info1.png')
                            }
                        />

                        <Text
                            style={{
                                color: isSelect == '5' ? Colors.White : Colors.Black,
                                fontSize: 20,
                                paddingLeft: 10,
                                fontWeight: 'bold',
                            }}>
                            {'How Revizify works'}
                        </Text>
                    </TouchableOpacity>
                    {/* ***************************** Contact us ***************************** */}
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            marginBottom: 5,
                            height: 35,
                            minWidth: 50,
                            alignItems: 'center',
                            paddingLeft: 35,
                            backgroundColor:
                                isSelect == '6' ? Colors.mainColor : 'transparent',
                        }}
                        onPress={() => { isSelect = '6';
                        this.props.navigation.closeDrawer();
                            this.props.navigation.navigate('Contact'); }}>
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                            }}
                            source={
                                isSelect == '6'
                                    ? require('../Assets/contact.png')
                                    : require('../Assets/contact1.png')
                            }
                        />

                        <Text
                            style={{
                                color: isSelect == '6' ? Colors.White : Colors.Black,
                                fontSize: 20,
                                paddingLeft: 10,
                                fontWeight: 'bold',
                            }}>
                            {'Contact us'}
                        </Text>
                    </TouchableOpacity>

                    {/* ***************************** Change Password ***************************** */}
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            // marginTop: 5,
                            marginBottom: 5,
                            height: 35,
                            minWidth: 50,
                            alignItems: 'center',
                            paddingLeft: 35,
                            backgroundColor:
                                isSelect == '7' ? Colors.mainColor : 'transparent',
                            // borderBottomWidth:1
                        }}
                        onPress={() => {
                            isSelect = '7';
                            this.props.navigation.closeDrawer();
                            this.props.navigation.navigate('ChangePassword');
                        }}>
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                                tintColor: isSelect == '7' ? Colors.White : Colors.Black,
                            }}
                            source={
                                require('../Assets/privacy.png')
                            }
                        />

                        <Text
                            style={{
                                color: isSelect == '7' ? Colors.White : Colors.Black,
                                fontSize: 20,
                                paddingLeft: 10,
                                fontWeight: 'bold',
                            }}>
                            {'Change Password'}
                        </Text>
                    </TouchableOpacity>
                    {/* ***************************** Tearm and Condition ***************************** */}
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            marginTop: 5,
                            marginBottom: 5,
                            height: 35,
                            minWidth: 50,
                            alignItems: 'center',
                            paddingLeft: 35,
                            backgroundColor:
                                isSelect == '10' ? Colors.mainColor : 'transparent',
                        }}
                        onPress={() => {
                            isSelect = '10';
                            this.props.navigation.closeDrawer();
                            this.props.navigation.navigate('Terms',{isLogin: true});
                        }}>
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                                tintColor: isSelect == '10' ? 'white' : 'black'

                            }}
                            source={
                                isSelect == '10'
                                    ? require('../Assets/termsconditions.png')
                                    : require('../Assets/termsconditions.png')
                            }
                        />

                        <Text
                            style={{
                                color: isSelect == '10' ? Colors.White : Colors.Black,
                                fontSize: 20,
                                paddingLeft: 10,
                                fontWeight: 'bold',
                            }}>
                            {'T & C'}
                        </Text>
                    </TouchableOpacity>

                    {/* ***************************** Private Policy ***************************** */}
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            marginTop: 5,
                            marginBottom: 5,
                            height: 35,
                            minWidth: 50,
                            alignItems: 'center',
                            paddingLeft: 35,
                            backgroundColor:
                                isSelect == '30' ? Colors.mainColor : 'transparent',
                        }}
                        onPress={() => {
                            isSelect = '30';
                            this.props.navigation.closeDrawer();
                            this.props.navigation.navigate('PrivatePolicy',{isLogin: true});
                        }}>
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                                tintColor: isSelect == '30' ? 'white' : 'black',

                            }}
                            source={
                                isSelect == '30'
                                    ? require('../Assets/lock.png')
                                    : require('../Assets/lock.png')
                            }
                        />

                        <Text
                            style={{
                                color: isSelect == '30' ? Colors.White : Colors.Black,
                                fontSize: 20,
                                paddingLeft: 10,
                                fontWeight: 'bold',
                            }}>
                            {'Privacy Policy'}
                        </Text>
                    </TouchableOpacity>
                    {/* ***************************** Logout ***************************** */}
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            // marginTop: 5,
                            marginBottom: 5,
                            height: 35,
                            minWidth: 50,
                            alignItems: 'center',
                            paddingLeft: 35,
                            backgroundColor:
                                isSelect == '8' ? Colors.mainColor : 'transparent',
                            // borderBottomWidth:1
                        }}
                        onPress={() => {
                            isSelect = '8';
                            this.logoutBtn();
                        }}>
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                            }}
                            source={
                                isSelect == '8'
                                    ? require('../Assets/logout.jpg')
                                    : require('../Assets/logout1.png')
                            }
                        />

                        <Text
                            style={{
                                color: isSelect == '8' ? Colors.White : Colors.Black,
                                fontSize: 20,
                                paddingLeft: 10,
                                fontWeight: 'bold',
                            }}>
                            {'Logout'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animated={true}
                    animationType={'fade'}
                    transparent={true}
                    visible={this.state.isLoading}>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {this.state.isLoading ? (
                            <ActivityIndicator size="large" color="#ffffff" />
                        ) : null}
                    </View>
                </Modal>


            </View>
        );
    }
}
