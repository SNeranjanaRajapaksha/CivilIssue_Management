import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function UserDashboard() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>Citizen</Text>
        </View>

        <Pressable
          style={styles.profileButton}
          onPress={() => router.push("/user/profile")}
        >
          <Text style={styles.profileText}>U</Text>
        </Pressable>
      </View>

      {/* Intro */}
      <View style={styles.introCard}>
        <Text style={styles.introTitle}>CivicIssue</Text>

        <Text style={styles.introDescription}>
          Report community issues and track their progress easily.
        </Text>

        <Pressable
          style={styles.reportButton}
          onPress={() => router.push("/user/create-complaint")}
        >
          <Text style={styles.reportButtonText}>
            + Report New Issue
          </Text>
        </Pressable>
      </View>

      {/* Statistics */}
      <Text style={styles.sectionTitle}>My Complaints</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.actionContainer}>
        <Pressable
          style={styles.actionCard}
          onPress={() => router.push("/user/create-complaint")}
        >
          <View style={styles.actionIcon}>
            <Text style={styles.actionIconText}>+</Text>
          </View>

          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Report an Issue</Text>
            <Text style={styles.actionDescription}>
              Submit a new complaint or community issue
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <Pressable
          style={styles.actionCard}
          onPress={() => router.push("/user/complaints")}
        >
          <View style={styles.actionIcon}>
            <Text style={styles.actionIconText}>≡</Text>
          </View>

          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>My Complaints</Text>
            <Text style={styles.actionDescription}>
              View and track your submitted complaints
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <Pressable
          style={styles.actionCard}
          onPress={() => router.push("/user/profile")}
        >
          <View style={styles.actionIcon}>
            <Text style={styles.actionIconText}>U</Text>
          </View>

          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>My Profile</Text>
            <Text style={styles.actionDescription}>
              View and manage your account details
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>
      </View>

      {/* Recent Complaints */}
      <View style={styles.recentHeader}>
        <Text style={styles.sectionTitle}>Recent Complaints</Text>

        <Pressable
          onPress={() => router.push("/user/complaints")}
        >
          <Text style={styles.viewAll}>View All</Text>
        </Pressable>
      </View>

      <View style={styles.emptyCard}>
        <Text style={styles.emptyIcon}>!</Text>

        <Text style={styles.emptyTitle}>
          No complaints yet
        </Text>

        <Text style={styles.emptyDescription}>
          Issues you report will appear here.
        </Text>

        <Pressable
          style={styles.emptyButton}
          onPress={() => router.push("/user/create-complaint")}
        >
          <Text style={styles.emptyButtonText}>
            Report Your First Issue
          </Text>
        </Pressable>
      </View>

      {/* Logout */}
      <Pressable
        style={styles.logoutButton}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.logoutText}>Sign Out</Text>
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
    maxWidth: 900,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  welcomeText: {
    fontSize: 14,
    color: "#6B7280",
  },

  userName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 2,
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  profileText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  introCard: {
    backgroundColor: "#2563EB",
    padding: 24,
    borderRadius: 18,
    marginBottom: 30,
  },

  introTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },

  introDescription: {
    color: "#DBEAFE",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 20,
  },

  reportButton: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  reportButtonText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 14,
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 30,
  },

  statCard: {
    flexGrow: 1,
    flexBasis: "45%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  statNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2563EB",
  },

  statLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 5,
  },

  actionContainer: {
    gap: 12,
    marginBottom: 30,
  },

  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  actionIconText: {
    color: "#2563EB",
    fontSize: 22,
    fontWeight: "bold",
  },

  actionContent: {
    flex: 1,
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111827",
  },

  actionDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  arrow: {
    fontSize: 28,
    color: "#9CA3AF",
    marginLeft: 10,
  },

  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  viewAll: {
    color: "#2563EB",
    fontWeight: "600",
    marginBottom: 14,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  emptyIcon: {
    width: 45,
    height: 45,
    lineHeight: 45,
    textAlign: "center",
    borderRadius: 23,
    backgroundColor: "#EFF6FF",
    color: "#2563EB",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
  },

  emptyDescription: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 6,
    textAlign: "center",
  },

  emptyButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 9,
    marginTop: 18,
  },

  emptyButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },

  logoutButton: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#DC2626",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutText: {
    color: "#DC2626",
    fontWeight: "600",
  },

  footer: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 25,
  },
});