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
  Spinner,
  Text,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Modal, ToastAndroid} from 'react-native';
import {useSelector} from 'react-redux';
import {
  addSupplierServices,
  deleteSupplierServices,
  getSupplierServices,
  updateSupplierServices,
} from '../../services/StaffServices';

const SupplierScreen = () => {
  const {supplier} = useSelector((state) => state.staff);
  const [modal, setModal] = useState(false);
  const [supplierId, setSupplierId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [nama, setNama] = useState('');
  const [noHp, setNoHp] = useState('');
  const [alamat, setAlamat] = useState('');

  const resetField = () => {
    setSupplierId(null);
    setNama('');
    setNoHp('');
    setAlamat('');
  };

  const setSelected = (data) => {
    setSupplierId(data.id);
    setNama(data.nama);
    setNoHp(data.no_hp);
    setAlamat(data.alamat);
  };

  useEffect(() => {
    getSupplierServices();
  }, []);

  const onClickAdd = () => {
    setLoading(true);
    addSupplierServices(nama, alamat, noHp)
      .then(() => {
        ToastAndroid.show('Berhasil Menambah Supplier', ToastAndroid.LONG);
        setModal(false);
        resetField();
      })
      .catch((err) => {
        ToastAndroid.show('Gagal Menambah Supplier', ToastAndroid.LONG);
        console.log(err.response);
      })
      .finally(() => {
        getSupplierServices();
        setLoading(false);
      });
  };

  const onClickUpdate = () => {
    setLoading(true);
    updateSupplierServices(supplierId, nama, alamat, noHp)
      .then(() => {
        ToastAndroid.show('Berhasil Merubah Supplier', ToastAndroid.LONG);
        setModal(false);
        resetField();
      })
      .catch((err) => {
        ToastAndroid.show('Gagal Merubah Supplier', ToastAndroid.LONG);
        console.log(err.response);
      })
      .finally(() => {
        getSupplierServices();
        setLoading(false);
      });
  };
  const onClickDelete = () => {
    setDeleteLoading(true);
    deleteSupplierServices(supplierId)
      .then(() => {
        ToastAndroid.show('Berhasil Menghapus Supplier', ToastAndroid.LONG);
        setModal(false);
        resetField();
      })
      .catch((err) => {
        ToastAndroid.show('Gagal Menghapus Supplier', ToastAndroid.LONG);
        console.log(err.response);
      })
      .finally(() => {
        getSupplierServices();
        setDeleteLoading(false);
      });
  };

  return (
    <Container>
      <Modal visible={modal}>
        <Content>
          <H1>{supplierId ? 'Update' : 'Tambah'} Supplier</H1>
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
                placeholder="Nama Supplier"
                value={nama}
                onChangeText={setNama}
              />
            </Item>
            <Item rounded>
              <Input
                placeholder="No Hp"
                value={`${noHp}`}
                onChangeText={setNoHp}
              />
            </Item>
            <Item rounded>
              <Input
                multiline
                placeholder="Alamat"
                value={alamat}
                onChangeText={setAlamat}
              />
            </Item>
            <Button
              rounded
              block
              disabled={loading}
              onPress={supplierId ? onClickUpdate : onClickAdd}>
              {loading && <Spinner color="white" />}
              <Text>{supplierId ? 'Update' : 'Tambah'} Supplier</Text>
            </Button>
            {supplierId && (
              <Button
                rounded
                block
                danger
                disabled={deleteLoading}
                onPress={onClickDelete}>
                {deleteLoading && <Spinner color="white" />}
                <Text>Hapus Supplier</Text>
              </Button>
            )}
          </Form>
        </Content>
      </Modal>
      <Content>
        <H1>Supplier Screen</H1>
        {supplier.loading ? (
          <Spinner />
        ) : supplier.data.length === 0 ? (
          supplier.data.error ? (
            <Text>{supplier.data.error}</Text>
          ) : (
            <Text>Supplier Kosong</Text>
          )
        ) : (
          <List>
            {supplier.data.map((suplierData) => (
              <ListItem
                key={suplierData.id}
                onPress={() => {
                  setModal(true);
                  setSelected(suplierData);
                }}>
                <Body>
                  <Text>{suplierData.nama}</Text>
                  <Text note numberOfLines={2}>
                    {suplierData.alamat}
                  </Text>
                </Body>
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

export default SupplierScreen;
