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
import YoutubePlayer from 'react-native-youtube-iframe';

import AsyncStorage from '@react-native-community/async-storage';

import CustomExamview from '../../Component/CustomExamview';
import {internetcheck} from '../../Constants/InternetCheck';
import {myCourseApi} from '../../Redux/ReduxAPIHandler/CourseApi';
import Colors from '../../Resources/Colors';
import {style} from './style';

// let isSearch = false;
// export const openSearch = async () => {
//     isSearch = true;
// };

let isSearch = 'false';
export const searchData = async (id) => {
  isSearch = id == undefined ? 'false' : id;
};

export default class MyCourses extends React.Component {
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
      isFirst: false,
      isVideo: false,
    };
    this.myRef = React.createRef();
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.current = true;
  }

  // handleBackButtonClick() {

  //     if (this.current) {
  //         Alert.alert(
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
  //         this.props.navigation.goBack();
  //     }

  //     return true;
  // }
  componentDidMount = () => {
    AsyncStorage.getItem('isFirst').then((res) => {
      if (res == 'true') {
        // this.props.navigation.navigate('Welcome');
        this.setState({...this.state, isFirst: false});
      } else {
        // this.props.navigation.navigate('LearnNewThing');
        this.setState({...this.state, isFirst: true});
      }
    });
    this.getAllApi();
    this.props.nav.addListener('blur', (event) => {
      this.current = false;
    });
    this.props.nav.addListener('focus', (event) => {
      this.current = true;
      this.getAllApi();

      internetcheck()
        .then((res) => {
          this.setState({isInternet: res, isLoading: false});
        })
        .catch((error) => {
          this.setState({isInternet: error});
        });
      // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    });
  };
  componentWillReceiveProps = () => {
    this.getAllApi();
    if (this.props.route.params != undefined) {
      if (this.props.route.params.isSearch) {
        this.setState({...this.state, isSearch: true});
      }
    }
  };

  getAllApi = () => {
    AsyncStorage.getItem('loginData')
      .then((res) => {
        this.setState({...this.state, data: JSON.parse(res), isLoading: false});
        this.getMyCourse();
      })
      .catch((error) => {
        console.log('LoginDataError>>>', JSON.stringify(error));
        this.setState({...this.state, isLoading: false});
      });
  };

  getMyCourse = async () => {
    try {
      let getMyData = await myCourseApi({token: this.state.data.jwt});
      this.props.dataItem(getMyData.response.courses);
      this.setState({
        ...this.setState,
        coursesMy: getMyData.response.courses,
        my_courses: getMyData.response.courses,
        allCourseErr: false,
      });
    } catch (error) {
      console.log('error>>>', error);
      this.setState({...this.state, isLoading: false, myCourseErr: true});
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isSelected !== this.state.isSelected) {
    }
  }

  render() {
    const width1 = Dimensions.get('window').width;
    return (
      <View style={style.container}>
        <View style={{padding: 2, backgroundColor: Colors.drkWhite}} />
        {/* ******************* Header ******************* */}
        {this.state.isInternet ? (
          <View style={style.container}>
            <View style={{padding: 10, backgroundColor: Colors.drkWhite}} />

            <View
              style={{
                width: width1,
                height: '100%',
                backgroundColor: Colors.drkWhite,
              }}>
              {this.props.coursesMyData.length == 0 ? (
                <View style={style.isEmptyView}>
                  <Text style={style.noTx}>
                    {
                      'Let’s create a new course \nor \nSearch for a course you like in ‘Explore’ section.'
                    }
                  </Text>
                </View>
              ) : (
                <ScrollView>
                  {this.props.coursesMyData
                    .map((item, index) => (
                      <CustomExamview
                        item={item}
                        isLine={
                          this.props.coursesMyData.length === index + 1
                            ? false
                            : true
                        }
                        key={index}
                        isFind={false}
                        isEdit={true}
                        isDelete={false}
                        isAll={false}
                        editCourse={() => this.props.Edit(item.course_id)}
                        courseData={() =>
                          this.props.Move({item: item.course_id, isOpen: false})
                        }
                      />
                    ))
                    .reverse()}
                  <View style={{padding: 30}} />
                </ScrollView>
              )}
            </View>
            <TouchableOpacity
              style={style.floatBtn}
              onPress={() => {
                this.props.Create();
              }}>
              <Text style={[style.txCourse]}>{'+ Create'}</Text>
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
        ) : (
          <Text>{'Internet not working'}</Text>
        )}
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => {
            this.setState({...this.state, isVideo: false});
            AsyncStorage.setItem('isFirst', 'true');
          }}
          visible={this.state.isVideo}>
          <View style={style.popupView11}>
            <View style={{padding: 25}} />
            <TouchableOpacity
              onPress={() => {
                this.setState({...this.state, isVideo: false});
                AsyncStorage.setItem('isFirst', 'true');
              }}
              style={style.cancelBtn1}>
              <Image
                style={[style.cancelImg,{tintColor: 'white'}]}
                source={require('../FlipCard/Assets/cancel.png')}
              />
            </TouchableOpacity>

            <YoutubePlayer height={500} play={true} videoId={'KUTB3RFOxYQ'} />
          </View>
        </Modal>
        <Modal
              animated={true}
              animationType={'fade'}
              transparent={true}
              onRequestClose={() => {
            this.setState({...this.state, isFirst: false});
            AsyncStorage.setItem('isFirst', 'true');
          }}
              visible={this.state.isFirst}>
              <View style={style.popupView}>
                <View style={style.workVw}>
                <Text style={style.headerTx}>{"How to Revizify works?"}</Text>
                <Text style={style.tcTx}>
            {
              'Watch this small video explaining the concept and how to use:'} <Text onPress={()=>this.setState({...this.state,isFirst: false, isVideo: true})} style={{color:Colors.skyBlue, textDecorationLine: 'underline'}}>{'\nhttps://youtu.be/KUTB3RFOxYQ'
            }</Text>
          </Text>
          <TouchableOpacity
              onPress={() => {
                this.setState({...this.state, isFirst: false});
                AsyncStorage.setItem('isFirst', 'true');
              }}
              style={style.cancelBtn11}>
              <Image
                style={[style.cancelImg, { tintColor: '#000'}]}
                source={require('../FlipCard/Assets/cancel.png')}
              />
            </TouchableOpacity>
                </View>
              </View>
            </Modal>
      </View>
    );
  }
}
