import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import {
  Container,
  Button,
  Text,
  H1,
  Input,
  Form,
  Item,
  Toast,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import ServerContext from '../context/server/serverContext';
import {useFormik} from 'formik';

import AsyncStorage from '@react-native-community/async-storage';

const Login = () => {
  // Context de Server
  const {user, getUser} = useContext(ServerContext);

  const [message, saveMesage] = useState(null);

  const navigation = useNavigation();

  const {values, isSubmitting, setFieldValue, handleSubmit, errors} = useFormik(
    {
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: (values) => {
        const response = getUser(values).then((result) => {
          if (result.length !== 0) {
            const {email, password} = result;           
            saveStorage( email, password  );
            navigation.navigate('home');
          } else {
            saveMesage('Los datos introducidos no son correctos');
          }
        });
      },
      validate: (values) => {
        const errors = {};
        if (
          !values.email ||
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        )
          errors.email = 'Email incorrecto';
        if (!values.password || values.password.length < 6)
          errors.password = 'Paswword menor a 6';

        return errors;
      },
    },
  );

  const showAlert = () => {
    Toast.show({
      text: message,
      buttonText: 'OK',
      duration: 5000,
    });
  };

  const saveStorage =  async ( email, password ) => {
    try{
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
    } catch ( error){
      console.log( error );
    }
  };

  return (
    <Container>
      <View style={globalStyles.loginContainer}>
        <H1 style={globalStyles.title}> Acceso de usuarios</H1>

        <Form>
          <Item
            inlineLabel
            last
            style={globalStyles.input}
            error={errors.email ? true : false}>
            <Input
              placeholder="Email"
              value={values.email}
              onChangeText={(text) => setFieldValue('email', text)}
            />
            <Text>{errors.email ? errors.email : ''}</Text>
          </Item>
          <Item
            inlineLabel
            last
            style={globalStyles.input}
            error={errors.password ? true : false}>
            <Input
              secureTextEntry={true}
              placeholder="Password"
              value={values.password}
              onChangeText={(text) => setFieldValue('password', text)}
            />
            <Text>{errors.password ? errors.password : ''}</Text>
          </Item>
        </Form>
        <Button
          square
          block
          style={globalStyles.button}
          onPress={() => handleSubmit()}>
          <Text style={globalStyles.buttonText}>Iniciar Sesión</Text>
        </Button>
        {message && showAlert()}
        <Text
          style={globalStyles.link}
          onPress={() => navigation.navigate('register')}>
          Crear Cuenta
        </Text>
      </View>
    </Container>
  );
};

export default Login;
