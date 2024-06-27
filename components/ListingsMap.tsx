import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { FeatureGeo } from '@/interfaces/listings';
import { useRouter } from 'expo-router';
import MapView from 'react-native-map-clustering';


interface Props {
  listings: {
    features: FeatureGeo[];
  };
}

const INITIAL_REGION = {
  latitude: 52.5200, 
  longitude: 13.4050, 
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const ListingsMap = ({ listings }: Props) => {

  const router = useRouter()

  const onMarketSelected = (item: FeatureGeo) => {
    router.push(`/listing/${item.properties.id}`)
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        clusterColor='white'
        clusterTextColor='#000'
      >
        {listings.features.map((item: FeatureGeo) => (
          <Marker
            onPress={() => onMarketSelected(item)}
            key={item.properties.id}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>€ {item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
  },
  locateBtn: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    }
  },
});

export default ListingsMap;