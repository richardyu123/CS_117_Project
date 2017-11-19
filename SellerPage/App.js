import React from 'react';
import { Alert, Text, View, AppRegistry, Button, StyleSheet, SectionList } from 'react-native';
import PropTypes from 'prop-types';
import { StackNavigator, TabNavigator } from 'react-navigation';

const ItemPage = () => (
  <View style={styles.container}>
    <Text>hi</Text>
  </View>
);

const SellerPage = ({ navigation }) => (
  <View style={styles.container}>
    <SectionList
    sections={[
      {title: 'Furniture', data: ['Couch', 'Chair', 'Table',  'Bed']},
      {title: 'Not Furniture', data: ['Volleyball', 'Declaration of Independence', 'Phone Charger', 'Gun']},
    ]}
    renderItem={({item}) => 
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate('Item')}
          title={item}
        />
      </View>}
    renderSectionHeader={({section}) =>
      <Text style={styles.sectionHeader}>{section.title}</Text>}
    />
   </View>
);

const RootNavigator = StackNavigator({
  Seller: { screen: SellerPage },
  Item: { screen: ItemPage }
});

export default RootNavigator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 80,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 10
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',

  },
});
