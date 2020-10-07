import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Title } from "react-native-paper";
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
          </View>
          <View style={styles.products}>
            <Title style={styles.title}> Nuestros Productos </Title>
            <CarouselVertical data={products} navigation={navigation} />
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
});
