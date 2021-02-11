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
} from 'native-base';
import {useDispatch} from 'react-redux';
import {changeToken, setUser} from '../../redux/action';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const onClickLogin = () => {
    dispatch(changeToken(email));
    dispatch(setUser({role: Number(email)}));
  };

  return (
    <Container>
      <Header transparent />
      <Content>
        <H1>Login</H1>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={(e) => setEmail(e)} />
          </Item>
          <Item floatingLabel success>
            <Label>Password</Label>
            <Input secureTextEntry />
            <Icon name="checkmark-circle" />
          </Item>
          <Text onPress={() => navigation.navigate('Forgot')}>
            Lupa Kata Sandi?
          </Text>
        </Form>
        <Button block style={{margin: 16}} onPress={onClickLogin}>
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
