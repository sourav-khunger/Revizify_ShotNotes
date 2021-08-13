/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import Images from '../../Resources/Images';
import {style} from './style';

class CustomQuestionView extends Component {
  render() {
    return (
      <TouchableOpacity onPress={()=>this.props.onPress()} key={this.props.key} style={style.mainVw}>
      <FastImage style={style.saveImg} source={this.props.image} />
        <Text style={[style.questionText,{width: this.props.isEdit?'56%':'76%',}]} numberOfLines={1}>{this.props.item}</Text>
        {this.props.isBookmark == 'true' ? <FastImage style={style.saveImg1} source={Images.save_Bookmark} /> : <View style={style.saveVw}/>}
        {this.props.isEdit?<TouchableOpacity style={style.editBtn} onPress={()=>this.props.editCard()}><FastImage style={style.editIcon} source={Images.edit}/></TouchableOpacity>:null}
        {this.props.isEdit?<TouchableOpacity style={style.editBtn} onPress={()=>this.props.deleteCard()}><FastImage style={style.editIcon} source={Images.deleteIcon}/></TouchableOpacity>:null}
      </TouchableOpacity>
    );
  }
}

export default CustomQuestionView;
