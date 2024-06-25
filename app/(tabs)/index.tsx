


import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import HeaderTrips from "@/components/HeaderTrips";
import { SafeAreaView } from "react-native-safe-area-context";
import Listings from "@/components/Listings";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import listingsData from "@/assets/data/airbnb-listings.json"

const Explore = () => {

  const [category, setCategory] = useState<string>('Road Bikes')

  const items = useMemo(() => {
    return listingsData as any
  }, [])

  const onDataChange = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 80, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          header: () => <HeaderTrips onCategoryChange={onDataChange}/>,
        }}
      />
      <Listings listings={items} category={category} setCategory={setCategory}/>
    </View>
  );
};

export default Explore;
