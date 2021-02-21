import React, {useEffect, useState} from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  Fab,
  Form,
  H1,
  H3,
  Header,
  Icon,
  Input,
  Item,
  Left,
  List,
  ListItem,
  Picker,
  Right,
  Spinner,
  Text,
  Title,
  View,
} from 'native-base';
import {useSelector} from 'react-redux';
import {
  deleteItemServices,
  getCategoryServices,
  getItemServices,
  updateItemServices,
} from '../../services/StaffServices';
import {Modal, ToastAndroid} from 'react-native';
import {addItemServices} from '../../services/StaffServices';
import {styles} from '../../styles/MainStyles';
import QRCodeScanner from 'react-native-qrcode-scanner';

const ItemScreen = ({navigation}) => {
  const {item, category} = useSelector((state) => state.staff);
  const [modal, setModal] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [nama, setNama] = useState('');
  const [uid, setUid] = useState('');
  const [harga_beli, setHarga_beli] = useState('');
  const [harga_jual, setHarga_jual] = useState('');
  const [kategori_id, setKategori_id] = useState('');
  const [merk, setMerk] = useState('');
  const [stok, setStok] = useState('');
  const [diskon, setDiskon] = useState('');

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [scan, setScan] = useState(false);

  const resetField = () => {
    setItemId(null);
    setNama('');
    setUid('');
    setHarga_beli('');
    setHarga_jual('');
    setKategori_id('');
    setMerk('');
    setStok('');
    setDiskon('');
  };

  const setUpdate = (itemSelected) => {
    setModal(true);
    setItemId(itemSelected.id);
    setNama(itemSelected.nama);
    setUid(itemSelected.uid);
    setHarga_beli(itemSelected.harga_beli);
    setHarga_jual(itemSelected.harga_jual);
    setKategori_id(itemSelected.kategori_id);
    setMerk(itemSelected.merk);
    setStok(itemSelected.stok);
    setDiskon(itemSelected.diskon);
  };

  const onClickAdd = () => {
    setLoading(true);
    addItemServices(
      nama,
      uid,
      harga_beli,
      harga_jual,
      kategori_id,
      merk,
      stok,
      diskon,
    )
      .then((res) => {
        if (res.data.code === 201) {
          ToastAndroid.show('Berhasil Menambah Barang', ToastAndroid.LONG);
          setModal(false);
          resetField();
        } else {
          ToastAndroid.show('Gagal Menambah Barang', ToastAndroid.LONG);
        }
        console.log(res.data);
      })
      .catch((err) => {
        ToastAndroid.show('Gagal Menambah Barang', ToastAndroid.LONG);
        console.log(err.response);
      })
      .finally(() => {
        getItemServices();
        setLoading(false);
      });
  };

  const onClickUpdate = () => {
    setLoading(true);
    console.log('Updating');
    updateItemServices(
      itemId,
      nama,
      uid,
      harga_beli,
      harga_jual,
      kategori_id,
      merk,
      stok,
      diskon,
    )
      .then((res) => {
        if (res.data.code === 200) {
          ToastAndroid.show('Berhasil Merubah Barang', ToastAndroid.LONG);
          setModal(false);
          resetField();
        } else {
          ToastAndroid.show('Gagal Merubah Barang', ToastAndroid.LONG);
        }
      })
      .catch((err) => {
        ToastAndroid.show('Gagal Merubah Barang', ToastAndroid.LONG);
        console.log(err);
      })
      .finally(() => {
        getItemServices();
        setLoading(false);
      });
  };

  const onClickDelete = () => {
    setDeleteLoading(true);
    deleteItemServices(itemId)
      .then((res) => {
        if (res.data.code === 200) {
          ToastAndroid.show('Berhasil Menghapus Barang', ToastAndroid.LONG);
          setModal(false);
          resetField();
        } else {
          ToastAndroid.show('Gagal Menghapus Barang', ToastAndroid.LONG);
        }
      })
      .catch((err) => {
        ToastAndroid.show('Gagal Menghapus Barang', ToastAndroid.LONG);
        console.log(err);
      })
      .finally(() => {
        getItemServices();
        setDeleteLoading(false);
      });
  };

  const onReadSuccess = ({data}) => {
    setUid(data);
    setScan(false);
  };

  useEffect(() => {
    getItemServices();
    getCategoryServices();
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
          <Title>Daftar Barang</Title>
        </Body>
        <Right />
      </Header>
      <Modal visible={scan}>
        <QRCodeScanner
          vibrate
          showMarker
          onRead={onReadSuccess}
          reactivate
          reactivateTimeout={5000}
        />
        <Fab
          style={styles.backgroundPrimary}
          position="bottomLeft"
          onPress={() => {
            setScan(false);
          }}>
          <Icon name="arrow-back" />
        </Fab>
        <H3 style={styles.textOnScan}>Scan Item</H3>
      </Modal>
      <Modal visible={modal} transparent>
        <Content contentContainerStyle={styles.contentContainer}>
          <View style={styles.contentCard}>
            <View style={styles.alignFlexEnd}>
              <Icon
                name="close"
                onPress={() => {
                  setModal(!modal);
                  resetField();
                }}
              />
            </View>
            <H1 style={styles.marginV8}>
              {itemId ? 'Update' : 'Tambah'} Barang
            </H1>
            <Form>
              <View style={styles.marginV8}>
                <Text note>Kode Barang</Text>
                <Item regular style={styles.radius5}>
                  <Input
                    placeholder="Kode Barang"
                    value={`${uid}`}
                    onChangeText={setUid}
                  />
                  <Icon
                    active
                    name="barcode-outline"
                    onPress={() => setScan(true)}
                  />
                </Item>
              </View>
              <View style={styles.marginV8}>
                <Text note>Nama Barang</Text>
                <Item regular style={styles.radius5}>
                  <Input
                    placeholder="Nama Barang"
                    value={nama}
                    onChangeText={setNama}
                  />
                </Item>
              </View>
              <View style={styles.marginV8}>
                <Text note>Merek</Text>
                <Item regular style={styles.radius5}>
                  <Input
                    placeholder="Merek"
                    value={merk}
                    onChangeText={setMerk}
                  />
                </Item>
              </View>
              <View style={styles.marginV8}>
                <Text note>Kategori</Text>
                <Item regular style={styles.radius5}>
                  <Picker
                    selectedValue={kategori_id}
                    onValueChange={setKategori_id}>
                    {category.data.map((cat) => (
                      <Picker.Item
                        label={cat.nama}
                        value={cat.id}
                        key={cat.id}
                      />
                    ))}
                  </Picker>
                </Item>
              </View>
              <View style={styles.marginV8}>
                <Text note>Harga Beli</Text>
                <Item regular style={styles.radius5}>
                  <Input
                    placeholder="Harga Beli"
                    value={`${harga_beli}`}
                    onChangeText={setHarga_beli}
                  />
                </Item>
              </View>
              <View style={styles.marginV8}>
                <Text note>Harga Jual</Text>
                <Item regular style={styles.radius5}>
                  <Input
                    placeholder="Harga Jual"
                    value={`${harga_jual}`}
                    onChangeText={setHarga_jual}
                  />
                </Item>
              </View>
              <View style={styles.marginV8}>
                <Text note>Stok</Text>
                <Item regular style={styles.radius5}>
                  <Input
                    placeholder="Stok"
                    value={`${stok}`}
                    onChangeText={setStok}
                  />
                </Item>
              </View>
              <View style={styles.marginV8}>
                <Text note>Diskon</Text>
                <Item regular style={styles.radius5}>
                  <Input
                    placeholder="Diskon"
                    value={`${diskon}`}
                    onChangeText={setDiskon}
                  />
                </Item>
              </View>
              <Button
                block
                style={styles.marginV8}
                disabled={loading}
                onPress={itemId ? onClickUpdate : onClickAdd}>
                {loading && <Spinner color="white" />}
                <Text>{itemId ? 'Update' : 'Tambah'} Barang</Text>
              </Button>

              {itemId && (
                <Button
                  style={styles.marginV8}
                  block
                  danger
                  disabled={deleteLoading}
                  onPress={onClickDelete}>
                  {deleteLoading && <Spinner color="white" />}
                  <Text>Hapus Barang</Text>
                </Button>
              )}
            </Form>
            <View style={styles.marginV16} />
          </View>
        </Content>
      </Modal>
      <Content>
        {item.loading ? (
          <Spinner />
        ) : item.data.length === 0 ? (
          item.data.error ? (
            <Text>{item.data.error}</Text>
          ) : (
            <Text>Kategori Kosong</Text>
          )
        ) : (
          <List>
            {item.data.map((itemData) => (
              <ListItem
                key={itemData.id}
                onPress={() => {
                  setUpdate(itemData);
                }}>
                <Body>
                  <Text>{itemData.nama}</Text>
                  <Text note numberOfLines={2}>
                    {itemData.merk}
                  </Text>
                </Body>
                <Right>
                  <Text>{itemData.harga_jual}</Text>
                </Right>
              </ListItem>
            ))}
          </List>
        )}
      </Content>
      <Fab
        position="bottomRight"
        onPress={() => setModal(true)}
        style={styles.backgroundPrimary}>
        <Icon name="add" />
      </Fab>
    </Container>
  );
};

export default ItemScreen;
