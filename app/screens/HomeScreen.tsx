import React from 'react';
import {Text} from 'react-native';
import {Page} from '../components';
import {
  Button,
  Container,
  Header,
  Left,
  Title,
  Body,
  Right,
  Content,
  Card,
  CardItem,
} from 'native-base';

const HomeScreen = () => {
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Welcome</Title>
        </Body>
        <Right />
      </Header>
      <Content
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 40,
          paddingHorizontal: 10,
        }}>
        <Card>
          <CardItem>
            <Text>Welcome to Candy Land Folks ;)</Text>
          </CardItem>
          <CardItem>
            <Text>Press Button to fetch Github Repos</Text>
          </CardItem>
        </Card>
        <Button
          dark
          block
          onPress={() => {
          }}
          style={{marginTop: 40}}>
          <Text> Fetch Github Repos </Text>
        </Button>
      </Content>
    </Container>
  );
};

export default HomeScreen;
