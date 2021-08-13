/* eslint-disable radix */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';

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

import AsyncStorage from '@react-native-community/async-storage';

import CustomChaptersview from '../../Component/CustomChaptersview';
import api from '../../Resources/APIs';
import Images from '../../Resources/Images';
import {style} from './style';

const axios = require('axios');
export default class CreateChapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      chapterData: [
        {
          chapterName: 'Numbers',
          revision: '0',
        },
        {
          chapterName: 'Integers',
          revision: '0',
        },
      ],
      courseData: {},
      chapters: [],
      courseImage: '',
      courseName: '',
      username: '',
      isLoading: false,
    };
    this.currentScreen = true;
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount = () => {
    this.props.navigation.addListener('blur', (event) => {
      this.currentScreen = false;
    });
    this.props.navigation.addListener('focus', (event) => {
      console.log(
        'this.props.route.params.isCreated>>>> ',
        this.props.route.params,
      );
      console.log('this.props.route.params.isCreated12345>>>> ', this.props);
      this.currentScreen = true;
      this.getuser();
      // this.setState({isLoading: false});
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBackButtonClick,
      );
      console.log(
        'this.props.route.params.isCreated>>>> ',
        this.props.route.params,
      );
    });
    this.getuser();

    this.setState({...this.state, isLoading: true});
  };
  handleBackButtonClick() {
    if (this.currentScreen) {
      console.log(
        'this.props.route.params.isCreated',
        this.props.route.params.isCreated,
      );
      if (this.props.route.params.isCreated) {
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
        this.setState({...this.state, data: JSON.parse(res)});
        this.getChapter();
      })
      .catch((error) => {
        console.log('LoginData>>>', JSON.stringify(error));
      });
  };

  getChapter = () => {
    axios
      .post(
        api.GET_CHAPTER,
        {course_id: this.props.route.params.item},
        {
          headers: {
            Authorization: 'Bearer ' + this.state.data.jwt,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
      .then((res) => {
        var chapters = res.data.response.chapters;
        chapters.sort(function (a, b) {
          return a.chapter_id - b.chapter_id;
        });
        this.setState({
          ...this.state,
          chapters: chapters,
          username: res.data.response.user_name,
          courseImage: res.data.response.course_image,
          courseName: res.data.response.course_name,
          courseData: res.data.response,
          isLoading: false,
        });
        console.log('courseData>>>', res.data.response);
      })
      .catch((error) => {
        console.log('courseDataerror>>', error);
        this.setState({...this.state, isLoading: false});
      });
  };
  sumNumber = () => {
    let sum = 0;
    if (this.state.chapters.length == 0) {
      return 0;
    } else {
      for (let i = 0; i < this.state.chapters.length; i++) {
        sum = sum + Number(this.state.chapters[i].chapter_percentage);
      }
      console.log(sum);
      return sum / this.state.chapters.length;
    }
  };

  render() {
    const nCard =
      this.state.courseData.deck_cards == undefined
        ? '0'
        : this.state.courseData.deck_cards;
    const totCard =
      this.state.courseData.total_cards == undefined ||
      this.state.courseData.total_cards == ''
        ? '0'
        : this.state.courseData.total_cards;
    let total = this.sumNumber();

    const totalPurchases =
      this.state.courseData.total_purchases === undefined
        ? '0'
        : this.state.courseData.total_purchases;
    const rating =
      this.state.courseData.average_rating === undefined
        ? '0'
        : this.state.courseData.average_rating;
    return (
      <View style={style.container}>
        <View style={style.emptyTopVw} />
        {/* ******************* Header ******************* */}
        <View style={style.mainVw}>
          <TouchableOpacity
            style={style.menuImgVw}
            onPress={() =>
              this.props.route.params.isCreated
                ? this.props.navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                  })
                : this.props.route.params.isCreated == undefined
                ? this.props.navigation.goBack()
                : this.props.navigation.goBack()
            }>
            <Image source={Images.leftArrow} style={style.menuImg} />
          </TouchableOpacity>
          <View style={style.courseImgVw}>
            <Image
              source={
                this.state.courseImage == ''
                  ? Images.neet
                  : {uri: this.state.courseImage}
              }
              style={style.courseImg1}
            />
          </View>
          <Text style={style.headerNameTx} numberOfLines={2}>
            {this.state.courseName == undefined ? '' : this.state.courseName}
          </Text>
          <Text style={style.newCardTx}>
            {'New cards' + '\n' + nCard + '/' + totCard}
          </Text>
        </View>
        <Text style={style.byTx} numberOfLines={1}>
          {'by ' + this.state.username}
        </Text>
        <View style={style.cardVw}>
          <Text style={style.cardTx}>
            {'Total downloads : ' + totalPurchases}
          </Text>
          <View>
            <AirbnbRating
              count={5}
              starStyle={{marginLeft: 3}}
              defaultRating={rating}
              size={20}
              showRating={false}
              isDisabled={true}
            />
          </View>
        </View>

        <View style={style.infoVW}>
          <Text style={style.infoTx}>Information</Text>
          <Text style={style.infoTx}>
            {'Revision: ' + parseInt(total) + '%'}
          </Text>
        </View>

        {/* ******************* Chapters View  *******************   */}
        <View
          style={{
            marginBottom: '5%',
            marginLeft: '5%',
            marginTop: '3%',
          }}>
          <Text style={style.chaptersTx}>{'Chapters'}</Text>
          <View style={[style.emptyVw, {width: '21%'}]} />
        </View>

        <ScrollView style={{flex: 1}}>
          {this.state.chapters == undefined || this.state.chapters.length == 0
            ? null
            : this.state.chapters.map((item, index) => (
                <CustomChaptersview
                  viewChapter={() =>
                    this.props.navigation.navigate('ChapterDetails', {
                      item: item,
                      dataAdd: true,
                    })
                  }
                  number={index + 1}
                  onEdit={() =>
                    this.props.navigation.navigate('EditChapter', item)
                  }
                  isEdit={true}
                  isdown={false}
                  title={item.chapter_name}
                  revision={
                    item.chapter_percentage == undefined
                      ? 0
                      : parseInt(item.chapter_percentage)
                  }
                  des={item.chapter_description}
                />
              ))}
        </ScrollView>

        {/* ******************* Floating button  *******************   */}
        <TouchableOpacity
          style={style.floatBtn}
          onPress={() =>
            this.props.navigation.navigate(
              'AddChapter',
              this.props.route.params.item,
            )
          }>
          <Text style={[style.txCourse]}>+ Add new chapter</Text>
        </TouchableOpacity>
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
