import {H1, Icon, List, ListItem, Thumbnail} from 'native-base';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {logout} from '../services/AuthServices';
import {styles} from '../styles/MainStyles';

const DashboardHeader = ({navigation}) => {
  const [menu, setMenu] = useState(false);
  const {user} = useSelector((state) => state);

  const onClickLogout = () => {
    logout();
  };

  useEffect(() => {
    setMenu(false);
  }, [navigation]);

  return (
    <>
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
    </>
  );
};

export default DashboardHeader;
