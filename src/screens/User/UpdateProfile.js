import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Left,
  Right,
  Spinner,
  Text,
  Thumbnail,
  Title,
  View,
} from 'native-base';
import React, {useState} from 'react';
import {ToastAndroid, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {
  getProfileServices,
  updateProfileServices,
} from '../../services/UserServices';
import {styles} from '../../styles/MainStyles';

const UpdateProfile = ({navigation}) => {
  const {user} = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [nama, setNama] = useState(user.nama);
  const [email, setEmail] = useState(user.email);
  const [foto, setFoto] = useState({uri: user.foto});
  const [noHp, setnoHp] = useState(user.no_hp);
  const [umur, setUmur] = useState(user.umur);
  const [alamat, setAlamat] = useState(user.alamat);

  const onClickUpdate = () => {
    if (
      nama === '' ||
      email === '' ||
      noHp === '' ||
      umur === '' ||
      alamat === ''
    ) {
      ToastAndroid.show('Isi dengan benar', ToastAndroid.LONG);
    } else {
      setLoading(true);
      updateProfileServices(
        foto.fileName ? foto : null,
        nama,
        email === user.email ? null : email,
        noHp,
        umur,
        alamat,
      )
        .then(() => {
          ToastAndroid.show('Berhasil merubah profile', ToastAndroid.LONG);
          getProfileServices(
            () => navigation.goBack(),
            () => ToastAndroid.show('Error mengambil data', ToastAndroid.LONG),
          );
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response);
        });
    }
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.uri) {
        setFoto(response);
      }
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
          <Title>Update Profile</Title>
        </Body>
        <Right />
      </Header>
      <Content style={styles.padding16}>
        <Form>
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Thumbnail style={styles.avatarCenterLarge} source={foto} />
          </TouchableOpacity>
          <View style={styles.marginV8}>
            <Text note>Nama Lengkap</Text>
            <Item regular>
              <Input
                placeholder="Nama Lengkap"
                value={nama}
                onChangeText={setNama}
              />
            </Item>
          </View>
          <View style={styles.marginV8}>
            <Text note>Email</Text>
            <Item regular>
              <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
            </Item>
          </View>
          <View style={styles.marginV8}>
            <Text note>No Telepon</Text>
            <Item regular>
              <Input
                placeholder="No Telepon"
                value={`${noHp}`}
                onChangeText={setnoHp}
              />
            </Item>
          </View>
          <View style={styles.marginV8}>
            <Text note>Umur0</Text>
            <Item regular>
              <Input
                placeholder="Umur"
                value={`${umur}`}
                onChangeText={setUmur}
              />
            </Item>
          </View>
          <View style={styles.marginV8}>
            <Text note>Alamat</Text>
            <Item regular>
              <Input
                multiline
                placeholder="Alamat"
                value={alamat}
                onChangeText={setAlamat}
              />
            </Item>
          </View>
          <Button
            rounded
            block
            style={styles.marginV8}
            disabled={loading}
            onPress={onClickUpdate}>
            {loading && <Spinner color="white" />}
            <Text>Update Profile</Text>
          </Button>
        </Form>
        <View style={styles.marginV16} />
      </Content>
    </Container>
  );
};

export default UpdateProfile;
