/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import CustomExamview from '../../Component/CustomExamview';
import {internetcheck} from '../../Constants/InternetCheck';
import {updateData} from '../../Navigation/Drawer';
import {exploreCourseApi} from '../../Redux/ReduxAPIHandler/CourseApi';
import Images from '../../Resources/Images';
import {style} from './style';

// let isSearch = false;
// export const openSearch = async () => {
//     isSearch = true;
// };

export default class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: 1,
      isCourse: true,
      data: {},
      coursesAll: [],
      all_courses: [],
      my_courses: [],
      coursesMy: [],
      isLoading: false,
      isInternet: true,
      allCourseErr: false,
      myCourseErr: false,
      isSearch: 'false',
      exploreData: [],
      explore_Data: [],
      searchText: '',
    };
    this.myRef = React.createRef();
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.current = true;
  }


  // handleBackButtonClick() {

  //     if (this.current){
  // Alert.alert(
  //             'Do you want to exit app?',
  //             '',
  //             [
  //                 {
  //                     text: 'NO',
  //                     onPress: () => { },
  //                 },
  //                 {
  //                     text: 'YES',
  //                     onPress: () => BackHandler.exitApp(),
  //                     style: 'destructive',
  //                 },
  //             ],
  //             { cancelable: false },
  //         );
  //     }
  //     else {
  //        this.props.navigation.goBack();
  //     }

  //     return true;
  // }
  componentDidMount = () => {
    this.getData();
    this.props.nav.addListener('blur', (event) => {
      this.current = false;
    });
    this.props.nav.addListener('focus', (event) => {
      this.current = true;
      internetcheck().then((res) => {
        this.getData();
        this.setState({ isInternet: res, isLoading: false });
      }).catch((error) => {
        this.setState({ isInternet: error });
      });
      //   // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);



    });
    

  }

  getData = () => {
    AsyncStorage.getItem('loginData')
      .then((res) => {
        this.setState({ ...this.state, data: JSON.parse(res) });
        //  console.log('>>>>>>',JSON.parse(res));
        this.getAllApi();
      })
      .catch((error) => {
        console.log('LoginDataError>>>', JSON.stringify(error));
        this.setState({ ...this.state, isLoading: false });
      });
  }
  componentWillReceiveProps = () => {
    this.getAllApi();
    this.dataCheck();
    if (this.props.route.params != undefined) {
      if (this.props.route.params.isSearch) {
        this.setState({ ...this.state, isSearch: true });
      }
    }
  }



  getAllApi = () => {
    this.setState({ ...this.state, isLoading: false });
    this.getExploreCourse();
  }

  getExploreCourse = async () => {
    try {
      let getExploreData = await exploreCourseApi({ token: this.state.data.jwt });
//  console.log('data>>>', getExploreData.response.courses);
      this.props.dataItem(getExploreData.response.courses);
      this.setState({ ...this.state, exploreData: getExploreData.response.courses, explore_Data: getExploreData.response.courses, isLoading: false, allCourseErr: false });
    }
    catch (error) {
      console.log('error>>>', error);
    }
  }





  componentDidUpdate(prevProps, prevState) {
    if (prevState.isSelected !== this.state.isSelected) {
    }
  }

 


  dataCheck = () => {
    console.log('herre');
    AsyncStorage.getItem('isSearch').then((res) => {
      if (this.state.isSearch != res) {
        this.setState({ isSearch: res });

      }
    });
  }
  find = () => {
        updateData('2');
        this.props.find();
    }

  render() {
    const width1 = Dimensions.get('window').width;

    return (
      <View style={style.container}>
        {/* ******************* Header ******************* */}
        {this.state.isInternet ?
          <View style={style.container}>


            <View style={{padding:10}}/>
            <View style={{ width: width1 }}>
              {this.props.exploreDataData == 0 ? <View style={style.isEmptyView} /> :
                <ScrollView>
                  {this.props.exploreDataData.map((item, index) => (
                    <CustomExamview
                      item={item}
                      isLine={
                        this.props.exploreDataData.length === index + 1 ? false : true
                      }
                      isAll={false}
                      isEdit={false}
                      isDelete={false}
                      isFind={true}
                      key={index}
                      courseData={() => {
                        item.course_type == 'paid' ? this.props.MoveNext({ id: item.course_id, type: 'paid', purchase: item.purchase, isOpen: true, isExplore: true })

                          :
                          this.props.MoveNext({ id: item.course_id, type: 'free', purchase: item.purchase, isOpen: true, isExplore: true });
                      }
                      }
                    />
                  )).reverse()}
                  <View style={{ padding: 30 }} />
                </ScrollView>}
            </View>
<TouchableOpacity
                            style={style.floatBtn}
                            onPress={() => {
                                this.find();
                            }}>
                            <Image style={style.seImg} source={Images.searchIcon} />
                            <Text style={[style.txCourse]}>{'Find'}</Text>
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
          </View> : <Text>{'Internet not working'}</Text>}
      </View>
    );
  }
}
