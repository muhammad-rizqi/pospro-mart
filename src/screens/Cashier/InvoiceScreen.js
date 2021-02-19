/* eslint-disable react-native/no-inline-styles */
import {
  Body,
  Button,
  Container,
  Content,
  H3,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Title,
  View,
} from 'native-base';
import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {styles} from '../../styles/MainStyles';

const InvoiceScreen = ({navigation, route}) => {
  const {data} = route.params;

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('CashierDashboard');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => navigation.navigate('CashierDashboard')}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Invoice</Title>
        </Body>
        <Right />
      </Header>
      <Content style={styles.padding16}>
        <H3 style={styles.margin16}>Bukti Pembayaran</H3>
        <List>
          <ListItem>
            <Left style={{flex: 2}}>
              <Text note>Nama Barang</Text>
            </Left>
            <View style={styles.flex1}>
              <Text note>Jumlah</Text>
            </View>
            <Right style={styles.flex1}>
              <Text note>Total Harga</Text>
            </Right>
          </ListItem>
          {data.data.map((cart) => (
            <ListItem key={cart.id}>
              <Left style={{flex: 2}}>
                <Text>{cart.nama}</Text>
              </Left>
              <View style={styles.flex1}>
                <Text style={styles.tetxCenter}>{cart.jumlah}</Text>
              </View>
              <Right style={styles.flex1}>
                <Text>{cart.harga}</Text>
              </Right>
            </ListItem>
          ))}
        </List>
        <View style={styles.margin16}>
          <View style={styles.flexRow}>
            <Text style={styles.flex1}>Total Barang</Text>
            <Text style={styles.textRight}>{data.total_barang}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.flex1}>Total Item</Text>
            <Text style={styles.textRight}>{data.total_item}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.flex1}>Total Diskon</Text>
            <Text>{data.total_diskon}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.flex1}>Total Harga</Text>
            <Text style={styles.textRight}>{data.total_harga}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.flex1}>Dibayar</Text>
            <Text>{data.dibayar}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.flex1}>Kembalian</Text>
            <Text>{data.kembalian}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.flex1}>Kasir</Text>
            <Text>{data.kasir}</Text>
          </View>
          {data.member && (
            <View style={styles.flexRow}>
              <Text style={styles.flex1}>Kasir</Text>
              <Text>{JSON.stringify(data.member)}</Text>
            </View>
          )}
        </View>
      </Content>
    </Container>
  );
};

export default InvoiceScreen;