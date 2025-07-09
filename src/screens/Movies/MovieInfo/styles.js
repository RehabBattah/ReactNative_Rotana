import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
  container: { flex: 1 },
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
  poster: {
    width: "100%",
    height: 400,
    borderBottomRightRadius: 25,
  },
  content: { padding: 20 },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000"
  },
  date: {
    fontSize: 14,
    color: "gray",
    marginVertical: 4
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600"
  },
  heartButton: { padding: 5 },
  overview: {
    fontSize: 15,
    color: "#333",
    marginVertical: 3,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: "#444"
  },
  infoLabel: {
    fontWeight: "bold",
    marginRight: 4
  },
  linkBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    padding:8,
    backgroundColor: "#ffe353",
    width: "35%",
    borderRadius:15
  },
  linkBtnText: {
    color: "gray",
    fontSize: 15,
    marginRight: 6
  },
  recommendTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 30,
    marginBottom: 10,
  },
});

export default styles