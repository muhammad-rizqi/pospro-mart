/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Container,
  Content,
  H1,
  Text,
  Thumbnail,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken} from '../../redux/action';
import {getBalanceServices} from '../../services/MemberServices';
import {styles} from '../../styles/MainStyles';

const MemberDashboardScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const {user} = useSelector((state) => state);

  const onClickLogout = () => {
    dispatch(clearToken());
  };

  const getBalance = () => {
    getBalanceServices(user.id)
      .then((result) => {
        setBalance(result.data.data[0].saldo);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };

  useEffect(() => {
    getBalance();
  }, []);
  return (
    <Container>
      <Content>
        <H1>Halo {user.nama}</H1>
        <View
          style={{
            backgroundColor: '#1565C0',
            width: 300,
            height: 180,
            borderRadius: 25,
            padding: 16,
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              textAlign: 'right',
              fontSize: 18,
              fontWeight: 'bold',
              color: 'white',
            }}>
            POSPro Mart
          </Text>
          <View style={styles.flexRow}>
            <View style={styles.flex1}>
              <Text style={{color: 'white', fontSize: 12}}>Member Card</Text>
              <Text
                style={{color: 'white', fontSize: 24, fontFamily: 'monospace'}}>
                {user.kode_member}
              </Text>
              <Text style={{color: 'white'}} numberOfLines={1}>
                {user.nama}
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <QRCode
                backgroundColor="#ffffff00"
                color="white"
                size={50}
                value={`${user.kode_member}`}
              />
            </View>
          </View>
          <Text
            style={{
              textAlign: 'right',
              fontSize: 24,
              fontWeight: 'bold',
              fontFamily: 'monospace',
              color: 'white',
            }}>
            Rp. {balance},-
          </Text>
        </View>
        <Thumbnail source={{uri: user.foto}} />
        <Text>{user.email}</Text>
        <Text>Saldo Anda :</Text>
        <Text>Rp. {balance},-</Text>
        <Button onPress={onClickLogout}>
          <Text>Logout</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default MemberDashboardScreen;
