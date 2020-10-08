import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Title, Button } from "react-native-paper";
import CarouselVertical from "../components/CarouselVertical";
import { getProductsApi, getOffersApi } from "../api/products";

export default function Home(props) {
  const { navigation } = props;
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getOffersApi(5).then((response) => {
      setOffers(response);
    });
  }, []);
  useEffect(() => {
    getProductsApi(10).then((response) => {
      setProducts(response);
    });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {products && (
        <>
          <View style={styles.products}>
            <Title style={styles.title}> Nuestras Ofertas </Title>
            <CarouselVertical data={offers} navigation={navigation} />
            <Button
        style={styles.btn}
        mode="contained"
        onPress={() => goto("offers")}
      >
        Ver todas
      </Button>
          </View>
          <View style={styles.products}>
            <Title style={styles.title}> Nuestros Productos </Title>
            <CarouselVertical data={products} navigation={navigation} />
            <Button
        style={styles.btn}
        mode="contained"
        onPress={() => goto("products")}
      >
        Ver todos
      </Button>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  products: {
    marginVertical: 10,
  },
  title: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: "bold",
    fontSize: 22,
    color: "#000",
  },
  btn: {
    marginVertical: 30,
    paddingVertical: 10,
    width: 300,
  },
});
