/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Button,
  Container,
  Content,
  H1,
  H3,
  Input,
  Item,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  View,
} from 'native-base';
import {styles} from '../../styles/MainStyles';
import {
  addSellingServices,
  deleteCartServices,
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

  const [totalQty, setTotalQty] = useState(0);
  const [totalBill, setTotalBill] = useState(0);

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

  useEffect(() => {
    getCart();
  }, []);

  return (
    <Container>
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
        <H1>Tambah Penjualan</H1>
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
        <View style={styles.marginV16} />
      </Content>
    </Container>
  );
};

export default CartScreen;
