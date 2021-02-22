/* eslint-disable react-hooks/exhaustive-deps */
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  H3,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Title,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import DateView from '../../components/DateView';
import {getDailyReportServices} from '../../services/ManagerServices';
import {styles} from '../../styles/MainStyles';

const DailyReportScreen = ({navigation}) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateTo, setDateTo] = useState(new Date().toISOString().substr(0, 10));
  const [dateFrom, setDateFrom] = useState(
    new Date(new Date().setDate(new Date().getDate() - 31))
      .toISOString()
      .substr(0, 10),
  );

  const now = new Date().toISOString().substr(0, 10);

  const getReport = () => {
    setLoading(true);
    getDailyReportServices(dateFrom, dateTo)
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

  useEffect(() => {
    getReport();
  }, [dateFrom, dateTo]);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Laporan Keuangan</Title>
        </Body>
      </Header>
      <Content style={styles.backgroundLight}>
        <View style={[styles.padding16, styles.backgroundWhite]}>
          <Text>Tampilkan laporan dari tanggal</Text>
          <View style={styles.dateRow}>
            <DateView
              date={dateFrom}
              maxDate={now}
              onDateChange={setDateFrom}
              placeholder="Dari Tanggal"
            />
            <Text>-</Text>
            <DateView
              date={dateTo}
              maxDate={now}
              onDateChange={setDateTo}
              placeholder="Sampai Tanggal"
            />
          </View>
        </View>

        {loading ? (
          <Spinner />
        ) : report ? (
          <View>
            <View style={[styles.cartMenu, styles.marginV8]}>
              <Card>
                <CardItem style={styles.flexRow}>
                  <View style={styles.centerFlex1}>
                    <Text note>Pengeluaran</Text>
                    <Text>Rp. {report.total_pengeluaran},-</Text>
                  </View>
                  <View style={styles.centerFlex1}>
                    <Text note>Pembelian</Text>
                    <Text>Rp. {report.total_pembelian},-</Text>
                  </View>
                  <View style={styles.centerFlex1}>
                    <Text note>Penjualan</Text>
                    <Text>Rp. {report.total_penjualan},-</Text>
                  </View>
                </CardItem>
              </Card>
              <Card>
                <CardItem>
                  <Body>
                    <Text note>Total Pendapatan</Text>
                    <H3>Rp. {report.total_pendapatan},-</H3>
                  </Body>
                </CardItem>
              </Card>
            </View>
            <List>
              {report.data.length > 0 &&
                report.data.map((reportItem) => (
                  <ListItem noIndent style={styles.cartMenu}>
                    <Body>
                      <ListItem noIndent>
                        <Body>
                          <Text>Tanggal</Text>
                        </Body>
                        <View>
                          <Text>{reportItem.tanggal}</Text>
                        </View>
                      </ListItem>
                      <ListItem noIndent>
                        <Body>
                          <Text>Pengeluaran</Text>
                        </Body>
                        <View>
                          <Text>Rp. {reportItem.pengeluaran}</Text>
                        </View>
                      </ListItem>
                      <ListItem noIndent>
                        <Body>
                          <Text>Pembelian</Text>
                        </Body>
                        <View>
                          <Text>Rp. {reportItem.pembelian}</Text>
                        </View>
                      </ListItem>
                      <ListItem noIndent>
                        <Body>
                          <Text>Penjualan</Text>
                        </Body>
                        <View>
                          <Text>Rp. {reportItem.penjualan}</Text>
                        </View>
                      </ListItem>
                      <ListItem noIndent>
                        <Body>
                          <Text>Pendapatan</Text>
                        </Body>
                        <View>
                          <Text style={styles.textBold}>
                            Rp. {reportItem.pendapatan}
                          </Text>
                        </View>
                      </ListItem>
                    </Body>
                  </ListItem>
                ))}
            </List>
          </View>
        ) : (
          <Text>Data Kosong</Text>
        )}
      </Content>
    </Container>
  );
};

export default DailyReportScreen;
