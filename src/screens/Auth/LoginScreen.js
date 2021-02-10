import React from 'react';
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

const LoginScreen = ({navigation}) => {
  return (
    <Container>
      <Header transparent />
      <Content>
        <H1>Login</H1>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input />
          </Item>
          <Item floatingLabel success>
            <Label>Password</Label>
            <Input secureTextEntry />
            <Icon name="checkmark-circle" />
          </Item>
          <Text>Lupa Kata Sandi?</Text>
        </Form>
        <Button block style={{margin: 16}}>
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
