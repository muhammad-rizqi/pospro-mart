/* eslint-disable react-hooks/exhaustive-deps */
import {
  Body,
  Container,
  Content,
  H1,
  H3,
  Icon,
  Left,
  List,
  ListItem,
  Text,
  Thumbnail,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StatusBar, ToastAndroid, TouchableOpacity} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken} from '../../redux/action';
import {toPrice} from '../../services/helper/helper';
import {getBalanceServices} from '../../services/MemberServices';
import {styles} from '../../styles/MainStyles';

const MemberDashboardScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(null);
  const {user} = useSelector((state) => state);
  const [menu, setMenu] = useState(false);

  const onClickLogout = () => {
    dispatch(clearToken());
  };

  const getBalance = () => {
    getBalanceServices(user.id)
      .then((result) => {
        if (result.data.data.length > 0) {
          setBalance(result.data.data[0].saldo);
        } else {
          setBalance(0);
        }
      })
      .catch((err) => {
        ToastAndroid.show('Gagal Mengambil info saldo', ToastAndroid.LONG);
        console.log(err);
        console.log(err.response);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getBalance();
  }, []);

  useEffect(() => {
    setMenu(false);
  }, [navigation]);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Content contentContainerStyle={styles.padding16}>
        <View style={styles.flexRow}>
          <View style={styles.flex1}>
            <Icon
              style={styles.marginV8}
              name="menu-outline"
              onPress={() => setMenu(!menu)}
            />
            <View style={styles.relative}>
              {menu && (
                <List style={styles.listMenu}>
                  <ListItem
                    onPress={() => {
                      setMenu(false);
                      navigation.navigate('UpdateProfile');
                    }}>
                    <Text>Profile</Text>
                  </ListItem>
                  <ListItem
                    onPress={() => {
                      setMenu(false);
                      navigation.navigate('Settings');
                    }}>
                    <Text>Pengaturan</Text>
                  </ListItem>
                  <ListItem onPress={onClickLogout}>
                    <Text>Logout</Text>
                  </ListItem>
                </List>
              )}
            </View>
          </View>
          <View style={styles.justifyCenter}>
            <TouchableOpacity
              onPress={() => navigation.navigate('UpdateProfile')}>
              <Thumbnail
                source={{uri: user.foto}}
                style={styles.backgroundPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.marginV16}>
          <Text>Selamat Datang</Text>
          <H1 style={styles.textBold}>{user.nama}</H1>
        </View>
        {!loading && (
          <View style={styles.membeCardContainer}>
            <Text style={styles.memberCardLogo}>POSPro Mart</Text>
            <View style={styles.flexRow}>
              <View style={styles.flex1}>
                <Text note style={styles.textWhite}>
                  Member Card
                </Text>
                <Text style={styles.memberCardNumber}>{user.kode_member}</Text>
                <Text style={styles.textWhite} numberOfLines={1}>
                  {user.nama}
                </Text>
              </View>
              <View style={styles.justifyCenter}>
                <QRCode
                  backgroundColor="#ffffff00"
                  color="white"
                  size={50}
                  value={`${user.kode_member}`}
                />
              </View>
            </View>
            <Text style={styles.memberCardBalance}>
              Rp. {toPrice(balance)},-
            </Text>
          </View>
        )}
        <View style={styles.marginV16}>
          <H3>Kelebihan menjadi member</H3>
          <ListItem icon noIndent>
            <Left>
              <Icon active name="pricetag-outline" />
            </Left>
            <Body>
              <Text>Belanja mudah dan cepat</Text>
            </Body>
          </ListItem>
          <ListItem icon noIndent>
            <Left>
              <Icon active name="cash-outline" />
            </Left>
            <Body>
              <Text>Diskon spesial untuk member</Text>
            </Body>
          </ListItem>
          <ListItem icon noIndent>
            <Left>
              <Icon active name="card-outline" />
            </Left>
            <Body>
              <Text>Top Up mudah dan aman</Text>
            </Body>
          </ListItem>

          <ListItem icon noIndent>
            <Left>
              <Icon active name="lock-closed-outline" />
            </Left>
            <Body>
              <Text>Saldo tidak kami gunakan</Text>
            </Body>
          </ListItem>
        </View>
      </Content>
    </Container>
  );
};

export default MemberDashboardScreen;
