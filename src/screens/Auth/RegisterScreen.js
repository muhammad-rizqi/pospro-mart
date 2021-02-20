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
import {registerServices} from '../../services/AuthServices';
import {ToastAndroid} from 'react-native';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onClickRegister = () => {
    if (
      name === '' ||
      email === '' ||
      phone === '' ||
      password === '' ||
      confirmPassword === '' ||
      password !== confirmPassword
    ) {
      ToastAndroid.show('Isi dengan benar', ToastAndroid.LONG);
    } else {
      setLoading(true);
      registerServices(name, email, phone, password, confirmPassword)
        .then((res) => {
          console.log(res);
          ToastAndroid.show(
            'Behasil mendaftar silahkan login',
            ToastAndroid.LONG,
          );
          setLoading(false);
          navigation.navigate('Login');
        })
        .catch((err) => {
          setLoading(false);
          ToastAndroid.show('Gagal mendaftar', ToastAndroid.LONG);
          console.log(err.response);
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
          <H3>Mendaftar</H3>
          <Form>
            <View style={styles.marginV8}>
              <Text note>Nama Lengkap</Text>
              <Item regular style={styles.radius5}>
                <Input
                  placeholder="Nama Lengkap"
                  value={name}
                  onChangeText={setName}
                />
              </Item>
            </View>
            <View style={styles.marginV8}>
              <Text note>Email</Text>
              <Item regular style={styles.radius5}>
                <Input
                  placeholder="user@email.com"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </Item>
            </View>
            <View style={styles.marginV8}>
              <Text note>Nomor HP</Text>
              <Item regular style={styles.radius5}>
                <Input
                  placeholder="62812345678"
                  keyboardType="phone-pad"
                  value={`${phone}`}
                  onChangeText={setPhone}
                />
              </Item>
            </View>
            <View style={styles.marginV8}>
              <Text note>Kata Sandi</Text>
              <Item regular style={styles.radius5}>
                <Input
                  placeholder="password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </Item>
            </View>
            <View style={styles.marginV8}>
              <Text note>Konfirmasi Kata Sandi</Text>
              <Item regular style={styles.radius5}>
                <Input
                  placeholder="password"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </Item>
            </View>
          </Form>
          <Button
            style={styles.marginV8}
            block
            onPress={onClickRegister}
            disabled={loading}>
            {loading && <Spinner color="white" />}
            <Text>Mendaftar</Text>
          </Button>
          <View style={styles.marginV8} />
        </View>
      </Content>
    </Container>
  );
};

export default RegisterScreen;
