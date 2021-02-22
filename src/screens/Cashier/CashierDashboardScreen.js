import React, {useEffect, useState} from 'react';
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
import {logout} from '../../services/AuthServices';
import {StatusBar, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from '../../styles/MainStyles';

const CashierDashboardScreen = ({navigation}) => {
  const {user} = useSelector((state) => state);
  const [menu, setMenu] = useState(false);
  const onClickLogout = () => {
    logout();
  };

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
        <List style={styles.marginV16}>
          <H3>Fitur Manajemen Kasir</H3>
          <ListItem
            noIndent
            iconLeft
            icon
            onPress={() => navigation.navigate('Cart')}>
            <Left>
              <Icon name="calculator-outline" />
            </Left>
            <Body>
              <Text>Tambah Penjualan</Text>
            </Body>
          </ListItem>
          <ListItem
            noIndent
            iconLeft
            icon
            onPress={() => navigation.navigate('HistorySelling')}>
            <Left>
              <Icon name="basket-outline" />
            </Left>
            <Body>
              <Text>Riwayat Penjualan</Text>
            </Body>
          </ListItem>
          <ListItem
            noIndent
            iconLeft
            icon
            onPress={() => navigation.navigate('MemberList')}>
            <Left>
              <Icon name="people-outline" />
            </Left>
            <Body>
              <Text>Member</Text>
            </Body>
          </ListItem>
          <ListItem
            noIndent
            iconLeft
            icon
            onPress={() => navigation.navigate('TopUp')}>
            <Left>
              <Icon name="card-outline" />
            </Left>
            <Body>
              <Text>Topup Member</Text>
            </Body>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

export default CashierDashboardScreen;
