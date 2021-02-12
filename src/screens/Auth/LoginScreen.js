import React, {useState} from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  H1,
  Button,
  Text,
  Icon,
  Header,
  ListItem,
  CheckBox,
  Body,
  View,
  Spinner,
} from 'native-base';
import {useDispatch} from 'react-redux';
import {changeToken, setUser} from '../../redux/action';
import {loginServices} from '../../services/AuthServices';
import {storeToken} from '../../services/token/Token';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onClickLogin = async () => {
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
      console.log(error);
    }
  };

  return (
    <Container>
      <Header transparent />
      <Content>
        <H1>Login</H1>
        <Form>
          <ListItem noBorder>
            <Item rounded>
              <Input
                placeholder="Email"
                onChangeText={(e) => setEmail(e)}
                keyboardType="email-address"
              />
            </Item>
          </ListItem>
          <ListItem noBorder>
            <Item rounded>
              <Input
                placeholder="Password"
                onChangeText={(p) => setPassword(p)}
                secureTextEntry
              />
            </Item>
          </ListItem>
          <ListItem noBorder>
            <CheckBox
              checked={remember}
              onPress={() => setRemember(!remember)}
            />
            <Body>
              <Text>Ingat saya?</Text>
            </Body>
          </ListItem>
          <Text onPress={() => navigation.navigate('Forgot')}>
            Lupa Kata Sandi?
          </Text>
        </Form>
        <Button
          block
          style={{margin: 16}}
          disabled={loading}
          onPress={onClickLogin}>
          {loading && <Spinner color="white" />}
          <Text>Login</Text>
        </Button>
        <Text>or</Text>
        <Button
          block
          style={{margin: 16}}
          success
          onPress={() => navigation.navigate('Register')}>
          <Text>Register</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default LoginScreen;
