/* eslint-disable react/react-in-jsx-scope */
import React from 'react';

import {View} from 'react-native';

import CustomAnswerFooterVw from '../../Component/CustomAnswerFooterVw';
import CustomQuestionFooterVw from '../../Component/CustomQuestionFooterVw';
import Images from '../../Resources/Images';
import {style} from './style';

export default class CustomBottomView extends React.Component {
  render() {
    return (
      <View style={style.vwMain}>
        {this.props.isAnswer ? (
          <CustomAnswerFooterVw
            onPress={() => {
              this.props.onPressAnswer();
            }}
            rightClick={() => this.props.updateQuestionStatus()}
            cancel={() => this.props.cancelQuestion()}
            isRight={true}
            saveImage={
              this.props.bookmark_status == 'true'
                ? Images.save_Bookmark
                : Images.bookmark
            }
            disabled={false}
            saveBookMark={() => {
              this.props.bookmarkSaveData();
            }}
          />
        ) : (
          <CustomQuestionFooterVw
            onPress={() => {
              this.props.QuestionPress();
            }}
            saveImage={
              this.props.bookmark_status == 'true'
                ? Images.save_Bookmark
                : Images.bookmark
            }
            disabled={false}
            saveBookMark={() => {
              this.props.bookmarkSaveData();
            }}
          />
        )}
      </View>
    );
  }
}
