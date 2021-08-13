/* eslint-disable prettier/prettier */
import * as React from 'react';

import {
  DrawerActions,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = React.createRef();
// const route = useRoute();
//@ts-ignore
export function navigate(name, params) {
  //@ts-ignore
  navigationRef.current?.navigate(name, params);
}

export function reset(routeName, params) {
  //@ts-ignore
  navigationRef.current?.reset({
    routes: [{name: routeName, params: params}],
  });
}

export function toggle() {
  //@ts-ignore
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
  // console.log();
}

export function goBack() {
  //@ts-ignore
  navigationRef.current?.dispatch(StackActions.pop());
}

export function resetBeforeHome(
  routeName,
  routeName2,
  params,
) {
  //@ts-ignore
  // var prevScreen = navigationRef.current?.getCurrentRoute().name == "Home" ? "Home" : "My List"
  navigationRef.current?.reset({
    index: 1,
    routes: [{name: routeName}, {name: routeName2}],
  });
}

export function resetBeforeHomeWithIndex(
  routeName,
  index,
  params,
) {
  //@ts-ignore
  // var prevScreen = navigationRef.current?.getCurrentRoute().name == "Home" ? "Home" : "My List"
  navigationRef.current?.reset({
    index: index,
    routes: [{name: routeName}],
  });
}

export function navigateToTabScreen(
  routeName,
  screenName,
  params,
) {
  //@ts-ignore
  navigationRef.current?.navigate(routeName, {
    screen: screenName,
    params: params,
  });
}
