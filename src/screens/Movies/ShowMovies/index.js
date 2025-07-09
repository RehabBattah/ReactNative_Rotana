// src/screens/ShowMovies.jsx
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Foundation from "@expo/vector-icons/Foundation";
import ItemCard from "../../../components/ItemCard";

const ShowMovies = () => {
  const navigation = useNavigation();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchInp, setSearchInp] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const ApiKey = "9fce3030adb4f213b18b7d9916a54081";

  // Fetch movies whenever page or searchInp changes
  useEffect(() => {
    const fetchMovies = async () => {
      const endpoint =
        searchInp.trim() === ""
          ? `https://api.themoviedb.org/3/movie/now_playing?page=${page}&api_key=${ApiKey}`
          : `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            searchInp
          )}&page=${page}&api_key=${ApiKey}`;

      setLoading(true);
      try {
        const res = await fetch(endpoint);
        const { results } = await res.json();
        setMovies((prev) => (page === 1 ? results : [...prev, ...results]));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, searchInp]);

  // Pagination
  const fetchNew = () => setPage((p) => p + 1);

  // Reset state when Movies tab is pressed
  useEffect(() => {
    const parent = navigation.getParent();
    const unsub = parent.addListener("tabPress", () => {
      if (navigation.isFocused()) {
        setSearchInp("");
        setQuery("");
        setMovies([]);
        setPage(1);
        Keyboard.dismiss();
      }
    });
    return unsub;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.topSec}>
        <Text style={styles.title}>ROTANA</Text>
        <TouchableOpacity>
          <Foundation name="list" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Fixed Search */}
      <View style={styles.mainSec}>
        {searchInp === "" && (
          <>
            <Text style={styles.header}>Welcome to our movie app</Text>
            <Text style={styles.descrip}>
              Millions of movies, TV shows and people to discover. Explore now.
            </Text>
          </>
        )}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.search}
            placeholder="Search and explore..."
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            onSubmitEditing={() => {
              setPage(1);
              setMovies([]);
              setSearchInp(query.trim());
            }}
          />
          <TouchableOpacity
            style={styles.searchBut}
            onPress={() => {
              setPage(1);
              setMovies([]);
              setSearchInp(query.trim());
            }}
          >
            <Text style={styles.searchText}>Go</Text>
          </TouchableOpacity>
        </View>
        {searchInp !== "" && (
          <Text style={styles.resultText}>
            Results for: <Text style={styles.resultSearch}>{searchInp}</Text>
          </Text>
        )}
      </View>

      {/* Scrollable Movie Grid */}
      <View style={styles.movieList}>
        <Text style={styles.playing}>
          {searchInp === "" ? "Now Playing" : ""}
        </Text>
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ItemCard
              item={item}
              onPress={(movie) => navigation.navigate("MovieInfo", { movie })}
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          onEndReached={fetchNew}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            loading ? (
              <Text style={styles.loading}>Loading...</Text>
            ) : movies.length === 0 ? (
              <Text style={styles.noResults}>No movies found...</Text>
            ) : null
          }
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </SafeAreaView>
  );
};

export default ShowMovies;

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

  mainSec: {
    backgroundColor: "#e1e0e0",
    margin: 15,
    padding: 20,
    borderRadius: 10,
  },
  header: { fontSize: 22, fontWeight: "600", marginBottom: 6 },
  descrip: { fontSize: 14, color: "#333", marginBottom: 12 },

  searchRow: { flexDirection: "row", alignItems: "center" },
  search: {
    flex: 1,
    backgroundColor: "#fff",
    height: 45,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  searchBut: {
    marginLeft: 10,
    backgroundColor: "#ffe353",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  searchText: { fontSize: 16, fontWeight: "600" },

  resultText: { marginTop: 10, fontSize: 16 },
  resultSearch: { fontWeight: "700" },

  movieList: {
    flex: 1,
    marginHorizontal: 15,
  },
  playing: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },

  columnWrapper: { justifyContent: "space-between" },
  listContent: { paddingBottom: 20 },
  loading: { textAlign: "center", marginVertical: 20 },
  noResults: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 18,
  },
});
