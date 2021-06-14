import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
/* 아임포트 모듈을 불러옵니다. */
import IMP from 'iamport-react-native';
import { UserContext } from '../../../context/UserContext';
import { RequestContext } from '../../../context/RequestContext';

function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='#000000' />
            <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 30 }}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        ...StyleSheet.absoluteFillObject,
    },
});

const Payment_View = ({ navigation, route }) => {
    const pay_method = route.params;

    const [info, useractions] = useContext(UserContext);

    const [survey, request, photo, actions] = useContext(RequestContext);

    /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
    const callback = (response) => {
        console.log(response);
        if (response.imp_success === 'false') {
            navigation.replace('Payment_Fail', response);
        }
        else {
            navigation.replace('Payment_Success', pay_method);
        }
    }

    /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
    const data = {
        pg: 'html5_inicis',
        pay_method: pay_method,
        name: 'Style Recipe',
        merchant_uid: request.ordernum,
        amount: '100',
        buyer_name: info.name,
        buyer_tel: info.phone_number,
        app_scheme: 'example',
        digital: false,
        // [Deprecated v1.0.3]: m_redirect_url
    };

    return (
        <IMP.Payment
            userCode={'imp64659488'}  // 가맹점 식별코드
            loading={<Loading />} // 웹뷰 로딩 컴포넌트
            data={data}           // 결제 데이터
            callback={callback}   // 결제 종료 후 콜백
        />
    );
}

export default Payment_View;