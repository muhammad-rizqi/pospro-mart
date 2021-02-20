import React, {useState} from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  CheckBox,
  View,
  Spinner,
  H3,
  H1,
} from 'native-base';
import {useDispatch} from 'react-redux';
import {changeToken, setUser} from '../../redux/action';
import {loginServices} from '../../services/AuthServices';
import {storeToken} from '../../services/token/Token';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../../styles/MainStyles';
import {StatusBar, ToastAndroid} from 'react-native';
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onClickLogin = async () => {
    if (email === '' || password === '') {
      ToastAndroid.show('Harap isi dengan benar', ToastAndroid.LONG);
    } else {
      setLoading(true);
      try {
        const {data} = await loginServices(email, password, remember ? 1 : 0);
        setLoading(false);
        if (data.code === 200) {
          if (remember) {
            storeToken(data.data.token);
          }
          dispatch(setUser(data.data.user));
          dispatch(changeToken(data.data.token));
        }
      } catch (error) {
        setLoading(false);
        ToastAndroid.show(error.response.data.errorDetails, ToastAndroid.LONG);
        console.log(error.response);
      }
    }
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
      <Content contentContainerStyle={styles.contentContainer}>
        <View style={styles.contentCard}>
          <H1 style={[styles.tetxCenter, styles.marginV16]}>POSpro Mart</H1>
          <H3 style={styles.marginV8}>Masuk</H3>
          <Form>
            <Item regular style={styles.input}>
              <Icon name="at" size={20} style={styles.marginH8} />
              <Input
                placeholder="Email"
                onChangeText={(e) => setEmail(e)}
                keyboardType="email-address"
              />
            </Item>
            <Item regular style={styles.input}>
              <Icon name="lock" size={20} style={styles.marginH8} />
              <Input
                placeholder="Kata Sandi"
                onChangeText={(p) => setPassword(p)}
                secureTextEntry
              />
            </Item>
            <View style={[styles.flexRow, styles.marginV8]}>
              <CheckBox
                checked={remember}
                onPress={() => setRemember(!remember)}
                style={styles.marginR16}
              />
              <Text
                style={styles.centerFlex1}
                onPress={() => setRemember(!remember)}>
                Ingat saya?
              </Text>
              <Text
                style={styles.tetxCenter}
                onPress={() => navigation.navigate('Forgot')}>
                Lupa Kata Sandi?
              </Text>
            </View>
          </Form>
          <Button
            block
            disabled={loading}
            onPress={onClickLogin}
            style={styles.marginV8}>
            {loading && <Spinner color="white" />}
            <Text>Masuk</Text>
          </Button>
          <View style={styles.marginV16}>
            <Text style={styles.tetxCenter}>Belum punya akun?</Text>
            <Text
              style={[styles.tetxCenter, styles.textBold]}
              onPress={() => navigation.navigate('Register')}>
              Daftar Sekarang !
            </Text>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default LoginScreen;
