import {
  Button,
  Container,
  Content,
  H1,
  H3,
  Icon,
  Spinner,
  Text,
  View,
} from 'native-base';
import React, {useState} from 'react';
import {ToastAndroid} from 'react-native';
import {useDispatch} from 'react-redux';
import {clearToken} from '../../redux/action';
import {sendVerificationServices} from '../../services/AuthServices';
import {getProfileServices} from '../../services/UserServices';
import {styles} from '../../styles/MainStyles';

const VerifyScreen = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(clearToken());
  };

  const onClickSend = () => {
    setLoading(true);
    sendVerificationServices()
      .then(() => {
        ToastAndroid.show('Email verifikasi terkirim', ToastAndroid.LONG);
      })
      .catch((err) => {
        ToastAndroid.show('Email verifikasi gagal', ToastAndroid.LONG);
        console.log(err.response.data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      <Content contentContainerStyle={styles.contentContainer}>
        <View style={[styles.contentCard, styles.alignCenter]}>
          <Icon name="checkmark-circle" />
          <H3 style={styles.margin8}>Harap verifikasi email</H3>
          <View style={styles.margin16}>
            <Text style={styles.tetxCenter}>Belum menerima email?</Text>
            <Button transparent block disabled={loading} onPress={onClickSend}>
              {loading && <Spinner color="blue" />}
              <Text>Kirim email verifikasi</Text>
            </Button>
            <Text
              style={[styles.marginV16, styles.tetxCenter]}
              onPress={() =>
                getProfileServices(
                  () => console.log('beres'),
                  (e) => console.log(e),
                )
              }>
              Sudah Verifikasi?{'\n'}Klik disini untuk muat ulang
            </Text>
          </View>
          <View style={styles.flexRow}>
            <View style={styles.flex1} />
            <Button transparent>
              <Icon name="exit" />
              <Text onPress={onClickLogout}>Keluar</Text>
            </Button>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default VerifyScreen;
