import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";

import { router } from "expo-router";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill in all required fields."
      );
      return;
    }

    if (!email.includes("@")) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    if (phone.length < 9) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid phone number."
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Weak Password",
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Password Mismatch",
        "Password and confirm password do not match."
      );
      return;
    }

    // Temporary registration
    // Later this will call the Django registration API.

    Alert.alert(
      "Registration Successful",
      "Your account has been created.",
      [
        {
          text: "Continue",
          onPress: () => router.replace("/login"),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>CI</Text>
          </View>

          <Text style={styles.appName}>CivicIssue</Text>

          <Text style={styles.appDescription}>
            Complaint & Issue Management Platform
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.subtitle}>
            Register to submit and track your complaints
          </Text>

          <Text style={styles.label}>Full Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#9CA3AF"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Email Address</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Phone Number</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#9CA3AF"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Password</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />

            <Pressable
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.showPassword}>
                {showPassword ? "Hide" : "Show"}
              </Text>
            </Pressable>
          </View>

          <Text style={styles.label}>Confirm Password</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm your password"
              placeholderTextColor="#9CA3AF"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />

            <Pressable
              onPress={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              <Text style={styles.showPassword}>
                {showConfirmPassword ? "Hide" : "Show"}
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.registerButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>
              Create Account
            </Text>
          </Pressable>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account?{" "}
            </Text>

            <Pressable
              onPress={() => router.replace("/login")}
            >
              <Text style={styles.loginLink}>Sign In</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.footer}>CivicIssue © 2026</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: 65,
    height: 65,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },

  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },

  appDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 5,
    textAlign: "center",
  },

  formContainer: {
    width: "100%",
    maxWidth: 450,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 18,
    elevation: 4,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#111827",
    marginBottom: 18,
    backgroundColor: "#FFFFFF",
  },

  passwordContainer: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    backgroundColor: "#FFFFFF",
  },

  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#111827",
  },

  showPassword: {
    color: "#2563EB",
    fontWeight: "600",
    paddingHorizontal: 15,
  },

  registerButton: {
    height: 52,
    backgroundColor: "#2563EB",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    flexWrap: "wrap",
  },

  loginText: {
    color: "#6B7280",
    fontSize: 14,
  },

  loginLink: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "bold",
  },

  footer: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 30,
  },
});