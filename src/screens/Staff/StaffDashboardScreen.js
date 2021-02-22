import React, {useState} from 'react';
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
import {useSelector} from 'react-redux';
import {StatusBar, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/MainStyles';

const StaffDashboardScreen = ({navigation}) => {
  const {user} = useSelector((state) => state);
  const [menu, setMenu] = useState(false);
  const onClickLogout = () => {
    logout();
  };

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
          <H3>Fitur Manajemen Staff</H3>
          <ListItem
            noIndent
            icon
            iconRight
            onPress={() => navigation.navigate('Category')}>
            <Left>
              <Icon name="albums-outline" />
            </Left>
            <Body>
              <Text>Kategori Barang</Text>
            </Body>
          </ListItem>
          <ListItem
            noIndent
            icon
            iconRight
            onPress={() => navigation.navigate('Supplier')}>
            <Left>
              <Icon name="business-outline" />
            </Left>
            <Body>
              <Text>Data Supplier</Text>
            </Body>
          </ListItem>
          <ListItem
            noIndent
            icon
            iconRight
            onPress={() => navigation.navigate('Item')}>
            <Left>
              <Icon name="pricetags-outline" />
            </Left>
            <Body>
              <Text>Data Barang</Text>
            </Body>
          </ListItem>
          <ListItem
            noIndent
            icon
            iconRight
            onPress={() => navigation.navigate('Purchase')}>
            <Left>
              <Icon name="clipboard-outline" />
            </Left>
            <Body>
              <Text>Data Pembelian</Text>
            </Body>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

export default StaffDashboardScreen;
