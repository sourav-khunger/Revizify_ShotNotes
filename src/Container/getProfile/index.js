/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

import CustomExamview from '../../Component/CustomExamview';
import CustomFeedbackVw from '../../Component/CustomFeedbackVw';
import CustomHeader from '../../Component/CustomHeader';
import {userFeedbackApi} from '../../Redux/ReduxAPIHandler/feedbackApi';
import {userData} from '../../Redux/ReduxAPIHandler/userApi';
import Images from '../../Resources/Images';
import {style} from './style';

class GetProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {},
      isfeedBack: false,
      feedback: '',
      rating: 0,
      isLoading: false,
      isLoader: false,
      isError: false,
      errorMessage: '',
      isCourse: false,
      courses: [],
      searchText: '',
      isSearch: false,
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
    this.getProfileData();
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

  getProfileData = async () => {
    this.setState({...this.state, isLoader: true});
    try {
      let data = await userData({
        token: this.props.route.params.token,
        id: this.props.route.params.id,
      });
      // console.log('userData>>>>>>', data);
      this.setState({
        ...this.state,
        profileData: data,
        courses: data.courses,
        isLoader: false,
      });
    } catch (error) {
      this.setState({
        ...this.state,
        isLoader: false,
        isError: true,
        errorMessage:
          error == undefined || error.message == undefined
            ? 'User data not found'
            : error.message,
      });
      console.log('error', error);
    }
  };

  saveFeedback = async () => {
    this.setState({...this.state, isLoading: true});
    try {
      let feedbackData = await userFeedbackApi({
        token: this.props.route.params.token,
        id: this.props.route.params.id,
        feedback: this.state.feedback.replace("'", ''),
        rating: this.state.rating,
      });
      if (feedbackData.success == 1) {
        this.setState({
          ...this.state,
          isLoading: false,
          isfeedBack: false,
          rating: 0,
          feedback: '',
        });
        this.getProfileData();
      } else if (feedbackData.success == 0) {
        this.setState({
          ...this.state,
          isLoading: false,
          isfeedBack: false,
          rating: 0,
          feedback: '',
        });
        // alert(feedbackData.message);
      } else {
        this.setState({...this.state, isLoading: false});
      }
    } catch (error) {
      this.setState({
        ...this.state,
        isLoading: false,
        isError: true,
        errorMessage:
          error == undefined || error.message == undefined
            ? 'User data not found'
            : error.message,
      });
      console.log('error', error);
    }
  };
  searchData = (text) => {
    this.setState({
      searchText: text,
      courses: this.state.profileData.courses,
    });
    if (text.length >= 2) {
      // alert('here')
      let data = this.state.profileData.courses.filter((item) => {
        if (
          item.course_name.toLowerCase().match(text.toLowerCase()) ||
          item.name.toLowerCase().match(text.toLowerCase())
        ) {
          return item;
        }
      });
      this.setState({
        ...this.state,
        searchText: text,
        courses: data,
      });
    }
  };
  closeSearch = () => {
    if (this.state.searchText == '') {
      this.setState({...this.state, isSearch: false});
    } else {
      this.setState({
        ...this.state,
        searchText: '',
        courses: this.state.profileData.courses,
      });
    }
  };
  render() {
    const rating =
      this.state.profileData.average_rating == undefined
        ? 0
        : this.state.profileData.average_rating;
    return (
      <View style={style.container}>
        <View style={style.emptyTopVw} />
        <CustomHeader
          title={'User Details'}
          image={Images.leftArrow}
          leftBtn={() => this.props.navigation.goBack()}
          searchItem={() => {}}
        />
        {this.state.isError ? (
          <View>
            <Text>{this.state.errorMessage}</Text>
          </View>
        ) : (
          <ScrollView>
            <View style={style.mainVw}>
              <Image
                source={
                  this.state.profileData.profile_photo == ''
                    ? Images.AvterImg
                    : {uri: this.state.profileData.profile_photo}
                }
                style={style.profileImg}
              />
              {/* ********************* Name ***************************** */}
              <View style={style.detailsVw}>
                <Text style={style.nameTx}>{'Name :'}</Text>
                <Text style={style.namesTx} numberOfLines={1}>
                  {this.state.profileData.name == undefined
                    ? ''
                    : this.state.profileData.name}
                </Text>
              </View>
              {/* ********************* Bio ***************************** */}
              <View style={style.detailsVw}>
                <Text style={style.nameTx}>{'Bio :'}</Text>
                <Text style={style.namesTx} numberOfLines={1}>
                  {this.state.profileData.bio == undefined
                    ? ''
                    : this.state.profileData.bio}
                </Text>
              </View>
              {console.log('data>>>', JSON.stringify(this.state.profileData))}
              {/* ********************* Rating ***************************** */}
              <View style={style.detailsVw}>
                <Text style={style.nameTx1}>{'Rating :'}</Text>
                <View style={style.ratingVw}>
                  <AirbnbRating
                    count={5}
                    starStyle={{marginLeft: 3}}
                    defaultRating={rating}
                    size={15}
                    showRating={false}
                    isDisabled={true}
                  />
                </View>
              </View>
              {this.state.profileData.courses == undefined ? null : this.state
                  .profileData.courses.length != 0 ? (
                <Text style={style.allfeedbackTx}>{'Courses :'}</Text>
              ) : null}
              {this.state.profileData.courses == undefined
                ? null
                : this.state.profileData.courses.map((item, index) => {
                    if (index < 5) {
                      return (
                        <CustomExamview
                          item={item}
                          isLine={
                            this.state.profileData.courses.length === index + 1
                              ? false
                              : true
                          }
                          isAll={true}
                          isEdit={false}
                          isFind={true}
                          key={index}
                          courseData={() => {
                            item.purchase == 'true'
                              ? this.props.navigation.navigate(
                                  'CourseDetails',
                                  {
                                    id: item.course_id,
                                    type: 'free',
                                    purchase: item.purchase,
                                    isOpen: true,
                                    isdownload: false,
                                    isCreated: true,
                                  },
                                )
                              : this.props.navigation.navigate(
                                  'CourseDetails',
                                  {
                                    id: item.course_id,
                                    type: 'free',
                                    purchase: item.purchase,
                                    isOpen: true,
                                    isdownload: true,
                                    isCreated: true,
                                  },
                                );
                          }}
                        />
                      );
                    }
                  })}
              {this.state.profileData.courses == undefined ? null : this.state
                  .profileData.courses.length <= 5 ? null : (
                <Text
                  style={style.allTx}
                  onPress={() =>
                    this.setState({...this.state, isCourse: true})
                  }>
                  {this.state.isCourse ? 'View Less' : 'View All'}
                </Text>
              )}
              {/* ********************* All FeedBack ***************************** */}
              {this.state.profileData.feedback == undefined ? null : this.state
                  .profileData.feedback.length != 0 ? (
                <Text style={style.allfeedbackTx}>{'All Feedback :'}</Text>
              ) : null}
              {this.state.profileData.feedback == undefined
                ? null
                : this.state.profileData.feedback.map((item) => (
                    <CustomFeedbackVw
                      rating={item.feedback_rating}
                      userName={item.name}
                      feedbackData={item.feedback_message}
                    />
                  ))}
            </View>
          </ScrollView>
        )}
        {this.state.isError ? null : (
          <TouchableOpacity
            style={style.giveBtn}
            onPress={() => this.setState({...this.state, isfeedBack: true})}>
            <Text style={style.giveTx}>{'Give feedback'}</Text>
          </TouchableOpacity>
        )}

        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() =>
            this.setState({...this.state, isfeedBack: false})
          }
          visible={this.state.isfeedBack}>
          <View style={style.popupView}>
            <KeyboardAvoidingView>
              <ScrollView style={{flex: 1}}>
                <View
                  style={{
                    width: '100%',
                    height: Dimensions.get('window').height,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={style.subContainer}>
                    <Text style={style.mainfeedbackTx}>{'FEEDBACK'}</Text>
                    <View style={style.ratingUsVw}>
                      <Text style={style.ratingTx}>{'Rating :'}</Text>
                      <View style={style.ratingsVw}>
                        <AirbnbRating
                          count={5}
                          starStyle={{marginLeft: 3}}
                          defaultRating={0}
                          size={20}
                          showRating={false}
                          isDisabled={false}
                          onFinishRating={(text) =>
                            this.setState({...this.state, rating: text})
                          }
                        />
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => this.saveFeedback()}
                      style={style.submitBtn}>
                      <Text style={style.giveTx}>{'Submit feedback'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
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
        </Modal>

        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isLoader}>
          <View style={style.popupView}>
            {this.state.isLoader ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : null}
          </View>
        </Modal>

        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setState({...this.state, isCourse: false})}
          visible={this.state.isCourse}>
          <View style={style.popupView1}>
            <KeyboardAvoidingView>
              <View style={{flex: 1}}>
                <View
                  style={{
                    width: '100%',
                    // height: Dimensions.get('window').height,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                  }}>
                  <View style={style.emptyTopVw} />
                  <View style={style.searchVW}>
                    <View style={style.searchInputVW}>
                      <Image
                        style={[style.searchImg, {marginLeft: 10}]}
                        source={require('../allCard/Assets/searchIcon.png')}
                      />
                      <TextInput
                        onChangeText={(text) => this.searchData(text)}
                        value={this.state.searchText}
                        style={style.searchInout}
                        placeholder={'Search'}
                        ref={this.inputRef}
                      />
                      <TouchableOpacity
                        style={{marginRight: 10}}
                        onPress={() => {
                          this.closeSearch();
                        }}>
                        <Image
                          style={[style.searchImg]}
                          source={Images.cencel}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{padding: 5}} />
                  {this.state.courses.length == 0 ? (
                    <View
                      style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height - 200,
                        alignItems: 'center',
                      }}>
                      <Text style={style.noCourseTx}>{'No course found'}</Text>
                    </View>
                  ) : null}
                  <ScrollView>
                    {this.state.courses == undefined
                      ? null
                      : this.state.courses.length == 0
                      ? null
                      : this.state.courses.map((item, index) => (
                          <CustomExamview
                            item={item}
                            isLine={
                              this.state.courses.length === index + 1
                                ? false
                                : true
                            }
                            isAll={false}
                            isEdit={false}
                            isFind={true}
                            key={index}
                            courseData={() => {
                              item.course_type == 'paid'
                                ? this.props.navigation.navigate(
                                    'CourseDetails',
                                    {
                                      id: item.course_id,
                                      type: 'paid',
                                      purchase: item.purchase,
                                      isOpen: true,
                                    },
                                  )
                                : this.props.navigation.navigate(
                                    'CourseDetails',
                                    {
                                      id: item.course_id,
                                      type: 'free',
                                      purchase: item.purchase,
                                      isOpen: true,
                                    },
                                  );
                            }}
                          />
                        ))}
                    {this.state.courses.length == 0 ? null : (
                      <Text
                        style={style.allTx}
                        onPress={() =>
                          this.setState({...this.state, isCourse: false})
                        }>
                        {this.state.isCourse ? 'View Less' : 'View All'}
                      </Text>
                    )}
                    {this.state.courses.length == 0 ? null : (
                      <View style={{padding: 30}} />
                    )}
                  </ScrollView>
                </View>
              </View>
            </KeyboardAvoidingView>
            {/* </View> */}
          </View>
        </Modal>
      </View>
    );
  }
}

export default GetProfile;
