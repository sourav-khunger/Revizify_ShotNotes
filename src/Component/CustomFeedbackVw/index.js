/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';

import {
  Text,
  View,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

import {style} from './style';

export default class CustomFeedbackVw extends React.Component {
    render() {
        return (
            <View style={style.container}>
                <View style={style.courseRatingVw}>
                    <Text style={style.courseTx}>{this.props.userName}</Text>
                    <View style={style.ratingsVw}>
                        <AirbnbRating
                            count={5}
                            starStyle={{ marginLeft: 3 }}
                            defaultRating={this.props.rating}
                            size={15}
                            showRating={false}
                            isDisabled={true}
                        />
                    </View>

                </View>
                <Text style={style.feedTx}>{this.props.feedbackData}</Text>

            </View>
        );
    }
}
