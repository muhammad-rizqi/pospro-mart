import React, {useEffect, useState} from 'react';
import {
  Container,
  Content,
  H1,
  Icon,
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
import GridItem from '../../components/GridItem';

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
        <View style={styles.gridContainer}>
          <GridItem
            onPress={() => navigation.navigate('Cart')}
            iconName="calculator-outline"
            text="Tambah Penjualan"
          />
          <GridItem
            onPress={() => navigation.navigate('HistorySelling')}
            iconName="basket-outline"
            text="Riwayat Penjualan"
          />
          <GridItem
            onPress={() => navigation.navigate('MemberList')}
            iconName="people-outline"
            text="Member"
          />
          <GridItem
            onPress={() => navigation.navigate('TopUp')}
            iconName="card-outline"
            text="Topup Member"
          />
        </View>
      </Content>
    </Container>
  );
};

export default CashierDashboardScreen;
