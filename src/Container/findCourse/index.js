/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  ActivityIndicator,
  Image,
  Keyboard,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import CustomExamview from '../../Component/CustomExamview';
import CustomHeader from '../../Component/CustomHeader';
import {internetcheck} from '../../Constants/InternetCheck';
import {updateData} from '../../Navigation/Drawer';
import {allCourseApi} from '../../Redux/ReduxAPIHandler/CourseApi';
import Images from '../../Resources/Images';
import {style} from './style';

// let isSearch = false;
// export const openSearch = async () => {
//     isSearch = true;
// };
export default class FindCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: true,
      isCourse: true,
      isEmpty: false,
      data: {},
      coursesAll: [],
      all_courses: [],
      my_courses: [],
      coursesMy: [],
      isLoading: false,
      isInternet: true,
      allCourseErr: false,
      myCourseErr: false,
      isSearch: false,
    };
    this.myRef = React.createRef();
    this.inputRef = React.createRef();
    this.current = true;
  }

  componentDidMount = () => {
this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
    this.props.navigation.addListener('blur', (event) => {
      this.current = false;
      // this.setState({ ...this.state, coursesAll: [], searchText: '', isEmpty: false });
    });
    this.props.navigation.addListener('focus', (event) => {
      this.current = true;
      // this.getAllApi();
      internetcheck().then((res) => {
        console.log('internet check', res);
        this.setState({ isInternet: res, isLoading: false });
      }).catch((error) => {
        this.setState({ isInternet: error });

        // Toast.show('Internet not Working');
      });


    });
    
    AsyncStorage.getItem('loginData')
      .then((res) => {
        this.setState({ ...this.state, data: JSON.parse(res) });
        this.getAllApi();
      })
      .catch((error) => {
        console.log('LoginData>>>', JSON.stringify(error));
        this.setState({ ...this.state, isLoading: false });
      });

  }

componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  keyboardDidHide = () => {
    if(this.current){

    
    if (this.inputRef.current.isFocused) {
      this.inputRef.current.blur();
      return true;
    }
    return false;
    }
  };

  getAllApi = () => {
    this.setState({ ...this.state, isLoading: true });
    this.getAllCourse();
  }




  getAllCourse = async () => {
    try {
      let getAllData = await allCourseApi({ token: this.state.data.jwt });
      this.setState({ ...this.state, all_courses: getAllData.response.courses, isLoading: false, allCourseErr: false });
    }
    catch (error) {
      console.log('error>>>', error);
      // Toast.show('err>>>>  '+JSON.stringify(error));
      this.setState({ ...this.state, isLoading: false, allCourseErr: true });
    }
  }







  componentDidUpdate(prevProps, prevState) {
    if (prevState.isSelected !== this.state.isSelected) {
    }
  }

  searchData = (text) => {

    this.setState({ searchText: text, coursesAll: [], isEmpty: false });
    if (text.length >= 1) {
      // alert('here')
      let data = this.state.all_courses.filter((item) => {
        if (item.course_name.toLowerCase().match(text.toLowerCase()) || item.name.toLowerCase().match(text.toLowerCase()) || item.domain_sector.toLowerCase().match(text.toLowerCase())) { return item; }
      });
     

      if (data == undefined || data.length == 0) {
        this.setState({ ...this.state, searchText: text, isEmpty: true });
      }
      else {
        data.sort(function (a, b) {
          return a.average_rating - b.average_rating;
        });
        this.setState({ ...this.state, searchText: text, coursesAll: data, isEmpty: false });
      }

    }
  }
  closeSearch = () => {
    this.setState({ ...this.state, coursesAll: [], searchText: '', isEmpty: false });

  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.emptyTopVw} />
        {/* ******************* Header ******************* */}
        {this.state.isInternet ?
          <View style={style.container}>
            <CustomHeader
              title={'Find Courses'}
              image={Images.menuIcon}
              leftBtn={() => this.props.navigation.openDrawer()}
              searchItem={() => { }}
            />
            <View style={style.searchVW}>
              <View style={style.searchInputVW}>
                <Image style={[style.searchImg, { marginLeft: 10 }]} source={require('../allCard/Assets/searchIcon.png')} />
                <TextInput
                  onChangeText={(text) => this.searchData(text)}
                  value={this.state.searchText}
                  style={style.searchInout}
                  ref={this.inputRef}
                  placeholder={'Find a new Course'} />
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => { this.closeSearch(); }}>
                  <Image style={[style.searchImg]} source={Images.cencel} />
                </TouchableOpacity>
              </View>
            </View>
            {this.state.isEmpty ? <View style={style.isEmptyView}>
              <Text style={style.noTx}>No course found </Text>
            </View> : <ScrollView style={{ flex: 1 }}>
              {this.state.coursesAll.map((item, index) => (
                <CustomExamview
                  item={item}
                  isLine={
                    this.state.coursesAll.length === index + 1 ? false : true
                  }
                  isAll={true}
                  isFind={true}
                  key={index}
                  courseData={() => {
                    updateData('1')
                    item.purchase == 'true' ? this.props.navigation.navigate('CourseDetails', { id: item.course_id, type: 'free', purchase: item.purchase, isOpen: true, isdownload: false, isCreated: true }) :
                      this.props.navigation.navigate('CourseDetails', { id: item.course_id, type: 'free', purchase: item.purchase, isOpen: true,isdownload: true, isCreated: true });
                  }
                  }
                />
              )).reverse()}
            </ScrollView>}


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
          </View> : <Text>{'Internet not working'}</Text>}
      </View>
    );
  }
}
