import React, {useState} from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  H1,
  Button,
  Text,
  Header,
  CheckBox,
  View,
  Spinner,
} from 'native-base';
import {useDispatch} from 'react-redux';
import {changeToken, setUser} from '../../redux/action';
import {loginServices} from '../../services/AuthServices';
import {storeToken} from '../../services/token/Token';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../../styles/MainStyles';
import {ToastAndroid} from 'react-native';
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
      <Header transparent />
      <Content style={styles.padding16}>
        <H1 style={styles.marginV8}>Login</H1>
        <Form>
          <Item regular style={styles.marginV8}>
            <Icon name="at" size={20} style={styles.marginH8} />
            <Input
              placeholder="Email"
              onChangeText={(e) => setEmail(e)}
              keyboardType="email-address"
            />
          </Item>
          <Item regular style={styles.marginV8}>
            <Icon name="lock" size={20} style={styles.marginH8} />
            <Input
              placeholder="Password"
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
          </View>
        </Form>
        <Button
          block
          disabled={loading}
          onPress={onClickLogin}
          style={styles.marginV8}>
          {loading && <Spinner color="white" />}
          <Text>Login</Text>
        </Button>
        <Text style={styles.tetxCenter}>or</Text>
        <Button
          block
          success
          onPress={() => navigation.navigate('Register')}
          style={styles.marginV8}>
          <Text>Register</Text>
        </Button>
        <Text
          style={styles.tetxCenter}
          onPress={() => navigation.navigate('Forgot')}>
          Lupa Kata Sandi?
        </Text>
      </Content>
    </Container>
  );
};

export default LoginScreen;
