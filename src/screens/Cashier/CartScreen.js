/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  H3,
  Header,
  Icon,
  Input,
  Item,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Thumbnail,
  Title,
  View,
} from 'native-base';
import {styles} from '../../styles/MainStyles';
import {
  addSellingServices,
  confirmSellingServices,
  deleteCartServices,
  getMemberByCode,
  getSellingServices,
  searchItemServices,
  updateSellingServices,
} from '../../services/CashierServices';
import {Modal, ToastAndroid, TouchableOpacity} from 'react-native';
import _ from 'lodash';

const CartScreen = ({navigation}) => {
  const [item, setItem] = useState('');
  const [dataSearch, setDataSearch] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [dataCart, setDataCart] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchDisplay, setSearchDisplay] = useState(false);

  const [member, setMember] = useState(null);
  const [memberLoading, setMemberLoading] = useState(false);

  const [totalQty, setTotalQty] = useState(0);
  const [totalBill, setTotalBill] = useState(0);

  const [memberId, setMemberId] = useState('');
  const [pay, setPay] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);

  const search = (v) => {
    setSearchLoading(true);
    searchItemServices(v)
      .then((result) => {
        setDataSearch(result.data.data);
      })
      .catch((err) => {
        console.log(err.response);
        ToastAndroid.show('Barang tidak ditemukan', ToastAndroid.LONG);
      })
      .finally(() => setSearchLoading(false));
  };

  const addToCart = (itemData) => {
    const condition = _.find(dataCart, {uid: itemData.uid});
    if (condition) {
      updateCart(condition.id, condition.jumlah_barang + 1);
    } else {
      setCartLoading(true);
      addSellingServices(itemData.id, 1)
        .then(() => {
          ToastAndroid.show('Berhasil menambah barang', ToastAndroid.LONG);
        })
        .catch((err) => {
          ToastAndroid.show('Gagal menambah barang', ToastAndroid.LONG);
          console.log(err.response);
        })
        .finally(() => getCart());
    }
  };

  const getCart = () => {
    setCartLoading(true);
    getSellingServices()
      .then((result) => {
        console.log(result);
        setDataCart(result.data.data);
        const totalPrice = _.sumBy(result.data.data, 'total_harga');
        const totalPcs = _.sumBy(result.data.data, 'jumlah_barang');
        setTotalQty(totalPcs);
        setTotalBill(totalPrice);
      })
      .catch((err) => {
        console.log(err.response);
        ToastAndroid.show('Barang tidak ditemukan', ToastAndroid.LONG);
      })
      .finally(() => setCartLoading(false));
  };

  const updateCart = (id, qty) => {
    setCartLoading(true);
    updateSellingServices(id, qty)
      .then(() => {
        ToastAndroid.show('Berhasil merubah barang', ToastAndroid.LONG);
      })
      .catch((err) => {
        ToastAndroid.show('Gagal merubah barang', ToastAndroid.LONG);
        console.log(err.response);
      })
      .finally(() => {
        closeUpdate();
        getCart();
      });
  };

  const deleteCart = () => {
    setDeleteLoading(true);
    deleteCartServices(selectedId)
      .then(() => {
        ToastAndroid.show('Berhasil menghapus keranjang', ToastAndroid.LONG);
      })
      .catch((err) => {
        ToastAndroid.show('Gagal menghapus keranjang', ToastAndroid.LONG);
        console.log(err.response);
      })
      .finally(() => {
        setDeleteLoading(false);
        closeUpdate();
        getCart();
      });
  };

  const onSubmitCode = () => {
    if (memberId === '' || memberId === `${0}`) {
      ToastAndroid.show('Isi dengan benar', ToastAndroid.LONG);
    } else {
      setMemberLoading(true);
      getMemberByCode(memberId)
        .then((result) => {
          setMember(result.data.data);
        })
        .catch((err) => {
          ToastAndroid.show('Gagal mengambil data member', ToastAndroid.LONG);
          console.log(err);
          console.log(err.response);
        })
        .finally(() => setMemberLoading(false));
    }
  };

  const setUpdate = (cartData) => {
    setSelectedId(cartData.id);
    setQuantity(cartData.jumlah_barang);
    setSelectedItem(cartData.nama);
    setModal(true);
  };

  const closeUpdate = () => {
    setSelectedId(null);
    setQuantity(1);
    setSelectedItem('');
    setModal(false);
  };

  const onClickConfirm = () => {
    setConfirmLoading(true);
    console.log(member);
    confirmSellingServices(
      (memberId !== 0 || memberId !== '') && pay,
      memberId !== 0 && member !== null ? member[0].id : null,
    )
      .then((result) => {
        navigation.navigate('Invoice', {data: result.data.data});
        ToastAndroid.show('Berhasil dibayar', ToastAndroid.LONG);
      })
      .catch((err) => {
        ToastAndroid.show('Gagal dibayar', ToastAndroid.LONG);
        console.log(err);
        setConfirmLoading(false);
        console.log(err.response);
      });
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Keranjang</Title>
        </Body>
        <Right />
      </Header>
      <Modal transparent visible={modal}>
        <View style={[styles.flex1, styles.backgroundOpacity]}>
          <TouchableOpacity style={styles.flex1} onPress={closeUpdate} />
          <View
            style={[styles.backgroundLight, styles.margin16, styles.padding16]}>
            <H3 style={styles.marginV8}>Edit Keranjang</H3>
            <View style={styles.marginV8}>
              <Text note>Nama Barang</Text>
              <Text>{selectedItem}</Text>
            </View>
            <View style={styles.marginV8}>
              <Text note>Jumlah Barang</Text>
              <Item regular>
                <Input
                  placeholder="Jumlah barang"
                  value={`${quantity}`}
                  onChangeText={setQuantity}
                />
              </Item>
              <View style={[styles.alignFlexEnd, styles.marginV8]}>
                <View style={styles.flexRow}>
                  <Button
                    danger
                    disabled={deleteLoading}
                    style={styles.margin8}
                    onPress={deleteCart}>
                    {deleteLoading && <Spinner color="white" />}
                    <Text>Hapus</Text>
                  </Button>
                  <Button
                    style={styles.margin8}
                    onPress={() => updateCart(selectedId, quantity)}>
                    <Text>Edit</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.flex1} onPress={closeUpdate} />
        </View>
      </Modal>
      <Content style={styles.padding16}>
        <H3>Tambah Keranjang</H3>
        <View style={styles.marginV8}>
          <Text note>Cari barang</Text>
          <Item regular>
            <Input
              placeholder="Masukan Nama / Barcode"
              value={item}
              onChangeText={(v) => {
                setItem(v);
                if (v.length >= 3 && isNaN(v)) {
                  setSearchDisplay(true);
                  search(v);
                } else {
                  setSearchDisplay(false);
                }
              }}
              onBlur={() => setSearchDisplay(false)}
            />
          </Item>
        </View>
        <View
          style={{
            position: 'relative',
            display: searchDisplay ? 'flex' : 'none',
          }}>
          <List style={styles.listSearch}>
            {searchLoading ? (
              <Spinner />
            ) : dataSearch.length > 0 ? (
              dataSearch.map((val) => (
                <ListItem key={val.id} onPress={() => addToCart(val)}>
                  <Text>{val.nama}</Text>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <Text>Barang Tidak Ada</Text>
              </ListItem>
            )}
          </List>
        </View>
        <H3 style={styles.marginV16}>List Keranjang</H3>
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
          {cartLoading ? (
            <Spinner />
          ) : (
            dataCart.length > 0 && (
              <>
                {dataCart.map((cart) => (
                  <ListItem key={cart.id} onPress={() => setUpdate(cart)}>
                    <Left style={{flex: 2}}>
                      <Text>{cart.nama}</Text>
                    </Left>
                    <View style={styles.flex1}>
                      <Text style={styles.tetxCenter}>
                        {cart.jumlah_barang}
                      </Text>
                    </View>
                    <Right style={styles.flex1}>
                      <Text>{cart.total_harga}</Text>
                    </Right>
                  </ListItem>
                ))}
                <ListItem>
                  <Left style={{flex: 2}}>
                    <Text>Total</Text>
                  </Left>
                  <View style={styles.flex1}>
                    <Text style={styles.tetxCenter}>{totalQty}</Text>
                  </View>
                  <Right style={styles.flex1}>
                    <Text>{totalBill}</Text>
                  </Right>
                </ListItem>
              </>
            )
          )}
        </List>
        <View style={styles.marginV16}>
          <H3>Konfirmasi Pembayaran</H3>
          <View style={styles.marginV8}>
            {memberLoading ? (
              <Spinner />
            ) : (
              member && (
                <>
                  <Text note>Data Member</Text>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail source={{uri: member[0].foto}} />
                    </Left>
                    <Body>
                      <Text>{member[0].nama}</Text>
                      <Text note>{member[0].no_hp}</Text>
                      <Text note numberOfLines={2}>
                        {member[0].alamat}
                      </Text>
                    </Body>
                    <Right>
                      <Button transparent onPress={() => setMember(null)}>
                        <Text>Hapus</Text>
                      </Button>
                    </Right>
                  </ListItem>
                </>
              )
            )}
            {pay === '' && (
              <>
                <Text note>ID Member</Text>
                <Item regular>
                  <Input
                    keyboardType="number-pad"
                    placeholder="Masukan ID Member"
                    value={`${memberId}`}
                    onChangeText={setMemberId}
                    onSubmitEditing={onSubmitCode}
                    onBlur={onSubmitCode}
                  />
                </Item>
              </>
            )}
          </View>
          {(memberId === null || memberId === '') && (
            <View style={styles.marginV8}>
              <Text note>Jumlah Dibayar</Text>
              <Item regular>
                <Input
                  keyboardType="number-pad"
                  placeholder="Masukan Jumlah Uang"
                  value={`${pay}`}
                  onChangeText={setPay}
                />
              </Item>
            </View>
          )}
          <Button disabled={confirmLoading} block onPress={onClickConfirm}>
            {confirmLoading && <Spinner color="white" />}
            <Text>Konfirmasi Pembayaran</Text>
          </Button>
        </View>
        <View style={styles.marginV16} />
      </Content>
    </Container>
  );
};

export default CartScreen;
