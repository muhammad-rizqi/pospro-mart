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
  Left,
  Body,
} from 'native-base';

const RegisterScreen = ({navigation}) => {
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
      <Content>
        <H1>Register</H1>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input />
          </Item>
          <Item floatingLabel success>
            <Label>Password</Label>
            <Input secureTextEntry />
            <Icon name="checkmark-circle" />
          </Item>
        </Form>
        <Button
          block
          style={{margin: 16}}
          onPress={() => navigation.navigate('Login')}>
          <Text>Register</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default RegisterScreen;
