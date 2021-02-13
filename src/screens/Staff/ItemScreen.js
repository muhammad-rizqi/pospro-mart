import React, {useEffect, useState} from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  Fab,
  Form,
  H1,
  Icon,
  Input,
  Item,
  List,
  ListItem,
  Picker,
  Right,
  Spinner,
  Text,
} from 'native-base';
import {useSelector} from 'react-redux';
import {
  deleteItemServices,
  getItemServices,
  updateItemServices,
} from '../../services/StaffServices';
import {Modal, ToastAndroid} from 'react-native';
import {addItemServices} from '../../services/StaffServices';

const ItemScreen = () => {
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

  useEffect(() => {
    getItemServices();
  }, []);

  return (
    <Container>
      <Modal visible={modal}>
        <Content>
          <H1>{itemId ? 'Update' : 'Tambah'} Barang</H1>
          <Icon
            name="close"
            onPress={() => {
              setModal(!modal);
              resetField();
            }}
          />
          <Form>
            <Item rounded>
              <Input
                placeholder="Barcode"
                value={`${uid}`}
                onChangeText={setUid}
              />
              <Icon active name="barcode" />
            </Item>
            <Item rounded>
              <Input
                placeholder="Nama Barang"
                value={nama}
                onChangeText={setNama}
              />
            </Item>
            <Item rounded>
              <Input placeholder="Merek" value={merk} onChangeText={setMerk} />
            </Item>
            <Picker selectedValue={kategori_id} onValueChange={setKategori_id}>
              {category.data.map((cat) => (
                <Picker.Item label={cat.nama} value={cat.id} key={cat.id} />
              ))}
            </Picker>
            <Item rounded>
              <Input
                placeholder="Harga Beli"
                value={`${harga_beli}`}
                onChangeText={setHarga_beli}
              />
            </Item>
            <Item rounded>
              <Input
                placeholder="Harga Jual"
                value={`${harga_jual}`}
                onChangeText={setHarga_jual}
              />
            </Item>
            <Item rounded>
              <Input
                placeholder="Stok"
                value={`${stok}`}
                onChangeText={setStok}
              />
            </Item>
            <Item rounded>
              <Input
                placeholder="Diskon"
                value={`${diskon}`}
                onChangeText={setDiskon}
              />
            </Item>
            <Button
              rounded
              block
              disabled={loading}
              onPress={itemId ? onClickUpdate : onClickAdd}>
              {loading && <Spinner color="white" />}
              <Text>{itemId ? 'Update' : 'Tambah'} Barang</Text>
            </Button>

            {itemId && (
              <Button
                rounded
                block
                danger
                disabled={deleteLoading}
                onPress={onClickDelete}>
                {deleteLoading && <Spinner color="white" />}
                <Text>Hapus Barang</Text>
              </Button>
            )}
          </Form>
        </Content>
      </Modal>
      <Content>
        <H1>List Barang</H1>
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
      <Fab position="bottomRight" onPress={() => setModal(true)}>
        <Icon name="add" />
      </Fab>
    </Container>
  );
};

export default ItemScreen;
