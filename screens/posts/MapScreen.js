import { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

function Map({ route }) {
  const [location, setLocation] = useState(null);
  const { params } = route;

  useEffect(() => {
    setLocation(params.location);
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType="standard"
          minZoomLevel={15}
          onMapReady={() => console.log("Map is ready")}
          onRegionChange={() => console.log("Region change")}
        >
          <Marker
            title={location.city}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            description="Hello"
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;
