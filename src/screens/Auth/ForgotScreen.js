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
  Icon,
  Header,
  Left,
  Body,
  View,
  Spinner,
} from 'native-base';
import {styles} from '../../styles/MainStyles';
import {ToastAndroid} from 'react-native';
import {forgorPasswordServices} from '../../services/AuthServices';

const ForgotScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onClickSend = () => {
    if (email === '') {
      ToastAndroid.show('Harap isi dengan benar', ToastAndroid.LONG);
    } else {
      setLoading(true);
      forgorPasswordServices(email)
        .then(() => {
          setLoading(false);
          ToastAndroid.show('Berhasil mengirim token', ToastAndroid.LONG);
          navigation.navigate('Reset', {email});
        })
        .catch((err) => {
          console.log(err.response);
          ToastAndroid.show('Berhasil mengirim token', ToastAndroid.LONG);
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
        <H1>Lupa Kata Sandi</H1>
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
        </Form>
        <Button
          style={styles.marginV8}
          block
          disabled={loading}
          onPress={onClickSend}>
          {loading && <Spinner color="white" />}
          <Text>Kirim Token</Text>
        </Button>
        <Text
          style={[styles.tetxCenter, styles.marginV8]}
          onPress={() => navigation.navigate('Reset')}>
          Sudah menerima token?
        </Text>
      </Content>
    </Container>
  );
};

export default ForgotScreen;
