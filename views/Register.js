import React, {useState, useContext} from 'react';
import {ScrollView, View} from 'react-native';
import {
  Container,
  Button,
  Text,
  H1,
  Input,
  Form,
  Item,
  Toast,
  Icon
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';

import ServerContext from '../context/server/serverContext';

import {useFormik} from 'formik';

const Register = () => {
  // Context de Server
  const {user, saveUser} = useContext(ServerContext);

  const [message, saveMesage] = useState(null);

  const navigation = useNavigation();
  const {values, isSubmitting, setFieldValue, handleSubmit, errors} = useFormik(
    {
      initialValues: {
        name: '',
        surname: '',
        address: '',
        email: '',
        telephone: '',
        password: '',
      },
      onSubmit: (values) => {
        const registro = saveUser(values);
        if (registro) {
          saveMesage('El usuario se ha creado correctamnente');
          navigation.navigate('home');
        } else {
          saveMesage(
            'Se ha producido un error, revise los datos e inténtalo de nuevo',
          );
        }
      },
      validate: (values) => {
        const errors = {};
        if (!values.name || values.name.length < 2)
          errors.name = 'Nombre incorrecto';
        if (!values.surname || values.surname.length < 2)
          errors.surname = 'Apellido incorrecto';
        if (!values.address || values.address.length < 5)
          errors.address = 'Dirección incorrecta';
        if (
          !values.email ||
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        )
          errors.email = 'Email incorrecto';
        if (!values.telephone || values.telephone.length !== 9)
          errors.telephone = 'Teléfono incorrecto';
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

  return (
    <Container>
      <View style={globalStyles.loginContainer}>
        <ScrollView>
        <H1 style={globalStyles.title}> <Icon name="md-person-circle-outline"/> Registro de Usuarios</H1>

          <Form>
            <Item
              inlineLabel
              last
              style={globalStyles.input}
              error={errors.name ? true : false}>
              <Input
                placeholder="Nombre"
                value={values.name}
                onChangeText={(text) => setFieldValue('name', text)}
              />
              <Text>{errors.name ? errors.name : ''}</Text>
            </Item>
            <Item
              inlineLabel
              last
              style={globalStyles.input}
              error={errors.surname ? true : false}>
              <Input
                placeholder="Apellidos"
                value={values.surname}
                onChangeText={(text) => setFieldValue('surname', text)}
              />
              <Text>{errors.surname ? errors.surname : ''}</Text>
            </Item>
            <Item
              inlineLabel
              last
              style={globalStyles.input}
              error={errors.address ? true : false}>
              <Input
                placeholder="Dirección"
                value={values.address}
                onChangeText={(text) => setFieldValue('address', text)}
              />
              <Text>{errors.address ? errors.address : ''}</Text>
            </Item>
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
              error={errors.telephone ? true : false}>
              <Input
                placeholder="Teléfono"
                value={values.telephone}
                onChangeText={(text) => setFieldValue('telephone', text)}
              />
              <Text>{errors.telephone ? errors.telephone : ''}</Text>
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
          {message && showAlert()}
          <Button
            square
            block
            style={globalStyles.button}
            onPress={() => handleSubmit()}>
            <Text style={globalStyles.buttonText}>Registrar</Text>
          </Button>
        </ScrollView>
      </View>
    </Container>
  );
};

export default Register;
