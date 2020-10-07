import React, { useState, useEffect } from "react";
import { BASE_PATH_IMG } from '../utils/constants'
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Title } from "react-native-paper";

import Carousel from "react-native-snap-carousel";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = Math.round(width * 0.7);

export default function CarouselVertical(props) {
  const { data, navigation } = props;

  return (
    <Carousel
      layout={"default"}
      data={data}
      renderItem={(item) => <RenderItem data={item} navigation={navigation}/>}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
    />
  );
}

function RenderItem(props) {
  const { data, navigation } = props;
  const { id, name, price } = data.item; 
  const imageUrl = `${BASE_PATH_IMG}${id}.jpg`;

  const onNavigation = () => {
    navigation.navigate('product', { id });
  }


  return (
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={StyleSheet.card}>
        <Image style={styles.image} source={{uri: imageUrl }} />
        <Title style={styles.titleOffers}> {name} </Title>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 20,
  },
  titleOffers:{
    color:"#FFF",
    backgroundColor: "#000",
    padding:10,
  }
});
