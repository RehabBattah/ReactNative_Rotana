import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

const RatingBadge = ({ score }) => {
  const radius = 20;
  const strokeWidth = 4;
  const normalizedScore = Math.min(score, 100);
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (circumference * normalizedScore) / 100;

  let color = "#ff4444";
  if (score >= 75) color = "#00ff00";
  else if (score >= 50) color = "#ffc107";

  return (
    <View style={styles.wrapper}>
      <Svg width={2 * radius + strokeWidth} height={2 * radius + strokeWidth}>
        <Circle
          stroke="#1e293b"
          fill="none"
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${radius + strokeWidth / 2}, ${radius + strokeWidth / 2}`}
        />
      </Svg>
      <Text style={styles.text}>{score}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 140,
    left: 8,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    position: "absolute",
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
});

export default RatingBadge;
