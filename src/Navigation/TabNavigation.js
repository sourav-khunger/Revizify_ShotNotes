/* eslint-disable prettier/prettier */
import React from 'react';

import {
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';

import AllCourses from '../Container/allCourses';
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import Explore from '../Container/Explore';
import MyCourses from '../Container/myCourses';

const Tab = createMaterialTopTabNavigator();
export const TapContainer = (props) => (
  <Tab.Navigator>
    <Tab.Screen name={'Explore(' + props.exploreData + ')'} component={Explore} />
    <Tab.Screen name={'All Courses(' + props.allCourseData + ')'} component={AllCourses} />
    <Tab.Screen name={'My Courses(' + props.myCourseData + ')'} component={MyCourses} />
  </Tab.Navigator>
);
