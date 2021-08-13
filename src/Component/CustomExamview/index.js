/* eslint-disable semi */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';

import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

import Images from '../../Resources/Images';
import {style} from './style';

export default class CustomExamview extends React.Component {
  render() {

    const totalPurchases = this.props.item.total_purchases === undefined
      ? '0'
      : this.props.item.total_purchases== '' ? '0' : this.props.item.total_purchases ;
      const rating = this.props.item.average_rating === undefined
      ? '0'
      : this.props.item.average_rating;
      
      const percentage = this.props.item.percentage == undefined ? 0 : this.props.item.total_chapter == undefined ? 0 : Number(this.props.item.percentage) / Number(this.props.item.total_chapter);
      const totalPercentage = percentage.toString() === 'NaN' ? 0 : percentage;
      const tc= this.props.item.total_card==undefined?0:this.props.item.total_card;
      const dc = this.props.item.deck_cards == undefined ? 0 : this.props.item.deck_cards
    return (
      <View
        style={style.mainVw}
      >
        <TouchableOpacity key={this.props.key}
          style={this.props.isEdit ? style.mainSbVw : style.subMainVw}
          onPress={() => this.props.courseData()}>
          <View style={style.courseVw}>
            <View style={style.courseImgVw}>
              <Image
                source={this.props.item.course_img == undefined || this.props.item.course_img == "" ? Images.neet : { uri: this.props.item.course_img }}
                style={style.courseImg}
              />
            </View>

            <Text numberOfLines={2} style={[style.nameTx,{width: this.props.isAll?'70%':'80%',}]}>{this.props.item.course_name}</Text>
          </View>
          <Text numberOfLines={1} style={[style.byTx,{marginTop:this.props.item.course_name.length>30? '0.5%':'-5%'}]}>
            {this.props.item.name == undefined ? ' by user' : 'by ' + this.props.item.name}
          </Text>
          <Text numberOfLines={1} style={[style.byTx,{marginTop:'1%'}]}>
            {this.props.item.domain_sector == undefined ? ' in user' : 'in ' + this.props.item.domain_sector}
          </Text>
          <View style={style.cardVw}>
          <View style={style.downloadVws}>
            <Text style={style.cardTx}>
              {this.props.isFind ? 'Total cards : ' : 'New cards : ' }
            </Text>

            <Text style={style.cardTx}>
              { this.props.isFind ? tc  :  dc + '/' + tc}
            </Text>
            </View>
            <View style={style.downloadVw}>
            <Image source={Images.download} style={{width:20,height: 20, marginRight:5}}/>
            <Text style={style.cardTx}>
              {totalPurchases}
            </Text>
            </View>
          </View>
          <View style={style.cardVw}>
          <View style={style.downloadVws}>
            <Text style={style.cardTx}>
              {this.props.isFind ? 'Total chapters : ' : 'Revision : '}
            </Text>
            <Text style={style.cardTx}>
              { this.props.isFind ? this.props.item.total_chapter == undefined ? 0 : this.props.item.total_chapter : parseInt(totalPercentage) + '%' }
            </Text>
            </View>
            <View style={style.downloadVw}>
            <AirbnbRating
              count={5}
              starStyle={{ marginLeft: 3 }}
              defaultRating={rating}
              size={20}
              showRating={false}
              isDisabled={true}
            />
            </View>
          </View>
          {this.props.isAll ? this.props.item.course_type == 'paid' ? <Image style={style.sellerImg} source={Images.seller} /> : null : null}

        </TouchableOpacity>
        {this.props.isEdit ? <TouchableOpacity style={style.editBtn} onPress={() => this.props.editCourse()}>
          <Image source={this.props.isDelete ? Images.deleteIcon :  Images.edit} style={style.editIcon} />
        </TouchableOpacity> : null}
      </View>
    );
  }
}
