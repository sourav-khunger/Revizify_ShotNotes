/* eslint-disable no-sequences */
/* eslint-disable prettier/prettier */
import React from 'react';

import {
  Dimensions,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CardFlip from 'react-native-card-flip';
import ImageZoom from 'react-native-image-pan-zoom';

import Answer from '../../Container/answer';
import Images from '../../Resources/Images';
import CustomAnswerFooterVw from '../CustomAnswerFooterVw';
import CustomHeader from '../CustomHeader';
import CustomQuestionFooterVw from '../CustomQuestionFooterVw';
import {style} from './style';

export default class CustomFilpView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isAnswer:false,
            isPdf: false,
            pdfUrl: '',
            pdfName: '',
            imageUri: '',
            isImage: false,
            isAudio: false,
            audioUri: '',
        }
    }
  render() {
    return (
      <View style={style.mainVw}>
        <View style={style.emptyTopVw} />
              <CustomHeader
                title={'Numbers'}
                image={Images.leftArrow}
                leftBtn={() => this.props.goBack()}
                searchItem={() => {}}
              />
              <CardFlip
                style={style.cardContainer}
                ref={(card) => (this.card = card)}>
                <View>
                <TouchableOpacity onPress={()=>this.props.Press()}><Text>{'Demo'}</Text></TouchableOpacity>
                </View>
                {/* <Question data={this.props.card_id} questionOnPress={(data)=>this.props.questionOnPress(data)} /> */}
                <Answer data={this.props.card_id} />
              </CardFlip>
              <View style={style.footerVw}>
                {this.state.isAnswer ? (
                  <CustomAnswerFooterVw
                    onPress={() => {
                      this.setState({...this.state, isAnswer: false});
                      this.card.flip();
                    }}
                  />
                ) : (
                  <CustomQuestionFooterVw
                    onPress={() => {
                      this.setState({...this.state, isAnswer: true});
                      this.card.flip();
                    }}
                  />
                )}
              </View>
              <Modal
                    animated={true}
                    animationType={'fade'}
                    transparent={true}
                    onRequestClose={() => this.setState({ ...this.state, isImage: false, imageUri: '' })}
                    visible={this.state.isImage}>
                    <View style={style.popupView}>
                        <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={200}
                       imageHeight={200}>
                            <Image style={style.imageVw} source={{ uri: this.state.imageUri }} />
                        </ImageZoom>
                    </View>
                </Modal>
      </View>
    );
  }
}
