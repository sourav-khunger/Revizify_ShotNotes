/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
import React from 'react';

import {Buffer} from 'buffer';
import {
  ActivityIndicator,
  BackHandler,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-simple-toast';

import AsyncStorage from '@react-native-community/async-storage';

import CustomChaptersview from '../../Component/CustomChaptersview';
import {updateData} from '../../Navigation/Drawer';
import {chapterApi} from '../../Redux/ReduxAPIHandler/ChapterApi';
import {paymentCourseApi} from '../../Redux/ReduxAPIHandler/CourseApi';
import Colors from '../../Resources/Colors';
import Images from '../../Resources/Images';
import {style} from './style';

const axios = require('axios');
const username = 'rzp_test_ukJUrbGQv7Qn6m';
const password = 'OP43GPOaevO7Apmk4waBY6CK';

const token = Buffer(`${username}:${password}`).toString('base64');
export default class CourseDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: true,
      isCourse: true,
      data: {},
      courseData: {},
      isLoading: false,
      isPayment: false,
      itemData: {},
      isfree: false,

    };
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.currentScreen = true;
  }

  componentDidMount = () => {
    console.log('data>>>', JSON.stringify(this.props));
    this.props.navigation.addListener('blur', (event) => {
      this.currentScreen = false;
    });
    this.props.navigation.addListener('focus', (event) => {
      this.currentScreen = true;
      this.getuser();
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBackButtonClick,
      );
      // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    });
    this.getuser();

    this.setState({ ...this.state, isLoading: true });

  }

   handleBackButtonClick() {
    if (this.currentScreen) {
      if (this.props.route.params.isCreated == undefined ? true : this.props.route.params.isCreated) {
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else {
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }
    }
  }


  getuser = () => {
    AsyncStorage.getItem('loginData')
      .then((res) => {
        this.setState({ ...this.state, data: JSON.parse(res) });
        this.getChapter();
      })
      .catch((error) => {
        console.log('LoginData>>>', JSON.stringify(error));
        this.setState({ ...this.state, isLoading: false });
      });
  }
  getChapter = async () => {
    try {


      let courseData = await chapterApi({ token: this.state.data.jwt, id: this.props.route.params.id });
        console.log('response>>', courseData);
        var chapters = courseData.chapters;
        chapters.sort(function (a, b) {
          return a.chapter_id - b.chapter_id;
        });
      this.setState({ ...this.state, courseData: courseData, chaptersData: chapters });
      this.setState({ ...this.state, isLoading: false });
    }
    catch (error) {
      Toast.show(error);
      console.log('error>>', error);
      this.setState({ ...this.state, isLoading: false });
    }
  }



  payAmount = () => {
    console.log('price', this.state.courseData.course_price);
    try {
      this.setState({ ...this.setState, isLoading: true });
      axios.post('https://api.razorpay.com/v1/orders', {
        amount: this.state.courseData.course_price + '00',
        currency: 'INR',
        receipt: 'rcptid_11',
      }, {
        'headers': {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then((res) => {
        this.setState({ ...this.setState, isLoading: false });
        this.pay({ orderId: res.data.id });
      }).catch((error) => {
        this.setState({ ...this.setState, isLoading: false });
        console.log('error123>>>>', error);
      });
    }
    catch (error) {
      this.setState({ ...this.setState, isLoading: false });
      console.log('error564>>>>', error);
    }



  }
  pay = (data) => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://ibb.co/vP0p0Z1',
      currency: 'INR',
      key: username,
      amount: this.state.courseData.course_price + '00',
      name: 'Revizify',
      order_id: data.orderId,
      prefill: {
        email: this.state.data.email,
        contact: this.state.data.phone_number,
        name: this.state.data.name,
      },
      theme: { color: '#53a20e' },
    };
    try {


      RazorpayCheckout.open(options).then((res) => {
        console.log('res>>>>', res);
        this.savePayment(res.razorpay_payment_id);
      }).catch((error) => {
        // handle failure
        console.log('error>>>>', error);
        console.log(`Error: ${error.code} | ${error.description}`);
      });
    }
    catch (error) {
      console.log('error>>>>', error);
    }
  }

  savePayment = async (data) => {
    try {
      let paymentCourse = await paymentCourseApi({ token: this.state.data.jwt, course_id: this.props.route.params.id, paymentId: data });
      updateData();
      this.props.navigation.navigate('HomeStack');
    }
    catch (error) {
      console.log('error>>>>', error);
    }


  }


  checkPayment = (item) => {
    if (this.props.route.params.type == 'paid') {
      if (item.index != -1) {
        if (this.state.courseData.purchase === 'false') {
          // this.setState({ ...this.state, isPayment: true, itemData: item.item });
          this.setState({ ...this.state, isfree: true });
        }
        else {

          if (this.props.route.params.isOpen) {
            this.props.navigation.navigate('AllCard', { item: item.item, editCard: false, isOpen: true });
          }
          else {

            this.props.navigation.navigate('ChapterDetails', {
              item: item.item,
              dataAdd: false,
            });
          }

        }
      }
      else {
        if (this.props.route.params.isOpen) {
          this.props.navigation.navigate('AllCard', { item: item.item, editCard: false, isOpen: true });

        }
        else {
          this.props.navigation.navigate('ChapterDetails', {
            item: item.item,
            dataAdd: false,
          });
        }

      }

    }
    else {
      if (item.index != -1) {
        if (this.props.route.params.isOpen) {
          if(this.props.route.params.isdownload){
              this.setState({ ...this.state, isfree: true });
          }
          else {
            this.props.navigation.navigate('AllCard', { item: item.item, editCard: false, isOpen: true });
          }
          
        }
        else {

          this.props.navigation.navigate('ChapterDetails', {
            item: item.item,
            dataAdd: false,
          });
        }

      }
      else {
        if (this.props.route.params.isOpen) {
          // this.props.navigation.navigate('AllCard', { item: item.item, editCard: false, isOpen: true });
          if(this.props.route.params.isdownload){
              this.setState({ ...this.state, isfree: true });
          }
          else {
            this.props.navigation.navigate('AllCard', { item: item.item, editCard: false, isOpen: true });
          }
        }
        else {
          this.props.navigation.navigate('ChapterDetails', {
            item: item.item,
            dataAdd: false,

          });
        }
      }
    }

  }


  download = async () => {
    try {
      let paymentCourse = await paymentCourseApi({ token: this.state.data.jwt, course_id: this.props.route.params.id, paymentId: 'free' });
      this.setState({ ...this.state, isfree: false });
      updateData();
      Toast.show('Please visit the ‘Downloads’ section to study this course.');
      this.props.navigation.navigate('HomeStack');
    }
    catch (error) {
      console.log('error>>>>', error);
    }

  }
  sumNumber = () => {
    let sum = 0;
    let data = this.state.chaptersData == undefined || this.state.chaptersData.length == 0 ? [] : this.state.chaptersData;
    for (let i = 0; i < data.length; i++) {
      sum = sum + Number(data[i].chapter_percentage);
    }

    return sum / data.length;
  }

  render() {
    const nCard = this.state.courseData.deck_cards == undefined ? '0' : this.state.courseData.deck_cards;
    const totCard = this.state.courseData.total_cards == undefined || this.state.courseData.total_cards == '' ? '0' : this.state.courseData.total_cards;
    const total = this.sumNumber();
    const totalPurchases = this.state.courseData.total_purchases === undefined || this.state.courseData.total_purchases == ''
      ? '0'
      : this.state.courseData.total_purchases;
    const rating = this.state.courseData.average_rating === undefined || this.state.courseData.average_rating == ''
      ? 0
      : this.state.courseData.average_rating;
    return (
      <View style={style.container}>
        <View style={style.emptyTopVw} />

        {/* ******************* Header ******************* */}
        <View style={style.mainVw}>
          <TouchableOpacity
            style={style.menuImgVw}
            onPress={() => this.props.route.params.isCreated == undefined
                ? this.props.navigation.goBack()
                
                : this.props.route.params.isCreated
                ? this.props.navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                  })
                : this.props.navigation.goBack()
            }>
            <Image source={Images.leftArrow} style={style.menuImg} />
          </TouchableOpacity>
          <TouchableOpacity style={style.courseImgVw} onPress={() => this.props.navigation.navigate('GetCourseFeedback', { id: this.state.courseData.id, token: this.state.data.jwt, 'courseId': this.props.route.params.id })}>
            <Image source={this.state.courseData.course_image == undefined ? Images.neet : { uri: this.state.courseData.course_image }} style={style.courseImg1} />
          </TouchableOpacity>
          <Text style={style.headerNameTx} onPress={() => this.props.navigation.navigate('GetCourseFeedback', { id: this.state.courseData.id, token: this.state.data.jwt, 'courseId': this.props.route.params.id })} numberOfLines={2}>
            {this.state.courseData.course_name}
          </Text>
          <Text style={style.newCardTx}>
            {'New cards' +
              '\n' +
              nCard +
              '/' +
              totCard}
          </Text>
        </View>
        <Text style={style.byTx} onPress={() => this.props.navigation.navigate('GetProfile', { id: this.state.courseData.id, token: this.state.data.jwt })} numberOfLines={1}>{this.state.courseData.user_name == undefined ? 'by XYZ' : 'by ' + this.state.courseData.user_name}</Text>
        <View style={style.cardVw}>
          <Text style={style.cardTx}>
            {'Total downloads : ' + totalPurchases}
          </Text>
          <View style={{}}>
            <AirbnbRating
              count={5}
              starStyle={{ marginLeft: 3 }}
              defaultRating={rating}
              size={20}
              showRating={false}
              isDisabled={true}

            />
          </View>
        </View>

        <View style={style.infoVW}>
          <Text style={style.infoTx}>Information</Text>
          {console.log(total)}
          <Text style={style.infoTx}>{'Revision: ' + (total.toString() == "NaN" ? 0 : parseInt(total)) + '%'}</Text>
        </View>

        {/* ******************* Chapters View  *******************   */}
        <View style={style.chapterVw}>
          <Text  style={style.chaptersTx}>{'Chapters'}</Text>
          {/* <View style={style.emptyVw} /> */}
          {
            this.props.route.params.isdownload ? <TouchableOpacity style={style.editBtn} onPress={() => {
            this.props.route.params.isdownload ?
            this.checkPayment({ item: '', index: 0 }) : {}
            }}>
                                <Image style={style.editImg} source={Images.download} />
                            </TouchableOpacity> : null
          }
          

        </View>
        <ScrollView style={{ flex: 1 }}>
          {this.state.chaptersData == undefined || this.state.chaptersData.length == 0 ? null : this.state.chaptersData.map((item, index) => (
            <CustomChaptersview
              viewChapter={() => {
                this.checkPayment({ item: item, index: index });
              }
              }
              // isEdit={this.props.route.params.isdownload}
              // isdown={this.props.route.params.isdownload}
              // onEdit={()=>{this.checkPayment({ item: item, index: index });}}
              number={index + 1}
              title={item.chapter_name}
              revision={item.chapter_percentage == undefined ? 0 : parseInt(item.chapter_percentage)}
              des={item.chapter_description}

            />
          ))}
        </ScrollView>
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
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isPayment}>
          <View style={style.popupView}>
            <View style={style.vwPopup}>
              <Text style={style.titlePopupTx}>{'This is premium course. You can pay and view all chapters.'}</Text>
              <Text style={style.ammoutTx}>{'Amount: ' + this.state.courseData.course_price + ' RS'}</Text>
              <View style={style.btnVw}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ ...this.state, isPayment: false });
                    this.payAmount();
                  }} style={[style.buyBtn, { marginLeft: '10%', backgroundColor: Colors.mainColor }]}>
                  <Text>BUY NOW</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ ...this.state, isPayment: false })} style={[style.buyBtn, { marginRight: '10%' }]}>
                  <Text>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isfree}>
          <View style={style.popupView}>
            <View style={style.vwPopup}>
              <Text style={style.titlePopupTx}>{'Do you want to download this course?'}</Text>
              <View style={style.btnVw}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ ...this.state, isPayment: false });
                    this.download();
                  }} style={[style.buyBtn, { marginLeft: '10%', backgroundColor: Colors.mainColor }]}>
                  <Text>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ ...this.state, isfree: false })} style={[style.buyBtn, { marginRight: '10%' }]}>
                  <Text>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
