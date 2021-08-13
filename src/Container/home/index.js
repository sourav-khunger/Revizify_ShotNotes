/* eslint-disable no-alert */
/* eslint-disable no-lone-blocks */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  Modal,
  Text,
  View,
} from 'react-native';
import {
  SceneMap,
  TabBar,
  TabView,
} from 'react-native-tab-view';

import AsyncStorage from '@react-native-community/async-storage';

import CustomHeader from '../../Component/CustomHeader';
import {internetcheck} from '../../Constants/InternetCheck';
import {updateData} from '../../Navigation/Drawer';
import {
  deleteCourseApi,
  exploreCourseApi,
  myCourseApi,
  purchasedCourseApi,
} from '../../Redux/ReduxAPIHandler/CourseApi';
import Colors from '../../Resources/Colors';
import Images from '../../Resources/Images';
import AllCourses from '../allCourses';
import Explore from '../Explore';
import MyCourses from '../myCourses';
import {style} from './style';

// let isSearch = false;
// export const openSearch = async () => {
//     isSearch = true;
// };
var dataExplore = [];
const width1 = Dimensions.get('window').width;
export default class Home extends React.Component {
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
      isSearch: false,
      exploreData: [],
      searchText: '',
      index: 0,
      routes: [
        { key: 'first', title: 'Create' },
        { key: 'second', title: 'Download' },
        { key: 'third', title: 'Explore' },
      ],
      alC: 0,
      exC: 0,
      myC: 0,
    };
    this.myRef = React.createRef();
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.currentNew = true;
  }

  handleBackButtonClick() {
    if (this.currentNew) {
      Alert.alert(
        'Do you want to exit app?',
        '',
        [
          {
            text: 'NO',
            onPress: () => { },
          },
          {
            text: 'YES',
            onPress: () => BackHandler.exitApp(),
            style: 'destructive',
          },
        ],
        { cancelable: false },
      );
    } else {
      this.props.navigation.goBack();
    }

    return true;
  }
  componentDidMount = () => {
    
    this.props.navigation.addListener('blur', (event) => {
      this.currentNew = false;
    });
    this.props.navigation.addListener('focus', (event) => {
      this.setState({ ...this.state, alC: 0, myC: 0, exC: 0 })
      this.currentNew = true;
      this.getuserResponse();
      internetcheck()
        .then((res) => {
          this.setState({ isInternet: res });
        })
        .catch((error) => {
          this.setState({ isInternet: error });
        });


      BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBackButtonClick,
      );
    });


    this.getuserResponse()
  };

  getuserResponse = () => {
    AsyncStorage.getItem('loginData')
      .then((res) => {
        this.setState({ ...this.state, data: JSON.parse(res) });
        this.getAll()
      })
      .catch((error) => {
        console.log('LoginDataError>>>', JSON.stringify(error));
        this.setState({ ...this.state, isLoading: false });
      });
  }
  getAll = () => {
    this.getAllApi();
  }
  componentWillReceiveProps = () => {
    this.dataCheck();
    if (this.props.route.params != undefined) {
      if (this.props.route.params.isSearch) {
        this.setState({ ...this.state, isSearch: true });
      }
    }
  };
  dataCheck = () => {
    console.log('herre');
    AsyncStorage.getItem('isSearch').then((res) => {
      if (this.state.isSearch != res) {
        this.setState({ isSearch: res });
      }
    });
  };

  getAllApi = () => {
    // this.setState({...this.state, isLoading: false});
    this.setState({ ...this.state, isLoading: true });
    this.getAllCourse();
    this.getMyCourse();
    this.getExploreCourse();
  };

  getExploreCourse = async () => {
    try {
      let getExploreData = await exploreCourseApi({ token: this.state.data.jwt });
      dataExplore = getExploreData.response.courses;
      this.setState({
        ...this.state,
        exploreData:
          getExploreData.response.courses == undefined
            ? []
            : getExploreData.response.courses,
        allCourseErr: false,
        exC: 1,
      });
      this.sameLoading();
        console.log('error>>>', JSON.stringify(getExploreData));
    } catch (error) {
      this.setState({ ...this.state, exC: 1 });
      console.log('error>>>', error);
      this.sameLoading();
    }
  };

  getAllCourse = async () => {
    try {
      let getAllData = await purchasedCourseApi({ token: this.state.data.jwt });
      this.setState({
        ...this.state,
        coursesAll: getAllData.response.courses,
        all_courses: getAllData.response.courses,
        allCourseErr: false,
        alC: 1,
      });
      // console.log('error>>>', JSON.stringify(getAllData));
      this.sameLoading();
    } catch (error) {
      console.log('error>>>', error);
      this.setState({ ...this.state, allCourseErr: true, alC: 1 });
      this.sameLoading();
    }
  };

  getMyCourse = async () => {
    try {
      let getMyData = await myCourseApi({ token: this.state.data.jwt });
      this.setState({
        ...this.setState,
        coursesMy: getMyData.response.courses == undefined ? [] : getMyData.response.courses,
        my_courses: getMyData.response.courses == undefined ? [] : getMyData.response.courses,
        allCourseErr: false,
        myC: 1,
      });
      this.sameLoading();
    } catch (error) {
      console.log('error>>>', error);
      this.setState({ ...this.state, myCourseErr: true, myC: 1 });
      this.sameLoading();
    }
  };

  sameLoading = () => {
    if (this.state.alC === 1) {
      if (this.state.myC === 1) {
        if (this.state.exC === 1) {
          {
            setTimeout(() => {
              this.setState({ ...this.state, isLoading: false });
            });
          }
        }
      }
    }
  };

  find = () => {
    updateData('2');
    this.props.navigation.navigate('FindCourse');
  };

  ThirdRoute = () => {
    return (
      <Explore
        find={() => this.props.navigation.navigate('FindCourse')}
        nav={this.props.navigation}
        MoveNext={(data) =>
        { data.purchase == undefined ?
          this.props.navigation.navigate('CourseDetails', {
            id: data.id,
            type: data.type,
            purchase: data.purchase,
            isOpen: data.isOpen,
            isExplore: false,
            isdownload: true,
          })
          : data.user_id == 'true' ? alert("This course already 'Downloaded'. Please visit the ‘Downloads’ section to study this course.") :
          this.props.navigation.navigate('CourseDetails', {
            id: data.id,
            type: data.type,
            purchase: data.purchase,
            isOpen: data.isOpen,
            isExplore: false,
            isdownload: true,
          })
        }
        }
        dataItem={(data) => this.setState({ ...this.state, exploreData: data })}
        exploreDataData={this.state.exploreData == undefined ? [] : this.state.exploreData}
      />
    );
  };

  FirstRoute = (item) => {
    return (
      <MyCourses
        nav={this.props.navigation}
        Edit={(data) => this.props.navigation.navigate('EditCourse', data)}
        Move={(data) =>
          this.props.navigation.navigate('CreateChapter', {
            item: data.item,
            isOpen: data.isOpen,
            isCreated: false,
          })
        }
        Create={() => this.props.navigation.navigate('CreateCourse')}
        dataItem={(data) => this.setState({ ...this.state, coursesMy: data })}
        coursesMyData={this.state.coursesMy}
      />
    );
  };

  SecondRoute = () => (
    <AllCourses
      nav={this.props.navigation}
      move={(data) =>
      {
        this.props.navigation.navigate('CourseDetails', {
          id: data.id,
          type: data.type,
          purchase: data.purchase,
          isOpen: data.isOpen,
          isdownload: false,
        })
      }
      }
      Edit={(data) => { this.deleteCourse(data) }}
      find={() => this.props.navigation.navigate('FindCourse')}
      dataItem={(data) => this.setState({ ...this.state, coursesAll: data })}
      coursesAllData={this.state.coursesAll.length == 0 ? [] : this.state.coursesAll}
    />
  );

  renderScene = SceneMap({
    first: this.FirstRoute,
    second: this.SecondRoute,
    third: this.ThirdRoute,
  });

  // deleteCourseData = async (data) => {
  //   try {
  //     let cData = this.state.coursesAll;
  //     let deleteCourse = await deleteCardDataApi({
  //       token: this.state.data.jwt,
  //       data: {
  //         user_id: this.state.data.id,
  //         course_id: data,
  //         data_type: 'course',
  //       },
  //     });

  //     let isIds = cData.findIndex(
  //       (element) => element.course_id == data
  //     );
  //     cData.splice(isIds, 1);
  //     this.setState({ ...this.state, coursesAll: cData });
  //     console.log('delete', JSON.stringify(deleteCourse))

  //   }
  //   catch (error) {
  //     console.log('error>>>>', JSON.stringify(error))
  //   }

  // }
  deleteCourse=(data)=>{
    Alert.alert(
            'Are you sure to delete this course?',
            '',
            [
                {
                    text: 'NO',
                    onPress: () => { },
                },
                {
                    text: 'YES',
                    onPress: () => this.deleteCourseData(data),
                    style: 'destructive',
                },
            ],
            { cancelable: false },
        );
  }

  deleteCourseData = async (data) => {
    try {
      let cData = this.state.coursesAll;
      let deleteCourse = await deleteCourseApi({
        token: this.state.data.jwt,
        data: {
          course_id: data,
        },
      });

      let isIds = cData.findIndex(
        (element) => element.course_id == data
      );
      cData.splice(isIds, 1);
      this.componentDidMount()
      this.setState({ ...this.state, coursesAll: cData });

    }
    catch (error) {
      console.log('error>>>>', JSON.stringify(error))
    }

  }
  render() {
    return (
      <View style={style.container}>
        <View style={style.emptyTopVw} />
        {/* ******************* Header ******************* */}
        {this.state.isInternet ? (
          <View style={style.container}>
            <CustomHeader
              title={'Revizify'}
              image={Images.menuIcon}
              // rightImage={Images.searchIcon}
              leftBtn={() => this.props.navigation.openDrawer()}
              searchItem={() => { }}
            />
            {this.state.isLoading ? null : (
              <TabView
                navigationState={{
                  index: this.state.index,
                  routes: this.state.routes,
                }}
                renderScene={this.renderScene}
                onIndexChange={(i) => this.setState({ ...this.state, index: i })}
                initialLayout={{ width: width1, backgroundColor: 'white' }}
                style={{ backgroundColor: 'white' }}
                tabStyle={{ backgroundColor: 'white' }}
                renderTabBar={(props) => (
                  <TabBar
                    indicatorStyle={{ backgroundColor: Colors.headerColor }}
                    {...props}
                    renderLabel={({ route, color }) => (
                      <Text
                        style={{
                          color: Colors.Black,
                          margin: 6,
                          fontWeight: 'bold',
                        }}>
                        {route.title === 'Create'
                          ? route.title +
                          '(' +
                          this.state.coursesMy.length +
                          ')'
                          : route.title === 'Download'
                            ? route.title +
                            '(' +
                            this.state.coursesAll.length +
                            ')'
                            : route.title +
                            '(' +
                            this.state.exploreData.length +
                            ')'}
                      </Text>
                    )}
                    style={{ backgroundColor: Colors.drkWhite }}
                  />
                )}
              />
            )}
          </View>
        ) : (
          <Text>{'Internet not working'}</Text>
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
