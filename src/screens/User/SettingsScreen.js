import {
  Body,
  Button,
  Container,
  Content,
  Form,
  H3,
  Header,
  Icon,
  Input,
  Item,
  Left,
  Right,
  Spinner,
  Text,
  Title,
  View,
} from 'native-base';
import React, {useState} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {logout} from '../../services/AuthServices';
import {
  changePasswordServices,
  deleteAccountServices,
} from '../../services/UserServices';
import {styles} from '../../styles/MainStyles';

const SettingsScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onClickChange = () => {
    if (password === '' || password !== confirm) {
      ToastAndroid.show('Harap isi dengan benar', ToastAndroid.LONG);
    } else {
      setLoading(true);
      changePasswordServices(password, confirm)
        .then(() => {
          ToastAndroid.show(
            'Password berhasil diubah silahkan login ulang',
            ToastAndroid.LONG,
          );
          logout();
        })
        .catch((err) => {
          ToastAndroid.show('Gagal merubah sandi', ToastAndroid.LONG);
          console.log(err.response);
          setLoading(false);
        });
    }
  };

  const openDeleteAlert = () =>
    Alert.alert(
      'Anda Yakin?',
      'Anda yakin akan menghapus akun?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => onClickDelete},
      ],
      {cancelable: false},
    );

  const onClickDelete = () => {
    setDeleteLoading(true);
    deleteAccountServices()
      .then(() => {
        ToastAndroid.show('Akun Berhasil dihapus', ToastAndroid.LONG);
        logout();
      })
      .catch((err) => {
        ToastAndroid.show('gagal menghapus akun', ToastAndroid.LONG);
        console.log(err.response);
        setDeleteLoading(false);
      });
  };

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Pengaturan</Title>
        </Body>
        <Right />
      </Header>
      <Content style={styles.padding16}>
        <H3>Ubah Kata Sandi</H3>
        <Form>
          <View style={styles.marginV8}>
            <Text note>Kata Sandi Baru</Text>
            <Item regular>
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder="password"
                secureTextEntry
              />
            </Item>
          </View>
          <View style={styles.marginV8}>
            <Text note>Konfirmasi Kata Sandi Baru</Text>
            <Item regular>
              <Input
                value={confirm}
                onChangeText={setConfirm}
                placeholder="password"
                secureTextEntry
              />
            </Item>
          </View>
        </Form>
        <Button
          style={styles.marginV8}
          block
          disabled={loading}
          onPress={onClickChange}>
          {loading && <Spinner color="white" />}
          <Text>Ubah Kata Sandi</Text>
        </Button>

        <Button
          style={styles.marginV8}
          block
          danger
          disabled={deleteLoading}
          onPress={openDeleteAlert}>
          {deleteLoading && <Spinner color="white" />}
          <Text>Hapus Akun</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default SettingsScreen;
