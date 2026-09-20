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

export default function UserProfileScreen() {
  // Temporary user information.
  // Later this information will come from Django.
  const [fullName, setFullName] = useState("Neranjana Rajapaksha");
  const [email, setEmail] = useState("neranjana@example.com");
  const [phone, setPhone] = useState("0771234567");

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (!fullName.trim()) {
      Alert.alert("Missing Name", "Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Missing Email", "Please enter your email address.");
      return;
    }

    if (!phone.trim()) {
      Alert.alert("Missing Phone Number", "Please enter your phone number.");
      return;
    }

    // Later we will send updated information to Django here.

    setIsEditing(false);

    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully."
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: () => router.replace("/login"),
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

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Profile</Text>

          <Text style={styles.headerSubtitle}>
            Manage your account information
          </Text>
        </View>
      </View>

      {/* Profile Header */}

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {fullName.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.profileName}>
          {fullName}
        </Text>

        <Text style={styles.profileEmail}>
          {email}
        </Text>

        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>
            Citizen
          </Text>
        </View>
      </View>

      {/* Personal Information */}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Personal Information
        </Text>

        {!isEditing && (
          <Pressable
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editText}>
              Edit
            </Text>
          </Pressable>
        )}
      </View>

      <View style={styles.formCard}>

        {/* Full Name */}

        <Text style={styles.label}>
          Full Name
        </Text>

        <TextInput
          style={[
            styles.input,
            !isEditing && styles.disabledInput,
          ]}
          value={fullName}
          onChangeText={setFullName}
          editable={isEditing}
          placeholder="Enter your full name"
        />

        {/* Email */}

        <Text style={styles.label}>
          Email Address
        </Text>

        <TextInput
          style={[
            styles.input,
            !isEditing && styles.disabledInput,
          ]}
          value={email}
          onChangeText={setEmail}
          editable={isEditing}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter your email"
        />

        {/* Phone */}

        <Text style={styles.label}>
          Phone Number
        </Text>

        <TextInput
          style={[
            styles.input,
            !isEditing && styles.disabledInput,
          ]}
          value={phone}
          onChangeText={setPhone}
          editable={isEditing}
          keyboardType="phone-pad"
          placeholder="Enter your phone number"
        />

        {/* Edit Buttons */}

        {isEditing && (
          <View style={styles.editButtons}>
            <Pressable
              style={styles.cancelButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </Pressable>

            <Pressable
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveText}>
                Save Changes
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Account Information */}

      <Text style={styles.sectionTitle}>
        Account Information
      </Text>

      <View style={styles.accountCard}>
        <View style={styles.accountRow}>
          <View>
            <Text style={styles.accountLabel}>
              Account Type
            </Text>

            <Text style={styles.accountValue}>
              Citizen
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.accountRow}>
          <View>
            <Text style={styles.accountLabel}>
              Account Status
            </Text>

            <Text style={styles.activeText}>
              Active
            </Text>
          </View>
        </View>
      </View>

      {/* Complaint Summary */}

      <Text style={styles.sectionTitle}>
        My Activity
      </Text>

      <View style={styles.statsContainer}>
        <Pressable
          style={styles.statCard}
          onPress={() =>
            router.push("/user/complaints")
          }
        >
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>
            Total Complaints
          </Text>
        </Pressable>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>
            Resolved
          </Text>
        </View>
      </View>

      {/* Settings */}

      <Text style={styles.sectionTitle}>
        Account
      </Text>

      <View style={styles.menuCard}>

        <Pressable
          style={styles.menuItem}
          onPress={() =>
            Alert.alert(
              "Coming Soon",
              "Change password will be connected to the backend later."
            )
          }
        >
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>
              Change Password
            </Text>

            <Text style={styles.menuDescription}>
              Update your account password
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <View style={styles.divider} />

        <Pressable
          style={styles.menuItem}
          onPress={() =>
            Alert.alert(
              "Coming Soon",
              "Notification settings will be added later."
            )
          }
        >
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>
              Notifications
            </Text>

            <Text style={styles.menuDescription}>
              Manage your notification preferences
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>
      </View>

      {/* Logout */}

      <Pressable
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          Sign Out
        </Text>
      </Pressable>

      <Text style={styles.footer}>
        CivicIssue © 2026
      </Text>

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
    marginBottom: 25,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  backText: {
    fontSize: 32,
    color: "#111827",
    lineHeight: 34,
  },

  headerContent: {
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

  profileCard: {
    backgroundColor: "#2563EB",
    borderRadius: 18,
    padding: 28,
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  avatarText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2563EB",
  },

  profileName: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
  },

  profileEmail: {
    color: "#DBEAFE",
    fontSize: 13,
    marginTop: 5,
  },

  roleBadge: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 12,
  },

  roleText: {
    color: "#2563EB",
    fontSize: 11,
    fontWeight: "600",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },

  editText: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 12,
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 28,
  },

  label: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "600",
    marginBottom: 7,
  },

  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 9,
    paddingHorizontal: 13,
    fontSize: 14,
    color: "#111827",
    marginBottom: 18,
  },

  disabledInput: {
    backgroundColor: "#F9FAFB",
    color: "#6B7280",
  },

  editButtons: {
    flexDirection: "row",
    gap: 10,
  },

  cancelButton: {
    flex: 1,
    minHeight: 47,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    color: "#4B5563",
    fontWeight: "600",
  },

  saveButton: {
    flex: 1,
    minHeight: 47,
    backgroundColor: "#2563EB",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  saveText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  accountCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 28,
  },

  accountRow: {
    paddingVertical: 16,
  },

  accountLabel: {
    fontSize: 12,
    color: "#6B7280",
  },

  accountValue: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
    marginTop: 4,
  },

  activeText: {
    color: "#059669",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
  },

  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB",
  },

  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 5,
  },

  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 25,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
  },

  menuContent: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  menuDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  arrow: {
    fontSize: 25,
    color: "#9CA3AF",
  },

  logoutButton: {
    minHeight: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#DC2626",
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