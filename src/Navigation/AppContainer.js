/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import About from '../Container/about';
import AddBank from '../Container/addBank';
import AddCard from '../Container/addCard';
import AddChapter from '../Container/addChapter';
import AllCard from '../Container/allCard';
import Answer from '../Container/answer';
import ChangePassword from '../Container/changePassword';
import ChapterDetails from '../Container/chapterDetails';
import Contact from '../Container/contact';
import CourseDetails from '../Container/courseDetails';
import CreateChapter from '../Container/createChapter';
import CreateCourse from '../Container/createCourse';
import EditCard from '../Container/editCard';
import EditChapter from '../Container/editChapter';
import EditCourse from '../Container/editCourse';
import FindCourse from '../Container/findCourse';
import FlipCard from '../Container/FlipCard';
import ForgetPassword from '../Container/forgetPassword';
import GetCourseFeedback from '../Container/getCourseFeedback';
import GetProfile from '../Container/getProfile';
import Home from '../Container/home';
import LearnNewThings from '../Container/learnNewThings';
import Login from '../Container/login';
import NewDeck from '../Container/newDeck';
import PrivatePolicy from '../Container/privatePolicy';
import Profile from '../Container/profile';
import Question from '../Container/question';
import Revision from '../Container/revision';
import Signup from '../Container/signup';
// import { StackNavigator, DrawerNavigator } from 'react-navigation'
import Splash from '../Container/splash';
import TermsAndConditions from '../Container/termsCondition';
import Wallet from '../Container/wallet';
import Welcome from '../Container/welcome';
import Drawer from './Drawer';

const DrawerStack = createDrawerNavigator();

const RootStack = createStackNavigator();

const drawerStackScreen = () => (
  <DrawerStack.Navigator
    drawerContent={(props) => <Drawer {...props} />}
    drawerStyle={{backgroundColor: 'transparent', width: '85%'}}>
    <DrawerStack.Screen name="HomeStack" component={Home} />
    <DrawerStack.Screen name="About" component={About} />
    <DrawerStack.Screen name="Profile" component={Profile} />
    <DrawerStack.Screen name="ChangePassword" component={ChangePassword} />
    <DrawerStack.Screen name="FindCourse" component={FindCourse} />
    <DrawerStack.Screen name="Wallet" component={Wallet} />
    <DrawerStack.Screen name="Terms" component={TermsAndConditions} />
    <DrawerStack.Screen name="AddBank" component={AddBank} />
    <DrawerStack.Screen name="Contact" component={Contact} />
    <DrawerStack.Screen name="PrivatePolicy" component={PrivatePolicy} />
  </DrawerStack.Navigator>
);

const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="Splash" component={Splash} />
    <RootStack.Screen name="LearnNewThing" component={LearnNewThings} />
    <RootStack.Screen name="Welcome" component={Welcome} />
    <RootStack.Screen name="Login" component={Login} />
    <RootStack.Screen name="Signup" component={Signup} />
    <RootStack.Screen name="ForgetPassword" component={ForgetPassword} />
    <RootStack.Screen name="Home" component={drawerStackScreen} />
    <RootStack.Screen name="CourseDetails" component={CourseDetails} />
    <RootStack.Screen name="ChapterDetails" component={ChapterDetails} />
    <RootStack.Screen name="CreateCourse" component={CreateCourse} />
    <RootStack.Screen name="CreateChapter" component={CreateChapter} />
    <RootStack.Screen name="AddChapter" component={AddChapter} />
    <RootStack.Screen name="AddCard" component={AddCard} />
    <RootStack.Screen name="AllCard" component={AllCard} />
    <RootStack.Screen name="Question" component={Question} />
    <RootStack.Screen name="Answer" component={Answer} />
    <RootStack.Screen name="FlipCart" component={FlipCard} />
    <RootStack.Screen name="NewDeck" component={NewDeck} />
    <RootStack.Screen name="Revision" component={Revision} />
    <RootStack.Screen name="EditCourse" component={EditCourse} />
    <RootStack.Screen name="EditChapter" component={EditChapter} />
    <RootStack.Screen name="GetProfile" component={GetProfile} />
    <RootStack.Screen name="GetCourseFeedback" component={GetCourseFeedback} />
    <RootStack.Screen name="EditCard" component={EditCard} />
    <RootStack.Screen name="Termss" component={TermsAndConditions} />
    <RootStack.Screen name="PrivatePolicys" component={PrivatePolicy} />
  </RootStack.Navigator>
);
export const AppContainer = () => (
  <NavigationContainer>
    <RootStackScreen />
  </NavigationContainer>
);
