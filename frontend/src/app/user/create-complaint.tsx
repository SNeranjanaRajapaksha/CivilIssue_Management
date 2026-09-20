import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function CreateComplaintScreen() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const categories = [
    "Road & Transport",
    "Waste & Garbage",
    "Water Supply",
    "Street Lighting",
    "Drainage",
    "Public Property",
    "Other",
  ];

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert("Missing Title", "Please enter an issue title.");
      return;
    }

    if (!category) {
      Alert.alert("Missing Category", "Please select an issue category.");
      return;
    }

    if (!description.trim()) {
      Alert.alert(
        "Missing Description",
        "Please describe the issue."
      );
      return;
    }

    if (!location.trim()) {
      Alert.alert(
        "Missing Location",
        "Please enter the location of the issue."
      );
      return;
    }

    // Temporary frontend-only submission.
    // Later this will send the complaint to Django.

    Alert.alert(
      "Issue Submitted",
      "Your issue has been submitted successfully.",
      [
        {
          text: "OK",
          onPress: () => router.replace("/user/dashboard"),
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Report an Issue</Text>
          <Text style={styles.headerSubtitle}>
            Tell us about a community issue
          </Text>
        </View>
      </View>

      {/* Information */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          Help us understand the problem
        </Text>

        <Text style={styles.infoText}>
          Provide accurate information about the issue so it can
          be reviewed and handled by the appropriate officer.
        </Text>
      </View>

      {/* Form */}
      <View style={styles.formCard}>
        {/* Title */}
        <Text style={styles.label}>
          Issue Title <Text style={styles.required}>*</Text>
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Damaged road near bus stop"
          placeholderTextColor="#9CA3AF"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
        />

        {/* Category */}
        <Text style={styles.label}>
          Category <Text style={styles.required}>*</Text>
        </Text>

        <Text style={styles.helperText}>
          Select the category that best describes the issue.
        </Text>

        <View style={styles.categoryContainer}>
          {categories.map((item) => (
            <Pressable
              key={item}
              style={[
                styles.categoryButton,
                category === item && styles.selectedCategory,
              ]}
              onPress={() => setCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item &&
                    styles.selectedCategoryText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Description */}
        <Text style={styles.label}>
          Description <Text style={styles.required}>*</Text>
        </Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe the issue in detail..."
          placeholderTextColor="#9CA3AF"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          maxLength={1000}
        />

        <Text style={styles.characterCount}>
          {description.length}/1000
        </Text>

        {/* Location */}
        <Text style={styles.label}>
          Location <Text style={styles.required}>*</Text>
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Main Street, Pugoda"
          placeholderTextColor="#9CA3AF"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.helperText}>
          Enter the location where the issue can be found.
        </Text>

        {/* Attachment */}
        <Text style={styles.label}>Photo / Attachment</Text>

        <Pressable
          style={styles.uploadBox}
          onPress={() =>
            Alert.alert(
              "Coming Soon",
              "Photo upload will be added in the next development stage."
            )
          }
        >
          <View style={styles.uploadIcon}>
            <Text style={styles.uploadIconText}>+</Text>
          </View>

          <Text style={styles.uploadTitle}>
            Add Photo
          </Text>

          <Text style={styles.uploadDescription}>
            Add a photo to help officers understand the issue
          </Text>
        </Pressable>
      </View>

      {/* Buttons */}
      <Pressable
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>
          Submit Issue
        </Text>
      </Pressable>

      <Pressable
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>

      <Text style={styles.footer}>CivicIssue © 2026</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    width: "100%",
    maxWidth: 700,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  backText: {
    fontSize: 32,
    color: "#111827",
    lineHeight: 34,
  },

  headerTextContainer: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },

  headerSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 3,
  },

  infoCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1E40AF",
  },

  infoText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#4B5563",
    marginTop: 6,
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginTop: 5,
  },

  required: {
    color: "#DC2626",
  },

  helperText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: -3,
    marginBottom: 10,
  },

  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
  },

  textArea: {
    minHeight: 130,
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 5,
  },

  characterCount: {
    fontSize: 11,
    color: "#9CA3AF",
    textAlign: "right",
    marginBottom: 20,
  },

  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 22,
  },

  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  },

  selectedCategory: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  categoryText: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "500",
  },

  selectedCategoryText: {
    color: "#FFFFFF",
  },

  uploadBox: {
    minHeight: 150,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#CBD5E1",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 5,
  },

  uploadIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  uploadIconText: {
    fontSize: 25,
    color: "#2563EB",
  },

  uploadTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },

  uploadDescription: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 5,
  },

  submitButton: {
    backgroundColor: "#2563EB",
    minHeight: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  cancelButton: {
    minHeight: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  },

  cancelButtonText: {
    color: "#4B5563",
    fontSize: 14,
    fontWeight: "600",
  },

  footer: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 25,
  },
});