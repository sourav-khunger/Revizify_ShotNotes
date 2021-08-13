/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import CustomHeader from '../../Component/CustomHeader';
import Colors from '../../Resources/Colors';
import Images from '../../Resources/Images';
import {style} from './style';

class About extends Component {
  state={
    isVideo: false,
  }
  render() {
    return (
      <View style={style.container}>
        <View style={style.emptyTopVw} />

        <CustomHeader
          title={'How Revizify works'}
          image={
             Images.menuIcon
          }
          leftBtn={() =>
            this.props.navigation.openDrawer()
          }
          searchItem={() => {}}
        />
        <ScrollView>
          <Text style={style.termsTx}>{'How Revizify works?'}</Text>
          <Text style={style.tcTx}>
            {
              'Watch this small video explaining the concept and how to use:'} <Text onPress={()=>this.setState({...this.state,isVideo: true})} style={{color:Colors.skyBlue, textDecorationLine: 'underline'}}>{'\nhttps://youtu.be/KUTB3RFOxYQ'
            }</Text>
          </Text>

          <Text
            style={[
              style.headingTXX,
              {marginTop: 10, marginLeft: '5%', fontSize: 22},
            ]}>
            {'Hello and welcome!'}
          </Text>
          <Text style={[style.tcTx,{marginTop: 5}]}>{'The Revizify app is a service operated by Shotnotes learning solutions Private Limited. Revizify is revision tool helping you revise any subject/topic with the help of flashcards. You forget 50% of new information in an hour and 80% after a week. So how do we make sure we remember what we study?'}</Text>
          <Text style={[style.tcTx,{marginTop: 5}]}>{'Well, the answer is Spaced repetition and Active recall, on which Revizify’s revision algorithm is based.'}</Text>
          <Text style={[style.tcTx,{marginTop: 5}]}>{'Spaced Repetition: You revise any new information at particular points in time. Active recall: You try to recall an answer by looking at the question side of the flashcard rather than just reading.'}</Text>
          <Text style={[style.tcTx,{marginTop: 5}]}>{'In Revizify, you revise any flashcard 4 times. In a Course, you start studying the flashcards from ‘New deck’. If you press the ‘green tick’ on the answer side of the flashcard, the card moves to the next revision deck.'}</Text>
          <Text style={[style.tcTx,{marginTop: 5}]}>{'Designed as per the forgetting curve, you revise any flashcard after 1 day, 3-5 days, 7-10 days, 28-30 days completing the 4 deck revision system. '}</Text>
          <Text style={[style.tcTx,{marginTop: 5}]}>{'If you’re an author of a course on Revizify and choose to make the course public, Kindly make sure you do not upload any copyrighted material in the flashcards.'}</Text>

          <View style={{padding: 10}} />
        </ScrollView>
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setState({...this.state, isVideo: false})}
          visible={this.state.isVideo}>
          <View style={style.popupView}>
          <View style={{padding:25}}/>
          <TouchableOpacity
              onPress={() => {
                this.setState({...this.state, isVideo: false});
              }}
              style={style.cancelBtn}>
              <Image
                style={style.cancelImg}
                source={require('../FlipCard/Assets/cancel.png')}
              />
            </TouchableOpacity>
          <YoutubePlayer
        height={300}
        play={true}
        videoId={'KUTB3RFOxYQ'}
       />
          </View>
        </Modal>
      </View>
    );
  }
}

export default About;
