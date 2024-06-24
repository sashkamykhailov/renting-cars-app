import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

interface Props {
  listings: any[],
  category: string;
  setCategory: (value: string) => void
}

const Listings = ({listings, category,setCategory}: Props) => {

  useEffect(( ) => {
    setCategory(category)
  }, [category])

  return (
    <View>
      <Text>Listings</Text>
    </View>
  )
}

export default Listings