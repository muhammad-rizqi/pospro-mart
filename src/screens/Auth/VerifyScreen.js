import {Button, Container, Content, H1, Spinner, Text} from 'native-base';
import React, {useState} from 'react';
import {ToastAndroid} from 'react-native';
import {sendVerificationServices} from '../../services/AuthServices';
import {getProfileServices} from '../../services/UserServices';

const VerifyScreen = () => {
  const [loading, setLoading] = useState(false);

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
      <Content>
        <H1>Harap verifikasi email</H1>
        <Button disabled={loading} onPress={onClickSend}>
          {loading && <Spinner color="white" />}
          <Text>Kirim email verifikasi</Text>
        </Button>
        <Text onPress={getProfileServices()}>Sudah Verifikasi?</Text>
      </Content>
    </Container>
  );
};

export default VerifyScreen;
