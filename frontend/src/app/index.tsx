import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CivicIssue</Text>

      <Text style={styles.subtitle}>
        Complaint and Issue Management Platform
      </Text>

      <Pressable
          style={styles.button}
          onPress={() => router.push("/login")} >

          <Text style={styles.buttonText}>
          Get Started..
         </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 30,
  },

  button: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "#222",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
