import React from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";

import { BASE_PATH_IMG, URL_HOST_DATA } from "../utils/constants";

import useFetch from "../hooks/useFetch";
import { Title, Text, Subheading, Paragraph, Button } from "react-native-paper";

export default function Product(props) {
  const { route } = props;
  const { id } = route.params;
  const url = `${URL_HOST_DATA}/products/${id}`;

  const { loading, data: product } = useFetch(url);

  return (
    <View>
      {loading ? (
        <Text> Cargando...</Text>
      ) : (
        <ScrollView>
          <ProductImage imageId={id} />
          <ProductInfo product={product} />
        </ScrollView>
      )}
    </View>
  );
}

function ProductImage(props) {
  const { imageId } = props;

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{ uri: `${BASE_PATH_IMG}${imageId}.jpg` }}
      />
    </ScrollView>
  );
}

function ProductInfo(props) {
  const { product } = props;
  return (
    <View style={styles.viewInfo}>
      <Title style={styles.tittleInfo}>{product.name}</Title>
      <Subheading style={styles.textSubInfo}>
        {product.subdescription}
      </Subheading>
      <Paragraph style={styles.textInfo}>{product.description}</Paragraph>
      <Text style={styles.textPrice}>{product.price} €</Text>
      <Button
        style={styles.btn}
        icon="arrow-left"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Añadir al carrito
      </Button>
      <Button
        style={styles.btn}
        icon="camera"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Añadir a favoritos
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  viewImg: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    textShadowRadius: 10,
  },
  image: {
    width: "100%",
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  viewInfo: {
    marginHorizontal: 30,
  },
  tittleInfo: {
    color: "#000",
    fontWeight: "bold",
    marginTop: 15,
  },
  textSubInfo: {
    color: "#333",
    fontSize: 16,
    marginVertical: 10,
  },
  textInfo: {
    color: "#000",
    fontSize: 18,
    marginVertical: 10,
  },
  textPrice: {
    color: "#000",
    fontSize: 26,
    marginVertical: 10,
    textAlign: "right",
  },
  btn: {
    marginVertical: 10,
    paddingVertical: 10,
  },
});
