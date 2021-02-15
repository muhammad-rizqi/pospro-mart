import React from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  H1,
  Button,
  Text,
  Icon,
  Header,
  Left,
  Body,
  View,
} from 'native-base';
import {styles} from '../../styles/MainStyles';

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
      <Content style={styles.padding16}>
        <H1>Lupa Kata Sandi</H1>
        <Form>
          <View style={styles.marginV8}>
            <Text note>Email</Text>
            <Item regular>
              <Input
                placeholder="user@email.com"
                keyboardType="email-address"
              />
            </Item>
          </View>
        </Form>
        <Button
          style={styles.marginV8}
          block
          onPress={() => navigation.navigate('Login')}>
          <Text>Kirim Token</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default ForgotScreen;
