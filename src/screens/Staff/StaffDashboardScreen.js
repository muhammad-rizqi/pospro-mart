import React from 'react';
import {Container, Content, View} from 'native-base';
import {StatusBar} from 'react-native';
import {styles} from '../../styles/MainStyles';
import GridItem from '../../components/GridItem';
import DashboardHeader from '../../components/DashboardHeader';

const StaffDashboardScreen = ({navigation}) => {
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Content contentContainerStyle={styles.padding16}>
        <DashboardHeader navigation={navigation} />
        <View style={styles.gridContainer}>
          <GridItem
            onPress={() => navigation.navigate('Category')}
            iconName="albums-outline"
            text="Kategori Barang"
          />
          <GridItem
            onPress={() => navigation.navigate('Supplier')}
            iconName="business-outline"
            text="Data Supplier"
          />
          <GridItem
            onPress={() => navigation.navigate('Item')}
            iconName="pricetags-outline"
            text="Data Barang"
          />
          <GridItem
            onPress={() => navigation.navigate('Purchase')}
            iconName="clipboard-outline"
            text="Data Pembelian"
          />
        </View>
      </Content>
    </Container>
  );
};

export default StaffDashboardScreen;
