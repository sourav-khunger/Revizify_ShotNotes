/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';

import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Images from '../../Resources/Images';
import {style} from './style';

export default class CustomChaptersview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isText: false,
        }
    }
    render() {
        return (
            <TouchableOpacity style={style.container} onPress={() => this.props.viewChapter()}>
                <View style={style.subContainer}>
                    <View style={this.props.isEdit ? style.mainVw : style.mainsubVw} >
                        <View style={style.menuVw} >
                            <Text style={style.headerNameTx}>{this.props.number + ')'}</Text>
                            <Text numberOfLines={1} style={[style.headerNameTx1, { marginLeft: '5%' }]}>{this.props.title}</Text>
                        </View>
                        <Text style={[style.headerNameTx, { marginRight: '10%' }]}>{parseInt(this.props.revision) + '%'}</Text>
                    </View>
                    {
                        this.props.isEdit ?
                            <TouchableOpacity style={style.editBtn} onPress={() => this.props.onEdit()}>
                                <Image style={style.editImg} source={this.props.isdown ? Images.download : Images.edit} />
                            </TouchableOpacity> : null
                    }
                </View>
                {this.state.isText ? <View style={style.desVw}><Text style={style.desTx}><Text>{this.props.des}</Text><Text style={style.moreTx} onPress={()=>this.setState({isText:false})}>{'  less more'}</Text></Text></View> :
                    <View style={style.desVw}>
                        <Text style={style.desTx} numberOfLines={2}>
                            <Text maxLength={20} >{this.props.des.length > 80 ? this.props.des.substring(0, 82) + '.....' : this.props.des}</Text>
                            <Text style={style.moreTx} onPress={()=>this.setState({isText:true}) }>{this.props.des.length > 80 ? ' see more' : null}</Text>
                        </Text>

                    </View>
                }

            </TouchableOpacity>
        );
    }
}
