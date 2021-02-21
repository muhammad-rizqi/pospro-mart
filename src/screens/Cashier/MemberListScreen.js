import {
  Body,
  Button,
  Container,
  Content,
  Fab,
  Form,
  H3,
  Header,
  Icon,
  Input,
  Item,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Thumbnail,
  Title,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Modal, ToastAndroid} from 'react-native';
import {
  addMemberServices,
  getMemberListServices,
} from '../../services/CashierServices';
import {styles} from '../../styles/MainStyles';

const MemberListScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [dataMember, setDataMember] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modal, setModal] = useState(false);

  const resetState = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
  };

  const getMember = () => {
    setLoading(true);
    getMemberListServices()
      .then((result) => {
        setDataMember(result.data.data);
      })
      .catch((err) => {
        ToastAndroid.show('Gagal mengambil data', ToastAndroid.LONG);
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const onClickAdd = () => {
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
      addMemberServices(name, email, phone, password, confirmPassword)
        .then(() => {
          ToastAndroid.show('Behasil membuat member', ToastAndroid.LONG);
          getMember();
          setModal(false);
          resetState();
        })
        .catch((err) => {
          setLoading(false);
          ToastAndroid.show('Gagal mendaftar', ToastAndroid.LONG);
          console.log(err.response);
        });
    }
  };

  useEffect(() => {
    getMember();
  }, []);

  return (
    <Container>
      <Modal visible={modal} transparent>
        <Content contentContainerStyle={styles.contentContainer}>
          <View style={styles.contentCard}>
            <View style={styles.flexRow}>
              <H3 style={styles.flex1}>Tambah Member</H3>
              <Icon name="close" onPress={() => setModal(false)} />
            </View>
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
              <Button
                block
                style={styles.marginV8}
                disabled={loading}
                onPress={onClickAdd}>
                {loading && <Spinner color="white" />}
                <Text>Tambah Member</Text>
              </Button>
            </Form>
          </View>
        </Content>
      </Modal>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Daftar Member</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          {loading ? (
            <Spinner />
          ) : dataMember.length === 0 ? (
            <Text>Data Kosong</Text>
          ) : (
            dataMember.map((member) => (
              <ListItem key={member.id} thumbnail>
                <Left>
                  <Thumbnail source={{uri: member.foto}} />
                </Left>
                <Body>
                  <Text>{member.nama}</Text>
                  <Text note>{member.kode_member}</Text>
                  <Text note>{member.email}</Text>
                  <Text note numberOfLines={2}>
                    {member.alamat}
                  </Text>
                  <Text note>Telp. {member.no_hp}</Text>
                </Body>
              </ListItem>
            ))
          )}
        </List>
      </Content>
      <Fab
        position="bottomRight"
        onPress={() => setModal(true)}
        style={styles.backgroundPrimary}>
        <Icon name="add" />
      </Fab>
    </Container>
  );
};

export default MemberListScreen;
