// src/screens/WatchList.js
import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import ItemCard from "../../components/ItemCard";
import { useNavigation } from "@react-navigation/native";
import Foundation from "@expo/vector-icons/Foundation";
import { fetchMovieById } from "../../utils/api";


const WatchList = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWatchList = async () => {
    setLoading(true);
    try {

      const jsonValue = await AsyncStorage.getItem("wishlist");
      const ids = jsonValue ? JSON.parse(jsonValue) : [];

      if (ids.length === 0) {
        setMovies([]);
        setLoading(false);
        return;
      }

      const fetches = ids.map((id) => fetchMovieById(id));
      const results = await Promise.all(fetches);

      setMovies(results);
    } catch (e) {
      console.error("Error loading watchlist:", e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadWatchList();
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (movies.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.emptyText}>Your watch list is empty.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSec}>
        <Text style={styles.title}>ROTANA</Text>
        <TouchableOpacity>
          <Foundation name="list" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemCard item={item}
          onPress={() =>
            navigation.navigate("Movies", {
              screen: "MovieInfo",
              params: { movie: item },
            })
          }
        />}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default WatchList;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topSec: {
    backgroundColor: "#ffe353",
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  title: { fontSize: 24, fontWeight: "700" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyText: { fontSize: 18, color: "gray" },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: 40,
  },
});
