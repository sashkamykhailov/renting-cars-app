import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import HeaderTrips from "@/components/HeaderTrips";
import { SafeAreaView } from "react-native-safe-area-context";
import Listings from "@/components/Listings";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

const Trips = () => {

  const [category, setCategory] = useState<string>('Road Bikes')

  const onDataChange = (category: string) => {

  }

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <HeaderTrips onCategoryChange={onDataChange}/>,
        }}
      />
      <Listings listings={[]} category={category} setCategory={setCategory}/>
    </View>
  );
};

export default Trips;

