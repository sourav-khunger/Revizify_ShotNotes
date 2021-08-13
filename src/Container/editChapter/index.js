/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import AsyncStorage from '@react-native-community/async-storage';

import CustomHeader from '../../Component/CustomHeader';
import CustomInputView from '../../Component/CustomInputView';
import {updateChapterApi} from '../../Redux/ReduxAPIHandler/ChapterApi';
import Images from '../../Resources/Images';
import {style} from './style';

let chapterResponse = {};
class EditChapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapterName: '',
      isLoading: false,
      data: {},
      chapterDescription:'',
    };
    this.inputRef = {};
    this.current = true;
  }

  componentDidMount = () => {
    this.props.navigation.addListener('blur', (event) => {
      this.current = false;
    });
    this.props.navigation.addListener('focus', (event) => {
      this.current = true;
    });
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
    AsyncStorage.getItem('loginData')
      .then((res) => {
        this.setState({ ...this.state, data: JSON.parse(res), chapterName:this.props.route.params.chapter_name,chapterDescription: this.props.route.params.chapter_description});
      })
      .catch((error) => {
        console.log('LoginData>>>', JSON.stringify(error));
      });

    this.setState({ ...this.state, isLoading: true });
  }


  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  keyboardDidHide = () => {
    if(this.current){

    
    if (this.inputRef.isFocused) {
      this.inputRef.blur();
      return true;
    }
    return false;
    }
  };
  setInputRef = (data) => {
    this.inputRef = data;
  };


  save = async() => {
    if (this.state.chapterName == '') {
      Toast.show('Please enter the chapter name');
    } else if (this.state.chapterDescription == '') {
      Toast.show('Please enter the chapter description');
    } else {
       chapterResponse = await updateChapterApi({ token: this.state.data.jwt, id: this.state.data.id, chapter_name: this.state.chapterName, course_id: this.props.route.params.course_id,chapter_id: this.props.route.params.chapter_id,chapter_description:this.state.chapterDescription});
       if (chapterResponse.success == 1){
          this.props.navigation.goBack();
       }
       else {
         Toast.show(chapterResponse.message);
       }
    }
  };
  render() {
    return (
      <View style={style.container}>
      <View style={style.emptyTopVw}/>
        <CustomHeader
          title={'Edit Chapter'}
          image={Images.leftArrow}
          leftBtn={() => this.props.navigation.goBack()}
          searchItem={()=>{}}
        />
        <CustomInputView
          title={'Chapter name'}
          placeholder={'Enter Chapter name'}
          value={this.state.chapterName}
          onChangeText={(text) =>
            this.setState({ ...this.state, chapterName: text })
          }
          inputRefs={(input) => {
            this.setInputRef(input);
          }}
        />
        <CustomInputView
          title={'Chapter description'}
          placeholder={'Enter Chapter description'}
          value={this.state.chapterDescription}
          onChangeText={(text) =>
            this.setState({ ...this.state, chapterDescription: text })
          }
          inputRefs={(input) => {
            this.setInputRef(input);
          }}
        />

        <TouchableOpacity
          style={[style.loginBtn, { width: '80%' }]}
          onPress={() => this.save()}>
          <Text style={style.logTx}>{'SAVE'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default EditChapter;
