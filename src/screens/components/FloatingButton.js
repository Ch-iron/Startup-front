import React, { useState, useContext, useEffect } from 'react';
import { Text, TouchableOpacity, Dimensions } from 'react-native';
import { RequestContext } from '../../context/RequestContext';
import { UserContext } from '../../context/UserContext';
import Toast from 'react-native-easy-toast';
import s3 from '../../s3';


//category의 설문이면, contents를 해당 context항목에 업데이트
const FloatingButton = ({ title, navigation, index, category, contents, next }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [survey, request, photo, actions] = useContext(RequestContext);
    const [info, useractions] = useContext(UserContext);

    const request_style_url = s3 + 'Request_Style/';

    const onPress = () => {
        if (category === 'shopping_preference') {
            actions.setShopping_preference(contents);
        }
        else if (category === 'shopping_effort') {
            actions.setShopping_effort(contents);
        }
        else if (category === 'trend_sensitive') {
            actions.setTrend_sensitive(contents);
        }
        else if (category === 'job') {
            actions.setJob(contents);
        }
        else if (category === 'working_fashion') {
            actions.setWorking_fashion(contents);
        }
        else if (category === 'body_info') {
            actions.setHeight(contents.height);
            actions.setWeight(contents.weight);
        }
        else if (category === 'size') {
            actions.setSize_top(contents.size_top);
            actions.setFeeling_top(contents.feeling_top);
            actions.setSize_waist(contents.size_waist);
            actions.setFeeling_waist(contents.feeling_waist);
            actions.setSize_outer(contents.size_outer);
            actions.setSize_shoes(contents.size_shoes);
        }
        else if (category === 'body_shape') {
            actions.setBody_shape(contents);
        }
        else if (category === 'body_photo') {
            actions.setBody_photo1(contents.body_photo1);
            actions.setBody_photo2(contents.body_photo2);
            actions.setBody_photo3(contents.body_photo3);
            actions.setBody_image1(contents.body_image1);
            actions.setBody_image2(contents.body_image2);
            actions.setBody_image3(contents.body_image3);
        }
        else if (category === 'complex') {
            actions.setComplex_top(contents.complex_top);
            actions.setComplex_bottom(contents.complex_bottom);
        }
        else if (category === 'look_preference') {
            let look_preference = contents.join(',');
            console.log(look_preference);
            actions.setLook_preference(look_preference);
        }
        else if (category === 'tpo') {
            actions.setTpo(contents.tpo);
            if (contents.photo3 !== '') {
                actions.setRequest_style1(contents.photo1);
                actions.setRequest_style2(contents.photo2);
                actions.setRequest_style3(contents.photo3);
                actions.setRequest_style(request_style_url + contents.photo1.fileName + ',' + request_style_url + contents.photo2.fileName + ',' + request_style_url + contents.photo3.fileName);
            }
            else if (contents.photo2 !== '') {
                actions.setRequest_style1(contents.photo1);
                actions.setRequest_style2(contents.photo2);
                actions.setRequest_style(request_style_url + contents.photo1.fileName + ',' + request_style_url + contents.photo2.fileName);
            }
            else if (contents.photo1 !== '') {
                actions.setRequest_style1(contents.photo1);
                actions.setRequest_style(request_style_url + contents.photo1.fileName);
            }
            else
                actions.setRequest_style('No photos');
        }
        else if (category === 'need_outer') {
            if (contents.etc === '') {
                let need_outer = contents.needlist.join(',');
                actions.setNeed_outer(need_outer);
            }
            else {
                let tmp = contents.needlist.slice();
                tmp.splice(tmp.indexOf('기타'), 1, contents.etc);
                let need_outer = tmp.join(',');
                actions.setNeed_outer(need_outer);
            }
        }
        else if (category === 'need_top') {
            if (contents.etc === '') {
                let need_top = contents.needlist.join(',');
                actions.setNeed_top(need_top);
            }
            else {
                let tmp = contents.needlist.slice();
                tmp.splice(tmp.indexOf('기타'), 1, contents.etc);
                let need_top = tmp.join(',');
                actions.setNeed_top(need_top);
            }
        }
        else if (category === 'need_bottom') {
            if (contents.etc === '') {
                let need_bottom = contents.needlist.join(',');
                actions.setNeed_bottom(need_bottom);
            }
            else {
                let tmp = contents.needlist.slice();
                tmp.splice(tmp.indexOf('기타'), 1, contents.etc);
                let need_bottom = tmp.join(',');
                actions.setNeed_bottom(need_bottom);
            }
        }
        else if (category === 'need_shoes') {
            if (contents.etc === '') {
                let need_shoes = contents.needlist.join(',');
                actions.setNeed_shoes(need_shoes);
            }
            else {
                let tmp = contents.needlist.slice();
                tmp.splice(tmp.indexOf('기타'), 1, contents.etc);
                let need_shoes = tmp.join(',');
                actions.setNeed_shoes(need_shoes);
            }
        }
        else if (category === 'need_acc') {
            if (contents.etc === '') {
                let need_acc = contents.needlist.join(',');
                actions.setNeed_acc(need_acc);
            }
            else {
                let tmp = contents.needlist.slice();
                tmp.splice(tmp.indexOf('기타'), 1, contents.etc);
                let need_acc = tmp.join(',');
                actions.setNeed_acc(need_acc);
            }
        }
        else if (category === 'wanted_fitting_top') {
            if (contents.etc === '') {
                let wanted_fitting_top = contents.fit.join(',');
                actions.setWanted_fitting_top(wanted_fitting_top);
            }
            else {
                let tmp = contents.fit.slice();
                tmp.splice(tmp.indexOf('기타'), 1, contents.etc);
                let wanted_fitting_top = tmp.join(',');
                actions.setWanted_fitting_top(wanted_fitting_top);
            }
        }
        else if (category === 'wanted_fitting_bottom') {
            if (contents.etc === '') {
                let wanted_fitting_bottom = contents.fit.join(',');
                actions.setWanted_fitting_bottom(wanted_fitting_bottom);
            }
            else {
                let tmp = contents.fit.slice();
                tmp.splice(tmp.indexOf('기타'), 1, contents.etc);
                let wanted_fitting_bottom = tmp.join(',');
                actions.setWanted_fitting_bottom(wanted_fitting_bottom);
            }
        }
        else if (category === 'budget') {
            if (contents.budget_outer === '직접입력') {
                actions.setBudget_outer(contents.etc_outer);
            }
            else {
                actions.setBudget_outer(contents.budget_outer);
            }
            if (contents.budget_top === '직접입력') {
                actions.setBudget_top(contents.etc_top);
            }
            else {
                actions.setBudget_top(contents.budget_top);
            }
            if (contents.budget_bottom === '직접입력') {
                actions.setBudget_bottom(contents.etc_bottom);
            }
            else {
                actions.setBudget_bottom(contents.budget_bottom);
            }
            if (contents.budget_shoes === '직접입력') {
                actions.setBudget_shoes(contents.etc_shoes);
            }
            else {
                actions.setBudget_shoes(contents.budget_shoes);
            }
            if (contents.budget_acc === '직접입력') {
                actions.setBudget_acc(contents.etc_acc);
            }
            else {
                actions.setBudget_acc(contents.budget_acc);
            }
        }
        else if (category === 'requirements') {
            actions.setRequirements(contents);
        }
    }

    useEffect(() => {
        // console.log(contents);
    }, [contents]);

    return (
        next ?
            <TouchableOpacity onPress={() => {
                if (index === 'Intro0') {
                    if (info.login_state === 0) {
                        navigation.push('LoginModal');
                    }
                    else if (info.login_state === 1) {
                        navigation.navigate(index);
                    }
                }
                else {
                    navigation.navigate(index);
                }
                onPress();
            }}
                style={{
                    justifyContent: 'center', alignItems: 'center', width: '70%', height: 50,
                    position: 'absolute', bottom: 10, backgroundColor: '#464646', borderRadius: 30,
                }} activeOpacity={0.8}>
                <Text style={{ color: '#ffffff', fontSize: 20, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }} >{title}</Text>
            </TouchableOpacity> :
            <TouchableOpacity onPress={() => {
                toast.show('필수로 입력해주세요!');
            }}
                style={{ justifyContent: 'center', alignItems: 'center', width: '70%', height: 50, position: 'absolute', bottom: 10, backgroundColor: '#464646', borderRadius: 30, }}
                activeOpacity={0.8}>
                <Text style={{ color: '#ffffff', fontSize: 20, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }} >{title}</Text>
                <Toast ref={(toast) => this.toast = toast} style={{ backgroundColor: '#000000' }} position='top' positionValue={-50} />
            </TouchableOpacity>
    );
}

export default FloatingButton;