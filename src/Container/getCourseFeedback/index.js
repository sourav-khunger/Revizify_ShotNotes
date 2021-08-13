/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

import CustomFeedbackVw from '../../Component/CustomFeedbackVw';
import CustomHeader from '../../Component/CustomHeader';
import {chapterApi} from '../../Redux/ReduxAPIHandler/ChapterApi';
import {courseFeedbackApi} from '../../Redux/ReduxAPIHandler/feedbackApi';
import Images from '../../Resources/Images';
import {style} from './style';

class GetCourseFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {},
      isfeedBack: false,
      feedback: '',
      rating: 0,
      isLoading: false,
      courseData: {},
      isLoader: false,
    };
  }

  componentDidMount = () => {
    this.getProfileData();
  };

  getProfileData = async () => {
    this.setState({...this.state, isLoader: true});
    try {
      let courseData = await chapterApi({
        token: this.props.route.params.token,
        id: this.props.route.params.courseId,
      });
      console.log('response>>', courseData);
      this.setState({...this.state, courseData: courseData});
      this.setState({...this.state, isLoader: false});
    } catch (error) {
      //   Toast.show(error);
      console.log('error>>', error);
      this.setState({...this.state, isLoader: false});
    }
  };

  saveFeedback = async () => {
    this.setState({...this.state, isLoading: true});
    try {
      let feedbackData = await courseFeedbackApi({
        token: this.props.route.params.token,
        id: this.props.route.params.id,
        feedback: this.state.feedback.replace("'", ''),
        rating: this.state.rating,
        courseId: this.props.route.params.courseId,
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
      } 
      if(feedbackData.success == 0){
        this.setState({
          ...this.state,
          isLoading: false,
          isfeedBack: false,
          rating: 0,
          feedback: '',
        });
        alert(feedbackData.message)
      }else {
        this.setState({...this.state, isLoading: false});
      }
    } catch (error) {
      this.setState({...this.state, isLoading: false});
      console.log('error', error);
    }
  };
  render() {
    const rating =
      this.state.courseData.average_rating == undefined
        ? 0
        : this.state.courseData.average_rating;
    return (
      <View style={style.container}>
        <View style={style.emptyTopVw} />
        <CustomHeader
          title={'Course Feedback'}
          image={Images.leftArrow}
          leftBtn={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          <View style={style.mainVw}>
            <Image
              source={
                this.state.courseData.course_image == undefined
                  ? Images.neet
                  : {uri: this.state.courseData.course_image}
              }
              style={style.profileImg}
            />

            {/* ********************* Name ***************************** */}
            <View style={style.detailsVw}>
              <Text style={style.nameTx}>{'Name :'}</Text>
              <Text style={style.namesTx} numberOfLines={2}>
                {this.state.courseData.course_name == undefined
                  ? ''
                  : this.state.courseData.course_name}
              </Text>
            </View>
            {/* ********************* Author name ***************************** */}
            <View style={style.detailsVw}>
              <Text style={style.nameTx}>{'Created by :'}</Text>
              <Text style={style.namesTx} numberOfLines={1}>
                {this.state.courseData.user_name == undefined
                  ? ''
                  : this.state.courseData.user_name}
              </Text>
            </View>
            {/* ********************* Description ***************************** */}
            <View style={style.detailsVw}>
              <Text style={style.nameTx}>{'Description :'}</Text>
              <Text style={style.namesTx} numberOfLines={2}>
                {this.state.courseData.course_des == undefined
                  ? ''
                  : this.state.courseData.course_des}
              </Text>
            </View>

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

            {/* ********************* All FeedBack ***************************** */}

            {this.state.courseData.feedback == undefined ? null : this.state
                .courseData.feedback.length != 0 ? (
              <Text style={style.allfeedbackTx}>{'All Feedback :'}</Text>
            ) : null}

            {this.state.courseData.feedback == undefined
              ? null
              : this.state.courseData.feedback.map((item) => (
                  <CustomFeedbackVw
                    rating={item.feedback_rating}
                    userName={item.name}
                    feedbackData={item.feedback_message}
                  />
                ))}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={style.giveBtn}
          onPress={() => this.setState({...this.state, isfeedBack: true})}>
          <Text style={style.giveTx}>{'Give feedback'}</Text>
        </TouchableOpacity>

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
      </View>
    );
  }
}

export default GetCourseFeedback;
