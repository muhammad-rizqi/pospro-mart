import React, {useEffect, useState} from 'react';
import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  H3,
  Spinner,
  Text,
  View,
} from 'native-base';
import {ScrollView, StatusBar} from 'react-native';
import {styles} from '../../styles/MainStyles';
import {getDailyReportServices} from '../../services/ManagerServices';
import LineComponent from '../../components/LineComponent';
import {toPrice} from '../../services/helper/helper';
import GridItem from '../../components/GridItem';
import DashboardHeader from '../../components/DashboardHeader';

const ManagerDashboardScreen = ({navigation}) => {
  const [] = useState(false);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState([]);

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
        <DashboardHeader navigation={navigation} />
        {loading ? (
          <Spinner />
        ) : (
          report.data && (
            <View style={styles.marginV8}>
              <H3>Laporan Perbulan</H3>
              <ScrollView horizontal style={styles.marginV16}>
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
            </View>
          )
        )}
        <View style={styles.gridContainer}>
          <GridItem
            onPress={() => navigation.navigate('Allocation')}
            iconName="receipt-outline"
            text="Pengeluaran"
          />
          <GridItem
            onPress={() => navigation.navigate('ItemReport')}
            iconName="reader-outline"
            text="Rekap Barang"
          />
          <GridItem
            onPress={() => navigation.navigate('DailyReport')}
            iconName="stats-chart-outline"
            text="Laporan Keuangan"
          />
          <GridItem
            onPress={() => navigation.navigate('DailyAbsentReport')}
            iconName="calendar-outline"
            text="Laporan Absen"
          />
        </View>
      </Content>
    </Container>
  );
};

export default ManagerDashboardScreen;
