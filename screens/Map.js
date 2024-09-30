import React from 'react'
import MapView from 'react-native-maps'
import { StyleSheet } from 'react-native'
import { useState } from 'react'
import * as Location from 'expo-location'
import { useEffect } from 'react'
import { Marker } from 'react-native-maps'

export default function Map() {

    const [location, setLocation] = useState({
        latitude: 65.0800,
        longitude: 25.4800,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    const getUserPosition = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync()

        try {
            if (status !== 'granted') {
                console.log('Geolocation failed')
                return
            }
            const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
            setLocation({...location,"latitude": position.coords.latitude,"longitude": position.coords.longitude})
       } catch (error) {
        console.log(error)
       }
    }

    useEffect(() => {
      (async() => {
        getUserPosition()
      })()
    }, [])

    const [markers, setMarkers] = useState([])

    const addMarker = (e) => {
        const coords = e.nativeEvent.coordinate
        setMarkers([...markers, coords]) 
    }
    

  return (
    <MapView 
        style={styles.map}
        region={location}
        maptype='satellite'
        onLongPress={addMarker} 
        >
            {markers.map((marker, index) => (
            <Marker 
                key={index} 
                title={`Marker ${index + 1}`} 
                coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            />
            ))}
    </MapView>
  )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
});