import React, {useEffect, useState} from 'react';
import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  H1,
  H3,
  List,
  ListItem,
  Spinner,
  Text,
  Thumbnail,
  View,
} from 'native-base';
import {logout} from '../../services/AuthServices';
import {ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/MainStyles';
import {useSelector} from 'react-redux';
import {getDailyReportServices} from '../../services/ManagerServices';
import LineComponent from '../../components/LineComponent';
import {toPrice} from '../../services/helper/helper';

const ManagerDashboardScreen = ({navigation}) => {
  const {user} = useSelector((state) => state);
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState([]);

  const onClickLogout = () => {
    logout();
  };

  const getReport = () => {
    setLoading(true);
    getDailyReportServices()
      .then((result) => {
        setReport(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getReport();
  }, []);

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
        {loading ? (
          <Spinner />
        ) : (
          report.data && (
            <>
              <H3>Laporan Perbulan</H3>
              <ScrollView horizontal>
                <View style={styles.marginR16}>
                  <Text style={styles.tetxCenter}>Pendapatan Perhari</Text>
                  <LineComponent
                    backgroundGradientTo="#1976D2"
                    backgroundGradientFrom="#304FFE"
                    data={report.data.map((data) => data.pendapatan)}
                  />
                </View>
                <View style={styles.marginR16}>
                  <Text style={styles.tetxCenter}>Penjualan Perhari</Text>
                  <LineComponent
                    style={styles.radius5}
                    backgroundGradientTo="#00ACC1"
                    backgroundGradientFrom="#0097A7"
                    data={report.data.map((data) => data.penjualan)}
                  />
                </View>
                <View style={styles.marginR16}>
                  <Text style={styles.tetxCenter}>Pengeluaran Perhari</Text>
                  <LineComponent
                    style={styles.radius5}
                    backgroundGradientTo="#EF9A9A"
                    backgroundGradientFrom="#EF5350"
                    data={report.data.map(
                      (data) => data.pembelian + data.pengeluaran,
                    )}
                  />
                </View>
              </ScrollView>
              <View>
                <Card>
                  <CardItem style={styles.flexRow}>
                    <View style={styles.centerFlex1}>
                      <Text note>Pengeluaran</Text>
                      <Text>Rp. {toPrice(report.total_pengeluaran)}</Text>
                    </View>
                    <View style={styles.centerFlex1}>
                      <Text note>Pembelian</Text>
                      <Text>Rp. {toPrice(report.total_pembelian)}</Text>
                    </View>
                    <View style={styles.centerFlex1}>
                      <Text note>Penjualan</Text>
                      <Text>Rp. {toPrice(report.total_penjualan)}</Text>
                    </View>
                  </CardItem>
                </Card>
                <Card>
                  <CardItem>
                    <Body>
                      <Text note>Total Pendapatan</Text>
                      <H3 style={styles.textBold}>
                        Rp. {toPrice(report.total_pendapatan)},-
                      </H3>
                    </Body>
                  </CardItem>
                </Card>
              </View>
            </>
          )
        )}
        <List>
          <ListItem onPress={() => navigation.navigate('Allocation')}>
            <Text>Pengeluaran</Text>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('ItemReport')}>
            <Text>Rekap Barang</Text>
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
