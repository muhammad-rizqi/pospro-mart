import React, {useState} from 'react';
import {
  Container,
  Content,
  H1,
  H3,
  List,
  ListItem,
  Text,
  Thumbnail,
  View,
} from 'native-base';
import {logout} from '../../services/AuthServices';
import {StatusBar, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/MainStyles';
import {useSelector} from 'react-redux';

const ManagerDashboardScreen = ({navigation}) => {
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
            <TouchableOpacity onPress={() => setMenu(!menu)}>
              <Thumbnail
                source={{uri: user.foto}}
                style={styles.backgroundPrimary}
              />
            </TouchableOpacity>
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
                    <Text>Settings</Text>
                  </ListItem>
                  <ListItem onPress={onClickLogout}>
                    <Text>Logout</Text>
                  </ListItem>
                </List>
              )}
            </View>
          </View>
          <View style={styles.justifyCenter}>
            <H1 style={styles.textBold}>POSPro Mart</H1>
          </View>
        </View>
        <View style={styles.marginV16}>
          <Text>Selamat Datang</Text>
          <H3>{user.nama}</H3>
        </View>
        <List>
          <ListItem onPress={() => navigation.navigate('Allocation')}>
            <Text>Pengeluaran</Text>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('DailyReport')}>
            <Text>Laporan Keuangan</Text>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('AbsentReport')}>
            <Text>Laporan Absen</Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

export default ManagerDashboardScreen;
