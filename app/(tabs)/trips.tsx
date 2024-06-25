
import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Trips = () => {
  return (
    <View>
      <Link href={"/(modals)/login"}>
        <Text>Login Page</Text>
      </Link>
      <Link href={"/(modals)/booking"}>
        <Text>Booking Page</Text>
      </Link>
      <Link href={"/listing/1337"}>
        <Text>Listing details</Text>
      </Link>
    </View>
  )
}

export default Trips