import {
  Body,
  Button,
  Container,
  Content,
  Fab,
  Form,
  H1,
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
  Title,
  View,
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
import {styles} from '../../styles/MainStyles';

const SupplierScreen = ({navigation}) => {
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
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Supplier</Title>
        </Body>
        <Right />
      </Header>
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
              {supplierId ? 'Update' : 'Tambah'} Supplier
            </H1>
            <Form>
              <View style={styles.marginV8}>
                <Text note>Nama Supplier</Text>
                <Item regular style={styles.radius5}>
                  <Input
                    placeholder="Nama Supplier"
                    value={nama}
                    onChangeText={setNama}
                  />
                </Item>
              </View>
              <View style={styles.marginV8}>
                <Text note>Nomor Telepon</Text>
                <Item regular style={styles.radius5}>
                  <Input
                    placeholder="No Telepon"
                    value={`${noHp}`}
                    onChangeText={setNoHp}
                  />
                </Item>
              </View>
              <View>
                <Text note>Alamat</Text>
                <Item regular style={styles.radius5}>
                  <Input
                    multiline
                    placeholder="Alamat"
                    value={alamat}
                    onChangeText={setAlamat}
                  />
                </Item>
              </View>
              <Button
                style={styles.marginV8}
                block
                disabled={loading}
                onPress={supplierId ? onClickUpdate : onClickAdd}>
                {loading && <Spinner color="white" />}
                <Text>{supplierId ? 'Update' : 'Tambah'} Supplier</Text>
              </Button>
              {supplierId && (
                <Button
                  block
                  danger
                  style={styles.marginV8}
                  disabled={deleteLoading}
                  onPress={onClickDelete}>
                  {deleteLoading && <Spinner color="white" />}
                  <Text>Hapus Supplier</Text>
                </Button>
              )}
            </Form>
          </View>
        </Content>
      </Modal>
      <Content>
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
                  <Text note>{suplierData.no_hp}</Text>
                  <Text note numberOfLines={2}>
                    {suplierData.alamat}
                  </Text>
                </Body>
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

export default SupplierScreen;
