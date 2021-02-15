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
      <Content style={styles.padding16}>
        <H1>Mendaftar</H1>
        <Form>
          <View style={styles.marginV8}>
            <Text note>Nama Lengkap</Text>
            <Item regular>
              <Input placeholder="Masukkan Nama Lengkap" />
            </Item>
          </View>
          <View style={styles.marginV8}>
            <Text note>Email</Text>
            <Item regular>
              <Input
                placeholder="user@email.com"
                keyboardType="email-address"
              />
            </Item>
          </View>
          <View style={styles.marginV8}>
            <Text note>Nomor HP</Text>
            <Item regular>
              <Input placeholder="62812345678" keyboardType="phone-pad" />
            </Item>
          </View>
          <View style={styles.marginV8}>
            <Text note>Kata Sandi</Text>
            <Item regular>
              <Input placeholder="password" secureTextEntry />
            </Item>
          </View>
          <View style={styles.marginV8}>
            <Text note>Konfirmasi Kata Sandi</Text>
            <Item regular>
              <Input placeholder="password" secureTextEntry />
            </Item>
          </View>
        </Form>
        <Button
          style={styles.marginV8}
          block
          onPress={() => navigation.navigate('Login')}>
          <Text>Mendaftar</Text>
        </Button>
        <View style={styles.marginV8} />
      </Content>
    </Container>
  );
};

export default RegisterScreen;
