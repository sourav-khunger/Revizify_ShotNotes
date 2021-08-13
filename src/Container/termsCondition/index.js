/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {
  Linking,
  ScrollView,
  Text,
  View,
} from 'react-native';

import CustomHeader from '../../Component/CustomHeader';
import Colors from '../../Resources/Colors';
import Images from '../../Resources/Images';
import {style} from './style';

class TermsAndConditions extends Component {
  render() {
    return (
      <View style={style.container}>
        <View style={style.emptyTopVw} />

        <CustomHeader
          title={'Terms and Conditions'}
          image={
            this.props.route.params.isLogin ? Images.menuIcon : Images.leftArrow
          }
          leftBtn={() =>
            this.props.route.params.isLogin
              ? this.props.navigation.openDrawer()
              : this.props.navigation.goBack()
          }
          searchItem={() => {}}
        />
        <ScrollView>
          <Text style={style.termsTx}>{'Terms and conditions'}</Text>
          <Text style={style.tcTx}>
            {
              'The Revizify app is a service operated by Shotnotes learning solutions Pvt Ltd. Any use of the Service is subject to the following Terms and Conditions of Service:'
            }
          </Text>
          <Text style={style.tcTx}>
            <Text style={style.headingTXX}>{'Eligibility.'}</Text>
            {
              ' Use of the Service is void where prohibited. The Service is intended for users over the age of 13. By using the Service, you represent and warrant that (a) all registration information you submit is truthful and accurate; (b) you will maintain the accuracy of such information; and (c) your use of the Service does not violate any applicable law or regulation.'
            }
          </Text>
          <Text style={style.tcTx}>
            <Text style={style.headingTXX}>
              {'Your Revizify Account and Data.'}
            </Text>
            {
              ' If you create an account on the Service, you are responsible for maintaining the security of your account and data, and you are fully responsible for all activities that occur under the account. Accounts are for individual, not organizational, use by a single person only. You may not share your account with any other person. You must notify Revizify immediately of any unauthorized uses of your data, your account or any other breaches of security. Revizify will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. Revizify may from time to time set storage limits for your data, or take any other measures it considers appropriate to manage the Service. Revizify may also from time to time change its policies on offering commercial content or displaying advertising, and may do this without notice.'
            }
          </Text>
          <Text style={[style.headingTXX, {marginTop: 10, marginLeft: '5%'}]}>
            {'Acceptable Content'}
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              'By uploading or entering any material into our app, you assert that it does not contain: \nContent that you do not have the intellectual property rights to use, due to copyright, trademark, patent or other protection. Your local jurisdiction may allow you to use protected content under fair use provisions, provided you do not share it with others. Content designed to subvert the correct functioning of software or hardware, such as viruses and code exploits.'
            }
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {'Content that is illegal in your country of residence.'}
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              'If you are an intellectual property holder and believe your rights have been violated,'
            }
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {'please send an email to – '}{' '}
            <Text
              onPress={() =>
                Linking.openURL(
                  'mailto:contact@shotnotes.in?subject=SendMail&body=Description',
                )
              }
              style={{color: Colors.mainColor}}>
              {'contact@shotnotes.in'}
            </Text>{' '}
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {'If you share your material publicly, you must also ensure:'}
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              'It does not contain content that might offend others, such as pornography, hate speech or libel.'
            }
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              'It does not attempt to modify or replace the function, content or branding of our app.'
            }
          </Text>
          <Text
            style={[
              style.headingTXX,
              {marginTop: 10, marginLeft: '5%', fontSize: 22},
            ]}>
            {'Sharing Courses'}
          </Text>
          <Text style={[style.headingTXX, {marginTop: 2, marginLeft: '5%'}]}>
            {'Sharing'}
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              'You may optionally share a course you have uploaded, making it available for others to download from the Revizify app. However, When you keep a course ‘Private’, others will not be able to search the same.'
            }
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              'When you share a course, you grant us a worldwide, royalty-free, non-exclusive license to make the it available to users. Making any course public once, ie you keep the private button off, gives Revizify the licence to share your course in the explore section. In case you want it removed from the explore section, Kindly send an email at '
            }{' '}
            <Text
              onPress={() =>
                Linking.openURL(
                  'mailto:contact@shotnotes.in?subject=SendMail&body=Description',
                )
              }
              style={{color: Colors.mainColor}}>
              {'contact@shotnotes.in'}
            </Text>
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              'You may select to remove the shared course from our servers at any time. '
            }
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              'In addition to the license you grant us above, you may optionally grant users extra rights by specifying so in your course’s description, such as allowing them to redistribute modified versions of your course. You may not impose any extra restrictions.'
            }
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              'When you share a course, you will be required to assert that it is entirely your own work, or that you have obtained a license from the intellectual property holder to share the material here. If we suspect that material has been uploaded in violation of intellectual property rights, we will remove it from the shared courses list, and may remove your ability to share courses in the future.'
            }
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              'While we do not have the resources to manually check all courses that are uploaded to our app, we reserve the right to remove any we come across that we deem inappropriate.'
            }
          </Text>
          <Text style={[style.headingTXX, {marginTop: 10, marginLeft: '5%'}]}>
            {'Shared course License'}
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              'When you download a course that someone has shared, the course author grants you a permanent, non-revocable, worldwide, royalty free, non-exclusive license to use the material in your personal studies.'
            }
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              'This license is for personal use only, and the course may not be redistributed, re-uploaded, published, or used for any other purposes without explicit permission from the copyright holder.'
            }
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              'Shared courses have been provided by third parties and are not reviewed by us, so we can offer no warranty or support for them.'
            }
          </Text>
          <Text style={[style.headingTXX, {marginTop: 10, marginLeft: '5%'}]}>
            {'Intellectual Property Violations'}
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              "Each time users share a course, they're required to confirm that the content is entirely their own work, or that they have obtained a license from the intellectual property holder. If you believe someone has violated your intellectual property rights, please send an email to"
            }{' '}
            <Text
              onPress={() =>
                Linking.openURL(
                  'mailto:contact@shotnotes.in?subject=SendMail&body=Description',
                )
              }
              style={{color: Colors.mainColor}}>
              {'contact@shotnotes.in'}
            </Text>{' '}
            {
              ' to let us know. Please provide us the course name or card of the offending content, and a link to your site, book or other original content that the material has been taken from. If you are writing on behalf of another, you must have the authority to act on their behalf. Please be advised that if you make a false report, you may place yourself open to legal action.'
            }{' '}
          </Text>
          <Text style={[style.headingTXX, {marginTop: 10, marginLeft: '5%'}]}>
            {'Violations & Law Enforcement'}
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              'If you fail to comply with these terms of service, we may suspend or remove your account at our sole discretion. If your actions were illegal, we may also report you to the authorities. We will provide your information to third parties when required to do so by law.'
            }
          </Text>
          <Text style={[style.headingTXX, {marginTop: 10, marginLeft: '5%'}]}>
            {'Money'}
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              "Use of the service is currently free, and the hosting costs are supported by the owners. As the hosting costs continue to grow, we may need to introduce a 'freemium' model in the future, where basic accounts are free, and people can pay for quality courses to download."
            }
          </Text>
          <Text style={[style.headingTXX, {marginTop: 10, marginLeft: '5%'}]}>
            {'Disclaimer of Warranties'}
          </Text>
          <Text style={[style.tcTx, {marginTop: -2}]}>
            {
              "Use of the service is at your own risk. While we endeavour to ensure the integrity of your data, ultimately the responsibility is in your hands. Please keep a local backup of your data for safety's sake."
            }
          </Text>
          <Text style={[style.tcTx]}>
            {
              "THE SERVICE IS PROVIDED 'AS IS'. WHEN ALLOWED BY LOCAL LAW, WE HEREBY DISCLAIM ALL WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTY THAT THE SERVICE WILL BE ERROR FREE OR THAT ACCESS WILL BE CONTINUOUS OR UNINTERRUPTED. YOU UNDERSTAND THAT USE OF THE SERVICE IS ENTIRELY AT YOUR DISCRETION AND RISK."
            }
          </Text>
          <Text style={[style.headingTXX, {marginTop: 10, marginLeft: '5%'}]}>
            {'Limitation of Liability'}
          </Text>
          <Text style={[style.tcTx, {marginTop: 5}]}>
            {
              'TO THE EXTENT NOT PROHIBITED BY LAW, IN NO EVENT SHALL WE BE LIABLE FOR ANY GENERAL, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR OTHER DAMAGES, INCLUDING, WITHOUT LIMITATION, LOSS OF DATA, INCORRECT DATA, BUSINESS INTERRUPTION, OR ANY OTHER DAMAGES OR LOSSES INCURRED BY YOUR USE OF, OR INABILITY TO USE THIS SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, AND REGARDLESS OF THE THEORY OF LIABILITY.'
            }
          </Text>
          {/* <Text style={[style.tcTx,{marginTop: -2}]}>{""}</Text>
        <Text style={[style.tcTx,{marginTop: -2}]}>{""}</Text>
        <Text style={[style.tcTx,{marginTop: -2}]}>{""}</Text>
        <Text style={[style.tcTx,{marginTop: -2}]}>{""}</Text> */}

          <View style={{padding: 10}} />
        </ScrollView>
      </View>
    );
  }
}

export default TermsAndConditions;
