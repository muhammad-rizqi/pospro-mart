/* eslint-disable react-native/no-inline-styles */
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
  ListItem,
  Right,
  Spinner,
  Text,
  Thumbnail,
  Title,
  View,
} from 'native-base';
import React, {useState} from 'react';
import {Modal, ToastAndroid} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {getMemberByCode, topUpServices} from '../../services/CashierServices';
import {styles} from '../../styles/MainStyles';

const TopUpScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(0);
  const [topup, setTopup] = useState(0);
  const [memberLoading, setMemberLoading] = useState(false);
  const [member, setMember] = useState(null);
  const [scan, setScan] = useState(false);

  const onSubmitCode = (idMember) => {
    if (idMember === '' || idMember === `${0}`) {
      ToastAndroid.show('Isi dengan benar', ToastAndroid.LONG);
    } else {
      setMemberLoading(true);
      getMemberByCode(idMember)
        .then((result) => {
          setMember(result.data.data);
        })
        .catch((err) => {
          ToastAndroid.show('Gagal mengambil data member', ToastAndroid.LONG);
          console.log(err);
          console.log(err.response);
        })
        .finally(() => {
          setScan(false);
          setMemberLoading(false);
        });
    }
  };

  const onClickTopUp = () => {
    if (member || topup <= 0) {
      setLoading(true);
      topUpServices(member[0].id, topup)
        .then(() => {
          ToastAndroid.show('Berhasil Top Up', ToastAndroid.LONG);
          navigation.navigate('CashierDashboard');
        })
        .catch((err) => {
          ToastAndroid.show('Gagal topup member', ToastAndroid.LONG);
          setLoading(false);
          console.log(err);
          console.log(err.response);
        });
    } else {
      ToastAndroid.show('Isi dengan benar', ToastAndroid.LONG);
    }
  };

  const onReadSuccess = ({data}) => {
    setCode(data);
    onSubmitCode(data);
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
          <Title>Top Up</Title>
        </Body>
        <Right />
      </Header>
      <Modal visible={scan}>
        <QRCodeScanner
          vibrate
          showMarker
          onRead={onReadSuccess}
          reactivate
          reactivateTimeout={5000}
        />
        <Fab
          style={styles.backgroundPrimary}
          position="bottomLeft"
          onPress={() => {
            setScan(false);
          }}>
          <Icon name="arrow-back" />
        </Fab>
        {memberLoading && <Spinner />}
        <H3 style={{color: 'white', textAlign: 'center', margin: 24}}>
          Scan Member
        </H3>
      </Modal>
      <Content style={styles.padding16}>
        <H3 style={styles.marginV16}>Masukkan data topup </H3>
        <Form>
          {memberLoading ? (
            <Spinner />
          ) : (
            member !== null && (
              <>
                <Text note>Data Member</Text>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail source={{uri: member[0].foto}} />
                  </Left>
                  <Body>
                    <Text>{member[0].nama}</Text>
                    <Text note>{member[0].no_hp}</Text>
                    <Text note numberOfLines={2}>
                      {member[0].alamat}
                    </Text>
                  </Body>
                  <Right>
                    <Button danger transparent onPress={() => setMember(null)}>
                      <Icon name="trash" />
                    </Button>
                  </Right>
                </ListItem>
              </>
            )
          )}
          <View style={styles.marginV8}>
            <Text note>ID Member</Text>
            <Item regular style={styles.radius5}>
              <Input
                placeholder="Masukkan ID Member"
                value={`${code}`}
                onChangeText={setCode}
                onBlur={() => onSubmitCode(code)}
                onSubmitEditing={() => onSubmitCode(code)}
              />
              <Icon name="qr-code-outline" onPress={() => setScan(true)} />
            </Item>
          </View>
          <View style={styles.marginV8}>
            <Text note>Jumlah TopUp</Text>
            <Item regular style={styles.radius5}>
              <Input
                placeholder="Masukkan Jumlah Uang"
                value={`${topup}`}
                onChangeText={setTopup}
              />
            </Item>
          </View>
          <Button
            block
            style={styles.marginV8}
            disabled={loading}
            onPress={onClickTopUp}>
            {loading && <Spinner color="white" />}
            <Text>Top Up</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default TopUpScreen;
