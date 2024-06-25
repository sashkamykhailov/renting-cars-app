import { View, Text,FlatList, ListRenderItem, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'expo-router';
import { ListingsProps } from '@/interfaces/listings';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

interface Props {
  listings: any[],
  category: string;
  setCategory: (value: string) => void
}

const Listings = ({listings: items, category,setCategory}: Props) => {

  const [loading, setLoading] = useState(false)
  const listRef = useRef<FlatList>(null)

  useEffect(( ) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },200)
  }, [category])

  const renderRow: ListRenderItem<ListingsProps> = ({item}) => {
    return(
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={styles.listings} entering={FadeInRight} exiting={FadeOutLeft}>
          <Image source={{uri: item.medium_url ? item.medium_url! : item.xl_picture_url! }} style={styles.image}/>
          <TouchableOpacity style={{position:"absolute", right: 30, top: 40}}>
              <Ionicons name='heart-outline' size={24} color="primary"/>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', marginTop: 10}}>
              <Text style={{fontSize: 18}}>{item.name}</Text>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="star" />
                <Text style={{marginLeft: 5}}>{item.review_scores_rating ? item.review_scores_rating / 20 : "New"}</Text>
              </View>
          </View>
          <View style={{marginTop:5, flexDirection: 'row', alignItems: "center", justifyContent:"space-between"}}>
            <View>
              <Text style={{fontSize: 13}}>{item.smart_location}</Text>
              <Text style={{fontSize: 13}}>{item.room_type}</Text>
            </View>
            <View>
              <Text style={{fontSize: 13, fontWeight: "bold"}}>{"Monthly rent: " + item.weekly_price + "€"}</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
    )
  }
  return (
    <View>
      <FlatList
      renderItem={renderRow}
      data={loading ? [] : items}
      ref={listRef}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listings: {
    paddingTop: 30,
    padding: 16,
  },
  image: {
    width:'100%',
    height: 300,
    borderRadius: 10
  }
})

export default Listings