
import { View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import HeaderTrips from "@/components/HeaderTrips";
import { FeatureGeo } from '@/interfaces/listings';
import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json"
import ListingsMap from "@/components/ListingsMap";

const Trips = () => {

  const [category, setCategory] = useState<string>('Road Bikes')

  const items = useMemo(() => {
    return listingsDataGeo as any
  }, [])

  const onDataChange = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 0, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          header: () => <HeaderTrips onCategoryChange={onDataChange}/>,
        }}
      />
      <ListingsMap listings={listingsDataGeo}/>
    </View>
  );
};

export default Trips;