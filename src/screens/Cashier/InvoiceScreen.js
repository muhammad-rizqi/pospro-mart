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
import {toPrice} from '../../services/helper/helper';
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
        <H3 style={styles.margin8}>Bukti Pembayaran</H3>
        <List>
          <ListItem noIndent>
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
            <ListItem noIndent key={cart.id}>
              <Left style={{flex: 2}}>
                <Text>{cart.nama}</Text>
              </Left>
              <View style={styles.flex1}>
                <Text style={styles.tetxCenter}>{cart.jumlah}</Text>
              </View>
              <Right style={styles.flex1}>
                <Text>Rp. {toPrice(cart.harga)}</Text>
              </Right>
            </ListItem>
          ))}
        </List>
        <View style={styles.marginV16}>
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
            <Text>Rp. {toPrice(data.total_diskon)}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.flex1}>Total Harga</Text>
            <Text style={styles.textRight}>
              Rp. {toPrice(data.total_harga)}
            </Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.flex1}>Dibayar</Text>
            <Text>Rp. {toPrice(data.dibayar)}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.flex1}>Kembalian</Text>
            <Text>Rp. {toPrice(data.kembalian)}</Text>
          </View>
          <View style={styles.marginV16}>
            <View style={styles.flexRow}>
              <Text style={styles.flex1}>Nama Kasir</Text>
              <Text>{data.kasir}</Text>
            </View>
            {data.member && (
              <View style={styles.flexRow}>
                <Text style={styles.flex1}>Nama Member</Text>
                <Text>{data.member}</Text>
              </View>
            )}
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default InvoiceScreen;
