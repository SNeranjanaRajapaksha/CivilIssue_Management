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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Check empty fields
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter your email and password."
      );
      return;
    }
    // Check password length
    // Basic email validation
    if (!email.includes("@")) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    // Temporary login
    // We will replace this with Django API later
    console.log("Email:", email);
    console.log("Password:", password);

    Alert.alert("Success", "Login validation successful!");

    // Later:
    // router.replace("/user/dashboard");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo / App Name */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>CI</Text>
          </View>

          <Text style={styles.appName}>CivicIssue</Text>

          <Text style={styles.appDescription}>
            Complaint & Issue Management Platform
          </Text>
        </View>

        {/* Login Section */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back</Text>

          <Text style={styles.subtitle}>
            Sign in to continue to your account
          </Text>

          {/* Email */}
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

          {/* Password */}
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

          {/* Forgot Password */}
          <Pressable style={styles.forgotContainer}>
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </Pressable>

          {/* Login Button */}
          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>
              Sign In
            </Text>
          </Pressable>

          {/* Register */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Don't have an account?{" "}
            </Text>

            <Pressable
              onPress={() => router.push("/register")}
            >
              <Text style={styles.registerLink}>
                Create Account
              </Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.footer}>
          CivicIssue © 2026
        </Text>
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
    marginBottom: 35,
  },

  logo: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
  },

  appName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
  },

  appDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
    textAlign: "center",
  },

  formContainer: {
    width: "100%",
    maxWidth: 450,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

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
    marginBottom: 28,
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
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },

  passwordContainer: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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

  forgotContainer: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },

  forgotText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "600",
  },

  loginButton: {
    height: 52,
    backgroundColor: "#2563EB",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonPressed: {
    opacity: 0.8,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    flexWrap: "wrap",
  },

  registerText: {
    color: "#6B7280",
    fontSize: 14,
  },

  registerLink: {
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
