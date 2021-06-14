import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../../../../components/Header';
import FloatingButton from '../../../../components/FloatingButton';

const Survey9 = ({ navigation, }) => {
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    const [outerbudget, setOuterbudget] = useState('0~5만원');
    const [outeretc, setOuterEtc] = useState('');
    const [topbudget, setTopbudget] = useState('0~3만원');
    const [topetc, setTopEtc] = useState('');
    const [bottombudget, setBottombudget] = useState('0~3만원');
    const [bottometc, setBottomEtc] = useState('');
    const [shoebudget, setShoebudget] = useState('0~5만원');
    const [shoeetc, setShoeEtc] = useState('');
    const [accbudget, setAccbudget] = useState('0~3만원');
    const [accetc, setAccEtc] = useState('');
    const [istouched1, setIstouched1] = useState(false);
    const [istouched2, setIstouched2] = useState(false);
    const [istouched3, setIstouched3] = useState(false);
    const [istouched4, setIstouched4] = useState(false);
    const [istouched5, setIstouched5] = useState(false);
    const [next, setNext] = useState(false);
    const [next1, setNext1] = useState(true);
    const [next2, setNext2] = useState(true);
    const [next3, setNext3] = useState(true);
    const [next4, setNext4] = useState(true);
    const [next5, setNext5] = useState(true);

    const contents = {
        budget_outer: outerbudget,
        etc_outer: outeretc,
        budget_top: topbudget,
        etc_top: topetc,
        budget_bottom: bottombudget,
        etc_bottom: bottometc,
        budget_shoes: shoebudget,
        etc_shoes: shoeetc,
        budget_acc: accbudget,
        etc_acc: accetc,
    }

    const changeState = (category, itemValue) => {
        if (category === 'outer') {
            setOuterbudget(itemValue);
        }
        else if (category === 'top') {
            setTopbudget(itemValue);
        }
        else if (category === 'bottom') {
            setBottombudget(itemValue);
        }
        else if (category === 'shoe') {
            setShoebudget(itemValue);
        }
        else if (category === 'acc') {
            setAccbudget(itemValue);
        }
    }

    useEffect(() => {
        console.log(contents);
    }, [contents]);

    useEffect(() => {
        if(next1 === true && next2 === true && next3 === true && next4 === true && next5 === true){
            setNext(true);
        }
        else {
            setNext(false);
        }
    }, [next1, next2, next3, next4, next5])

    useEffect(() => {
        if (outerbudget === '직접입력') {
            setIstouched1(true);
            if (contents.etc_outer.length === 0) setNext1(false);
            else setNext1(true);
        }
        else {
            setIstouched1(false);
            setOuterEtc('');
            setNext1(true);
        }
    }, [outerbudget, outeretc])
    useEffect(() => {
        if (topbudget === '직접입력') {
            setIstouched2(true);
            if (contents.etc_top.length === 0) setNext2(false);
            else setNext2(true);
        }
        else {
            setIstouched2(false);
            setTopEtc('');
            setNext2(true);
        }
    }, [topbudget, topetc])
    useEffect(() => {
        if (bottombudget === '직접입력') {
            setIstouched3(true);
            if (contents.etc_bottom.length === 0) setNext3(false);
            else setNext3(true);
        }
        else {
            setIstouched3(false);
            setBottomEtc('');
            setNext3(true);
        }
    }, [bottombudget, bottometc])
    useEffect(() => {
        if (shoebudget === '직접입력') {
            setIstouched4(true);
            if (contents.etc_shoes.length === 0) setNext4(false);
            else setNext4(true);
        }
        else {
            setIstouched4(false);
            setShoeEtc('');
            setNext4(true);
        }
    }, [shoebudget, shoeetc])
    useEffect(() => {
        if (accbudget === '직접입력') {
            setIstouched5(true);
            if (contents.etc_acc.length === 0) setNext5(false);
            else setNext5(true);
        }
        else {
            setIstouched5(false);
            setAccEtc('');
            setNext5(true);
        }
    }, [accbudget, accetc])

    const outer = [
        {
            label: '0~5만원',
            value: '0~5만원'
        },
        {
            label: '5~8만원',
            value: '5~8만원'
        },
        {
            label: '8~12만원',
            value: '8~12만원'
        },
        {
            label: '12~16만원',
            value: '12~16만원'
        },
        {
            label: '16~20만원',
            value: '16~20만원'
        },
        {
            label: '직접입력',
            value: '직접입력'
        },
        {
            label: '원하지 않아요!',
            value: '원하지 않아요!'
        },
    ]

    const top = [
        {
            label: '0~3만원',
            value: '0~3만원'
        },
        {
            label: '3~5만원',
            value: '3~5만원'
        },
        {
            label: '5~7만원',
            value: '5~7만원'
        },
        {
            label: '7~9만원',
            value: '7~9만원'
        },
        {
            label: '9~11만원',
            value: '9~11만원'
        },
        {
            label: '11~15만원',
            value: '11~15만원'
        },
        {
            label: '직접입력',
            value: '직접입력'
        },
        {
            label: '원하지 않아요!',
            value: '원하지 않아요!'
        },
    ]

    const bottom = [
        {
            label: '0~3만원',
            value: '0~3만원'
        },
        {
            label: '3~6만원',
            value: '3~6만원'
        },
        {
            label: '6~9만원',
            value: '6~9만원'
        },
        {
            label: '9~12만원',
            value: '9~12만원'
        },
        {
            label: '12~15만원',
            value: '12~15만원'
        },
        {
            label: '직접입력',
            value: '직접입력'
        },
        {
            label: '원하지 않아요!',
            value: '원하지 않아요!'
        },
    ]

    const shoe = [
        {
            label: '0~5만원',
            value: '0~5만원'
        },
        {
            label: '5~8만원',
            value: '5~8만원'
        },
        {
            label: '8~13만원',
            value: '8~13만원'
        },
        {
            label: '13~20만원',
            value: '13~20만원'
        },
        {
            label: '직접입력',
            value: '직접입력'
        },
        {
            label: '원하지 않아요!',
            value: '원하지 않아요!'
        },
    ]

    const acc = [
        {
            label: '0~3만원',
            value: '0~3만원'
        },
        {
            label: '3~5만원',
            value: '3~5만원'
        },
        {
            label: '5~7만원',
            value: '5~7만원'
        },
        {
            label: '7~9만원',
            value: '7~9만원'
        },
        {
            label: '직접입력',
            value: '직접입력'
        },
        {
            label: '원하지 않아요!',
            value: '원하지 않아요!'
        },
    ]

    const BudgetPicker = ({ title, calvalue, budget, category }) => {
        return (
            <View style={{ width: '80%', justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                <Text style={{ fontFamily: 'NotoSansKR-Regular', fontSize: 25, includeFontPadding: false, paddingVertical: 18 }} >{title}</Text>
                <View style={{ width: '95%', borderWidth: 1, borderColor: '#dcdcdc', borderRadius: 3 }}>
                    <Picker
                        selectedValue={calvalue}
                        onValueChange={(itemValue) => {
                            changeState(category, itemValue)
                        }} style={{ width: '100%', color: '#000000', fontSize: 20 }} dropdownIconColor='#000000' mode='dropdown'
                        itemStyle={{ backgroundColor: '#ffffff', color: '#000000' }}>
                        {budget.map((budget) => {
                            return (
                                <Picker.Item label={budget.label} value={budget.value} key={budget.value} />
                            )
                        })}
                    </Picker>
                </View>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
                    {/* Header */}
                    <Header title='설문조사' navigation={navigation} isMain={false} />
                    {/* Body */}
                    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
                        <Text style={{ width: '80%', marginVertical: 20, fontSize: 35, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>가격대를 설정해 주세요.</Text>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }} >
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                                <BudgetPicker title='아우터' calvalue={outerbudget} budget={outer} category='outer' />
                                {istouched1 === true ?
                                    <TextInput color='#000000' fontSize={18} placeholder='ex) 6~8만원' placeholderTextColor='#d2d2d2' onChangeText={(budget) => setOuterEtc(budget)}
                                        maxLength={10}
                                        style={{ width: '70%', paddingVertical: 4, borderBottomWidth: 1 }} /> : null}
                            </View>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                                <BudgetPicker title='상의' calvalue={topbudget} budget={top} category='top' />
                                {istouched2 === true ?
                                    <TextInput color='#000000' fontSize={18} placeholder='ex) 6~8만원' placeholderTextColor='#d2d2d2' onChangeText={(budget) => setTopEtc(budget)}
                                        maxLength={10}
                                        style={{ width: '70%', paddingVertical: 4, borderBottomWidth: 1 }} /> : null}
                            </View>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                                <BudgetPicker title='하의' calvalue={bottombudget} budget={bottom} category='bottom' />
                                {istouched3 === true ?
                                    <TextInput color='#000000' fontSize={18} placeholder='ex) 6~8만원' placeholderTextColor='#d2d2d2' onChangeText={(budget) => setBottomEtc(budget)}
                                        maxLength={10}
                                        style={{ width: '70%', paddingVertical: 4, borderBottomWidth: 1 }} /> : null}
                            </View>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                                <BudgetPicker title='신발' calvalue={shoebudget} budget={shoe} category='shoe' />
                                {istouched4 === true ?
                                    <TextInput color='#000000' fontSize={18} placeholder='ex) 6~8만원' placeholderTextColor='#d2d2d2' onChangeText={(budget) => setShoeEtc(budget)}
                                        maxLength={10}
                                        style={{ width: '70%', paddingVertical: 4, borderBottomWidth: 1 }} /> : null}
                            </View>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                                <BudgetPicker title='ACC' calvalue={accbudget} budget={acc} category='acc' />
                                {istouched5 === true ?
                                    <TextInput color='#000000' fontSize={18} placeholder='ex) 6~8만원' placeholderTextColor='#d2d2d2' onChangeText={(budget) => setAccEtc(budget)}
                                        maxLength={10}
                                        style={{ width: '70%', paddingVertical: 4, borderBottomWidth: 1 }} /> : null}
                            </View>
                            <View flexDirection='row' style={{ width: '80%', flex: 1, }}>
                            </View>
                            <View style={{ width: '100%', height: 80 }} />
                        </ScrollView>
                        <FloatingButton title='다음' navigation={navigation} index='Survey10' category='budget' contents={contents} next={next} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Survey9;