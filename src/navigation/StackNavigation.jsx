import React from "react";
import { IconButton } from "react-native-paper";

import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Product from "../screens/Product";
import Products from "../screens/Products";
import Offers from "../screens/Offers";
import Favorites from "../screens/Favorites";
import Search from "../screens/Search";

const Stack = createStackNavigator();

export default function StackNavigation(props) {
  const { navigation } = props;
  const buttonLeft = (screen) => {
    switch (screen) {
      case "search":
      case "product":
        return (
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        );
      default:
        return (
          <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
        );
    }
  };

  const buttonRight = () => {
    return (
      <IconButton
        icon="magnify"
        onPress={() => navigation.navigate("search")}
      />
    );
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: "WineApp",
          headerLeft: () => buttonLeft("home"),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="product"
        component={Product}
        options={{
          title: "",
          headerLeft: () => buttonLeft("product"),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="products"
        component={Products}
        options={{
          title: "Nuestros productos",
          headerLeft: () => buttonLeft("products"),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="offers"
        component={Offers}
        options={{
          title: "Nuestras ofertas",
          headerLeft: () => buttonLeft("offers"),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="favorites"
        component={Favorites}
        options={{
          title: "Favoritos",
          headerLeft: () => buttonLeft("favorites"),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          title: "Buscador de productos",
          headerLeft: () => buttonLeft("search"),
        }}
      />
    </Stack.Navigator>
  );
}
