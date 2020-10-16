import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Text, Button} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import OrderContext from '../context/orders/ordersContext';
import ServerContext from '../context/server/serverContext';
import FavoritesContext from '../context/favorites/favoritesContext';
import AsyncStorage from '@react-native-community/async-storage';

const Logout = () => {
    const {cleanOrders} = useContext(OrderContext);
    const {cleanFavorites} = useContext(FavoritesContext);
    const {cleanUser} = useContext(ServerContext);

    const navigation = useNavigation();

    useEffect(() => {
        cleanFavorites();
      }, []);
    
      useEffect(() => {
       cleanOrders();
      }, []);
    
      useEffect(() => {
        cleanUser();
        AsyncStorage.clear();
      }, []);    
  
    return (
        <Container style={globalStyles.container}>
        <View style={[globalStyles.content, {marginTop: 80}]}>
          <Text style={styles.textCenter}>Los datos se han borrado correctamente</Text>
          <Text style={styles.textBold}>
            Gracias por utilizar nuestro servicio
          </Text>
          <Button full block style={globalStyles.button} onPress= { () => navigation.navigate('home')}>
            <Text style={globalStyles.buttonText}>Ir a inicio</Text>
          </Button>
        </View>
      </Container>
    );
  };
  
  const styles = StyleSheet.create({
    textCenter: {
      textAlign: 'center',
      paddingVertical: 5,
      fontSize: 18,
    },
    textBold: {
      fontWeight: 'bold',
      marginVertical: 50,
      textAlign: 'center',
      fontSize: 22,
    },
  });
export default Logout;
