import React, {useState} from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  H1,
  Header,
  Icon,
  Input,
  Item,
  Left,
  Spinner,
  Text,
  View,
} from 'native-base';
import {ToastAndroid} from 'react-native';
import {styles} from '../../styles/MainStyles';
import {resetPasswordServices} from '../../services/AuthServices';
const ResetScreen = ({navigation, route}) => {
  const [email, setEmail] = useState(route.params ? route.params.email : '');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onClickSend = () => {
    if (
      email === '' ||
      token === '' ||
      password === '' ||
      confirm !== password
    ) {
      ToastAndroid.show('Harap isi dengan benar', ToastAndroid.LONG);
    } else {
      setLoading(true);
      resetPasswordServices(email, token, password, confirm)
        .then(() => {
          setLoading(false);
          ToastAndroid.show('Berhasil merubah kata sandi', ToastAndroid.LONG);
          navigation.navigate('Login');
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response);
          ToastAndroid.show('Berhasil merubah kata sandi', ToastAndroid.LONG);
        });
    }
  };

  return (
    <Container>
      <Header transparent>
        <Left>
          <Button dark transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body />
      </Header>
      <Content style={styles.padding16}>
        <H1>Ini Halaman Reset</H1>
        <Form>
          <View style={styles.marginV8}>
            <Text note>Email</Text>
            <Item regular>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="user@email.com"
                keyboardType="email-address"
              />
            </Item>
          </View>
          <View style={styles.marginV8}>
            <Text note>Token</Text>
            <Item regular>
              <Input
                value={token}
                onChangeText={setToken}
                placeholder="Masukkan Token"
                multiline
              />
            </Item>
          </View>
          <View style={styles.marginV8}>
            <Text note>Kata Sandi Baru</Text>
            <Item regular>
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder="password"
                secureTextEntry
              />
            </Item>
          </View>
          <View style={styles.marginV8}>
            <Text note>Konfirmasi Kata Sandi Baru</Text>
            <Item regular>
              <Input
                value={confirm}
                onChangeText={setConfirm}
                placeholder="password"
                secureTextEntry
              />
            </Item>
          </View>
        </Form>
        <Button
          style={styles.marginV8}
          block
          disabled={loading}
          onPress={onClickSend}>
          {loading && <Spinner color="white" />}
          <Text>Ubah Kata Sandi</Text>
        </Button>
        <Text
          style={[styles.tetxCenter, styles.marginV8]}
          onPress={() => navigation.goBack()}>
          Belum menerima token?
        </Text>
      </Content>
    </Container>
  );
};

export default ResetScreen;
