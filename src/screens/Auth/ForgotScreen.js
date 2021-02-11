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

const ForgotScreen = ({navigation}) => {
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
        <H1>Lupa Kata Sandi</H1>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input />
          </Item>
        </Form>
        <Button
          block
          style={{margin: 16}}
          onPress={() => navigation.navigate('Login')}>
          <Text>Kirim Token</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default ForgotScreen;
