import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback
} from "react-native";

import { BASE_PATH_IMG, URL_HOST_DATA } from "../utils/constants";
import useFetch from "../hooks/useFetch";
import { Title } from "react-native-paper";

import { map } from "lodash";

export default function Products( props ) {
  const { navigation } = props;
  const url = `${URL_HOST_DATA}/products`;
  const { loading, data: products } = useFetch(url);

  return (
    <ScrollView>
      {loading ? (
        <Title> Cargando...</Title>
      ) : (
        <View>
          {map(products, (product, index) => (
            <Product key={index} product={product} navigation={navigation}/>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

function Product(props) {
  const { product, navigation } = props;
  const { id, name } = product;

  const goProduct = () => {
    navigation.navigate("product", { id })
  }

  return (
<TouchableWithoutFeedback onPress={goProduct}>
      <View style={styles.product}>
        <View>
          <Image
            style={styles.image}
            source={{ uri: `${BASE_PATH_IMG}${id}.jpg` }}
          />
        </View>
        <Title style={styles.cBlack}>{name}</Title>
      </View>
      </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  product: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 70,
  },
  cBlack: {
    color: "#000",
    paddingHorizontal: 10,
  },
});
