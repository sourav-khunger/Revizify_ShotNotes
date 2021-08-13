/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sequences */
/* eslint-disable prettier/prettier */
import React from 'react';

import {
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import Images from '../../Resources/Images';
import {style} from './style';

export default class CustomAnswerFooterVw extends React.Component {
  render() {
    return (
      <View style={style.bottomVw}>
                    {/* <TouchableOpacity style={[style.leftImgVw1]} onPress={()=>this.props.onPress()}>
                        <Image style={[style.bottomImg]} source={Images.backIcon} />
                    </TouchableOpacity>
                    {this.props.isRight ? <TouchableOpacity onPress={()=>this.props.cancel()} style={[style.leftImgVw]}>
                        <Image style={[style.bottomImg]} source={Images.remove} />
                    </TouchableOpacity> : null}
                    {this.props.isRight ?
                    <TouchableOpacity  style={[style.leftImgVw]} onPress={()=>this.props.rightClick()}>
                        <Image style={[style.bottomImg,{tintColor: 'green'}]} source={Images.check} />
                    </TouchableOpacity> : null}
                    {this.props.isSave? <View style={{marginLeft: '4%'}} />:
                    <TouchableOpacity disabled={this.props.disabled} style={style.leftImgVw} onPress={()=>this.props.saveBookMark()}>
                        <Image style={[style.saveImg]} source={this.props.saveImage} />
                    </TouchableOpacity>
                    } */}
                    <View style={[style.leftImgVw]}>
                    <TouchableOpacity style={{width: 50,height: 60}} onPress={()=>this.props.onPress()}>
                        <Image style={[style.bottomImg]} source={Images.backIcon} />
                    </TouchableOpacity>
                    </View>
                    {this.props.isRight ? 
                    <View style={[style.leftImgVw]}>
                    <TouchableOpacity style={{width: 50,height: 60}} onPress={()=>this.props.cancel()} >
                        <Image style={[style.bottomImg]} source={Images.remove} />
                    </TouchableOpacity> 
                    </View> : null }

                    {this.props.isRight ? 
                    <View style={[style.leftImgVw,]}>
                    <TouchableOpacity style={{width: 50,height: 60}} onPress={()=>this.props.rightClick()}>
                        <Image style={[style.bottomImg,]} source={Images.check} />
                    </TouchableOpacity>
                    </View> : null }

                    <View style={[style.leftImgVw]}>
                    <TouchableOpacity disabled={this.props.disabled}  onPress={()=>this.props.saveBookMark()}>
                        <Image style={[style.saveImg]} source={this.props.saveImage} />
                    </TouchableOpacity>
                    </View>
                </View>
    );
  }
}
