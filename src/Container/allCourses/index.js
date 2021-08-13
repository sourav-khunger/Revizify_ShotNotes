/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import CustomExamview from '../../Component/CustomExamview';
import {internetcheck} from '../../Constants/InternetCheck';
import {updateData} from '../../Navigation/Drawer';
import {purchasedCourseApi} from '../../Redux/ReduxAPIHandler/CourseApi';
import Images from '../../Resources/Images';
import {style} from './style';

// let isSearch = false;
// export const openSearch = async () => {
//     isSearch = true;
// };

export default class AllCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: 1,
            isCourse: true,
            data: {},
            coursesAll: [],
            all_courses: [],
            my_courses: [],
            coursesMy: [],
            isLoading: false,
            isInternet: true,
            allCourseErr: false,
            myCourseErr: false,
            isSearch: false,
            exploreData: [],
            searchText: '',
        };
        this.myRef = React.createRef();
        this.current = true;
    }



    componentDidMount = () => {
        this.getData();
        this.props.nav.addListener('blur', (event) => {
            this.current = false;
        });
        this.props.nav.addListener('focus', (event) => {
            this.current = true;
            internetcheck().then((res) => {
                this.getData();
                this.setState({ isInternet: res, isLoading: false });
            }).catch((error) => {
                this.setState({ isInternet: error });
            });

        });


    }
    getData = () => {
        AsyncStorage.getItem('loginData')
            .then((res) => {
                this.setState({ ...this.state, data: JSON.parse(res) });

                this.getAllApi();
            })
            .catch((error) => {
                console.log('LoginDataError>>>', JSON.stringify(error));
                this.setState({ ...this.state, isLoading: false });
            });
    }
    componentWillReceiveProps = () => {
        this.getAllApi();
        if (this.props.route.params != undefined) {
            if (this.props.route.params.isSearch) {
                this.setState({ ...this.state, isSearch: true });
            }
        }
    }



    getAllApi = () => {
        this.setState({ ...this.state, isLoading: false });
        this.getAllCourse();

    }




    getAllCourse = async () => {
        try {
            let getAllData = await purchasedCourseApi({ token: this.state.data.jwt });
            //   console.log('>>>>>>',getAllData.response.courses);
            this.props.dataItem(getAllData.response.courses);
            this.setState({ ...this.state, coursesAll: getAllData.response.courses, all_courses: getAllData.response.courses, isLoading: false, allCourseErr: false });
        }
        catch (error) {
            console.log('error>>>', error);
            // Toast.show('err>>>>  '+JSON.stringify(error));
            this.setState({ ...this.state, isLoading: false, allCourseErr: true });
        }
    }

    searchData = (text) => {

        this.setState({ searchText: text, coursesAll: this.state.all_courses });
        this.props.dataItem(this.state.all_courses);
        if (text.length >= 2) {
            // alert('here')
            let data = this.state.all_courses.filter((item) => {
                if (item.course_name.toLowerCase().match(text.toLowerCase()) || item.name.toLowerCase().match(text.toLowerCase())) { return item; }
            });
            this.setState({ ...this.state, searchText: text, coursesAll: data });
            this.props.dataItem(data);
        }
    }
    closeSearch = () => {

        this.setState({ ...this.state, coursesAll: this.state.all_courses, searchText: '' });
        this.props.dataItem(this.state.all_courses);


    }



    find = () => {
        updateData('2');
        this.props.find();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isSelected !== this.state.isSelected) {
        }
    }
    render() {
        const width1 = Dimensions.get('window').width;
        return (
            <View style={style.container}>
                {/* ******************* Header ******************* */}
                {this.state.isInternet ?
                    <View style={style.container}>
                    <View style={{padding:10}}/>

                        <View style={{ width: width1 }}>
                            {this.props.coursesAllData.length == 0 ? <View style={style.isEmptyView}>
                                <Text style={style.noTx}>{'You do not have any downloads presently. Search for a course you like.'}</Text>
                            </View> :
                                <ScrollView >
                                    {this.props.coursesAllData.map((item, index) => (
                                        <CustomExamview
                                            item={item}
                                            isLine={
                                                this.props.coursesAllData.length === index + 1 ? false : true
                                            }
                                            isFind={false}
                                            isAll={false}
                                            isEdit={true}
                                            isDelete={true}
                                            editCourse={() => this.props.Edit(item.course_id)}
                                            key={index}
                                            courseData={() => {
                                                item.course_type == 'paid' ? this.props.move({ id: item.course_id, type: 'paid', purchase: item.purchase, isOpen: false }) :
                                                    this.props.move({ id: item.course_id, type: 'free', purchase: item.purchase, isOpen: false });
                                            }
                                            }
                                        />
                                    )).reverse()}
                                    <View style={{ padding: 30 }} />
                                </ScrollView>}
                        </View>

                        <TouchableOpacity
                            style={style.floatBtn}
                            onPress={() => {
                                this.find();
                            }}>
                            <Image style={style.seImg} source={Images.searchIcon} />
                            <Text style={[style.txCourse]}>{'Find'}</Text>
                        </TouchableOpacity>

                        <Modal
                            animated={true}
                            animationType={'fade'}
                            transparent={true}
                            visible={this.state.isLoading}>
                            <View style={style.popupView}>
                                {this.state.isLoading ? (
                                    <ActivityIndicator size="large" color="#ffffff" />
                                ) : null}
                            </View>
                        </Modal>
                    </View> : <Text>{'Internet not working'}</Text>}
            </View>
        );
    }
}
