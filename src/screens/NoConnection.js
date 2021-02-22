import {Button, Container, Content, H3, Icon, Text} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {getProfileServices} from '../services/UserServices';
import {styles} from '../styles/MainStyles';

const NoConnection = () => {
  return (
    <Container>
      <Content contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity
          onPress={() => getProfileServices()}
          style={[styles.contentCard, styles.alignCenter]}>
          <Icon name="cloud-offline-outline" />
          <H3>No Connection</H3>
          <Text>Try Again</Text>
        </TouchableOpacity>
      </Content>
    </Container>
  );
};

export default NoConnection;
