import React, {useState} from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Icon,
  View,
  Spinner,
  H3,
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
      <Content contentContainerStyle={styles.contentContainer}>
        <View style={styles.contentCard}>
          <View style={styles.flexRow}>
            <Icon onPress={() => navigation.goBack()} name="arrow-back" />
          </View>
          <View style={styles.marginV8} />
          <H3>Lupa Kata Sandi</H3>
          <Form>
            <View style={styles.marginV8}>
              <Text note>Email</Text>
              <Item regular style={styles.radius5}>
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
        </View>
      </Content>
    </Container>
  );
};

export default ForgotScreen;
