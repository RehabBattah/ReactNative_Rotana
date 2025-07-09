import { View, Text, ScrollView, FlatList, TouchableOpacity, Linking, Image } from "react-native";
import { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import ItemCard from "../../../components/ItemCard";
import { getWishlist, toggleWishlist } from "../../../utils/WishListLocal";
import { fetchRecommendations } from "../../../utils/api";
import Foundation from "@expo/vector-icons/Foundation";
import styles from "./styles";

const MovieInfo = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const movie = params?.movie;
  const [wish, setWish] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const loadWishlistAndRecommendations = async () => {
      const list = await getWishlist();
      setWish(list.includes(movie.id));
      const recs = await fetchRecommendations(movie.id);
      setRecommendations(recs);
    };
    loadWishlistAndRecommendations();
  }, [movie.id]);

  const toggleWishlistItem = async () => {
    const newState = await toggleWishlist(movie.id);
    setWish(newState);
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSec}>
        <Text style={styles.title}>ROTANA</Text>
        <TouchableOpacity>
          <Foundation name="list" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster} />

      <View style={styles.content}>
        <View style={styles.topSection}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.date}>
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </Text>

            <View style={styles.ratingRow}>
              {[...Array(4)].map((_, i) => (
                <FontAwesome key={i} name="star" size={20} color="#ffc107" />
              ))}
              <FontAwesome name="star-o" size={20} color="#ffc107" />
              <Text style={styles.ratingText}> {movie.vote_average}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={toggleWishlistItem} style={styles.heartButton}>
            <FontAwesome name="heart" size={28} color={wish ? "#ffe353" : "gray"} />
          </TouchableOpacity>
        </View>

        <Text style={styles.overview}>{movie.overview}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Duration:</Text>
            {movie.vote_count} Min.
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Languages:</Text>
            English
          </Text>
        </View>

        <TouchableOpacity
          style={styles.linkBtn}
          onPress={() => Linking.openURL(`https://www.themoviedb.org/movie/${movie.id}`)} >
          <Text style={styles.linkBtnText}>Website </Text>
          <FontAwesome5 name="link" size={16} color="gray" />
        </TouchableOpacity>

        <Text style={styles.recommendTitle}>Recommendations</Text>
        <FlatList
          data={recommendations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemCard
              item={item}
              onPress={(movie) =>
                navigation.navigate("MovieInfo", { movie })
              } />
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default MovieInfo;

