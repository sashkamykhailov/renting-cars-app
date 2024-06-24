import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Listings from "@/components/Listings";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as Haptics from 'expo-haptics'

const categories = [
  {
    name: 'Road Bikes',
    icon: 'electric-bike', // From @expo/vector-icons/MaterialCommunityIcons
  },
  {
    name: 'Mountain Bikes',
    icon: 'electric-bike', // From @expo/vector-icons/Ionicons
  },
  {
    name: 'Hybrid Bikes',
    icon: 'electric-bike', // From @expo/vector-icons/MaterialIcons
  },
  {
    name: 'Cruisers',
    icon: 'electric-bike', // From @expo/vector-icons/Entypo
  },
  {
    name: 'Folding Bikes',
    icon: 'electric-bike', // From @expo/vector-icons/AntDesign
  },
  {
    name: 'Electric Bikes',
    icon: 'electric-bike', // From @expo/vector-icons/MaterialCommunityIcons
  },
  {
    name: 'BMX',
    icon: 'electric-bike', // From @expo/vector-icons/MaterialIcons
  },
];

interface Props {
  onCategoryChange: (category:string) => void
}

const HeaderTrips = ({onCategoryChange}: Props) => {

  const scrollRef = useRef<ScrollView>(null)
  const itemsRef = useRef<Array<TouchableOpacity | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const selectCategory = (index: number) => {

    const selected = itemsRef.current[index]

    setActiveIndex(index)

    selected?.measure((x) => {
        scrollRef.current?.scrollTo({x:x-16, y: 0, animated: true})
      }
    ) 

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onCategoryChange(categories[index].name)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF"}}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name='search' size={20}/>
              <View>
              <Text style={{fontWeight: 'bold', marginBottom: 3}}>Wheels?</Text>
              <Text style={{color: Colors.grey}}>Let me help</Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-sharp" size={20} />
          </TouchableOpacity>
        </View>

      <ScrollView 
      ref={scrollRef}
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle = {{
        alignItems: 'center',
        gap: 25,
        paddingHorizontal: 16,
        
      }}
      >
        {categories.map((item,index) => {
          return <TouchableOpacity 
          key={index} 
          ref={(el) => itemsRef.current[index] = el}
          style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
          onPress={() =>selectCategory(index)}>
            <MaterialIcons name={item.icon as any} size={17} color={activeIndex === index ? Colors.primary : Colors.dark}/>
            <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        })}
      </ScrollView>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 130,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },},
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 13,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 24,
  },
  searchBtn: {
    backgroundColor: "#fff",
    padding:15,
    borderRadius: 24,
    flex:1,
    marginRight:20,
    flexDirection: "row",
    alignItems: "center",
    gap:10,
    borderColor: "#c2c2c2",
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width:1,
      height:1
    }
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: '#000',
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
  
});

export default HeaderTrips