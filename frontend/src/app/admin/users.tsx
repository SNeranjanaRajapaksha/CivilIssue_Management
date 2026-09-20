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

// ----------------------------------
// TYPES
// ----------------------------------

type UserStatus = "Active" | "Inactive";

type Citizen = {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  registeredDate: string;
  totalComplaints: number;
  pendingComplaints: number;
  resolvedComplaints: number;
  status: UserStatus;
};

// ----------------------------------
// TEMPORARY CITIZEN DATA
// ----------------------------------

const initialUsers: Citizen[] = [
  {
    id: 1,
    name: "Neranjana Rajapaksha",
    email: "neranjana@example.com",
    phone: "0771234567",
    location: "Ratnapura",
    registeredDate: "01 Sep 2026",
    totalComplaints: 3,
    pendingComplaints: 1,
    resolvedComplaints: 1,
    status: "Active",
  },
  {
    id: 2,
    name: "Citizen 02",
    email: "citizen02@example.com",
    phone: "0771234562",
    location: "Colombo",
    registeredDate: "05 Sep 2026",
    totalComplaints: 5,
    pendingComplaints: 2,
    resolvedComplaints: 3,
    status: "Active",
  },
  {
    id: 3,
    name: "Citizen 03",
    email: "citizen03@example.com",
    phone: "0771234563",
    location: "Galle",
    registeredDate: "08 Sep 2026",
    totalComplaints: 2,
    pendingComplaints: 1,
    resolvedComplaints: 1,
    status: "Active",
  },
  {
    id: 4,
    name: "Citizen 04",
    email: "citizen04@example.com",
    phone: "0771234564",
    location: "Kandy",
    registeredDate: "10 Sep 2026",
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Citizen 05",
    email: "citizen05@example.com",
    phone: "0771234565",
    location: "Matara",
    registeredDate: "12 Sep 2026",
    totalComplaints: 4,
    pendingComplaints: 2,
    resolvedComplaints: 2,
    status: "Active",
  },
];

// ----------------------------------
// FILTER OPTIONS
// ----------------------------------

const statusFilters = [
  "All",
  "Active",
  "Inactive",
];

// ----------------------------------
// MAIN SCREEN
// ----------------------------------

export default function AdminUsersScreen() {
  const [users, setUsers] =
    useState<Citizen[]>(initialUsers);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [selectedFilter, setSelectedFilter] =
    useState("All");

  // ----------------------------------
  // STATISTICS
  // ----------------------------------

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const totalComplaints = users.reduce(
    (total, user) =>
      total + user.totalComplaints,
    0
  );

  // ----------------------------------
  // SEARCH AND FILTER
  // ----------------------------------

  const filteredUsers = users.filter(
    (user) => {
      const query = searchQuery
        .trim()
        .toLowerCase();

      const matchesSearch =
        user.name
          .toLowerCase()
          .includes(query) ||
        user.email
          .toLowerCase()
          .includes(query) ||
        user.location
          .toLowerCase()
          .includes(query) ||
        user.phone.includes(query);

      const matchesStatus =
        selectedFilter === "All" ||
        user.status === selectedFilter;

      return matchesSearch && matchesStatus;
    }
  );

  // ----------------------------------
  // CHANGE USER STATUS
  // ----------------------------------

  const handleStatusChange = (
    user: Citizen
  ) => {
    const newStatus: UserStatus =
      user.status === "Active"
        ? "Inactive"
        : "Active";

    Alert.alert(
      "Change Account Status",
      `Do you want to change ${user.name}'s account to ${newStatus}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",

          onPress: () => {
            setUsers((previousUsers) =>
              previousUsers.map((item) =>
                item.id === user.id
                  ? {
                      ...item,
                      status: newStatus,
                    }
                  : item
              )
            );
          },
        },
      ]
    );
  };

  // ----------------------------------
  // VIEW USER DETAILS
  // ----------------------------------

  const handleViewUser = (
    user: Citizen
  ) => {
    Alert.alert(
      user.name,
      `Email: ${user.email}

Phone: ${user.phone}

Location: ${user.location}

Registered: ${user.registeredDate}

Total Complaints: ${user.totalComplaints}

Pending Complaints: ${user.pendingComplaints}

Resolved Complaints: ${user.resolvedComplaints}

Account Status: ${user.status}`
    );
  };

  // ----------------------------------
  // UI
  // ----------------------------------

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* HEADER */}

      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() =>
            router.replace("/admin/dashboard")
          }
        >
          <Text style={styles.backText}>
            ‹
          </Text>
        </Pressable>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>
            Manage Users
          </Text>

          <Text style={styles.headerSubtitle}>
            View and manage registered citizens
          </Text>
        </View>
      </View>

      {/* SUMMARY */}

      <Text style={styles.sectionTitle}>
        User Overview
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.totalNumber}>
            {totalUsers}
          </Text>

          <Text style={styles.statLabel}>
            Total Users
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.activeNumber}>
            {activeUsers}
          </Text>

          <Text style={styles.statLabel}>
            Active
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.inactiveNumber}>
            {inactiveUsers}
          </Text>

          <Text style={styles.statLabel}>
            Inactive
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.complaintNumber}>
            {totalComplaints}
          </Text>

          <Text style={styles.statLabel}>
            Complaints
          </Text>
        </View>
      </View>

      {/* SEARCH */}

      <Text style={styles.sectionTitle}>
        Search Users
      </Text>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>
          ⌕
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, email, phone or location"
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />

        {searchQuery.length > 0 && (
          <Pressable
            onPress={() =>
              setSearchQuery("")
            }
          >
            <Text style={styles.clearText}>
              ✕
            </Text>
          </Pressable>
        )}
      </View>

      {/* FILTERS */}

      <Text style={styles.filterLabel}>
        Account Status
      </Text>

      <View style={styles.filterContainer}>
        {statusFilters.map((filter) => (
          <Pressable
            key={filter}
            style={[
              styles.filterButton,

              selectedFilter === filter &&
                styles.selectedFilterButton,
            ]}
            onPress={() =>
              setSelectedFilter(filter)
            }
          >
            <Text
              style={[
                styles.filterText,

                selectedFilter === filter &&
                  styles.selectedFilterText,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* RESULTS HEADER */}

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>
          Citizen Directory
        </Text>

        <Text style={styles.resultsCount}>
          {filteredUsers.length} users
        </Text>
      </View>

      {/* USER LIST */}

      <View style={styles.userList}>
        {filteredUsers.map((user) => (
          <View
            key={user.id}
            style={styles.userCard}
          >
            {/* USER HEADER */}

            <View style={styles.userHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user.name.charAt(0)}
                </Text>
              </View>

              <View style={styles.userHeaderContent}>
                <Text style={styles.userName}>
                  {user.name}
                </Text>

                <Text style={styles.userEmail}>
                  {user.email}
                </Text>
              </View>

              <View
                style={[
                  styles.statusBadge,

                  user.status === "Active"
                    ? styles.activeBadge
                    : styles.inactiveBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,

                    user.status === "Active"
                      ? styles.activeText
                      : styles.inactiveText,
                  ]}
                >
                  {user.status}
                </Text>
              </View>
            </View>

            {/* ROLE */}

            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>
                Citizen
              </Text>
            </View>

            {/* USER INFORMATION */}

            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Phone
                </Text>

                <Text style={styles.infoValue}>
                  {user.phone}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Location
                </Text>

                <Text style={styles.infoValue}>
                  {user.location}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Registered
                </Text>

                <Text style={styles.infoValue}>
                  {user.registeredDate}
                </Text>
              </View>
            </View>

            {/* COMPLAINT STATISTICS */}

            <View style={styles.complaintStats}>
              <View style={styles.complaintStat}>
                <Text style={styles.totalCount}>
                  {user.totalComplaints}
                </Text>

                <Text style={styles.complaintStatLabel}>
                  Total
                </Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.complaintStat}>
                <Text style={styles.pendingCount}>
                  {user.pendingComplaints}
                </Text>

                <Text style={styles.complaintStatLabel}>
                  Pending
                </Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.complaintStat}>
                <Text style={styles.resolvedCount}>
                  {user.resolvedComplaints}
                </Text>

                <Text style={styles.complaintStatLabel}>
                  Resolved
                </Text>
              </View>
            </View>

            {/* ACTION BUTTONS */}

            <View style={styles.actionContainer}>
              <Pressable
                style={styles.viewButton}
                onPress={() =>
                  handleViewUser(user)
                }
              >
                <Text style={styles.viewButtonText}>
                  View Details
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.statusButton,

                  user.status === "Active"
                    ? styles.deactivateButton
                    : styles.activateButton,
                ]}
                onPress={() =>
                  handleStatusChange(user)
                }
              >
                <Text
                  style={[
                    styles.statusButtonText,

                    user.status === "Active"
                      ? styles.deactivateText
                      : styles.activateText,
                  ]}
                >
                  {user.status === "Active"
                    ? "Deactivate"
                    : "Activate"}
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      {/* EMPTY STATE */}

      {filteredUsers.length === 0 && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            No Users Found
          </Text>

          <Text style={styles.emptyDescription}>
            Try another search or change the filters.
          </Text>

          <Pressable
            style={styles.resetButton}
            onPress={() => {
              setSearchQuery("");
              setSelectedFilter("All");
            }}
          >
            <Text style={styles.resetButtonText}>
              Clear Filters
            </Text>
          </Pressable>
        </View>
      )}

      {/* BACK TO DASHBOARD */}

      <Pressable
        style={styles.dashboardButton}
        onPress={() =>
          router.replace("/admin/dashboard")
        }
      >
        <Text style={styles.dashboardButtonText}>
          Back to Admin Dashboard
        </Text>
      </Pressable>

      <Text style={styles.footer}>
        CivicIssue Admin Portal © 2026
      </Text>
    </ScrollView>
  );
}

// ----------------------------------
// STYLES
// ----------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    width: "100%",
    maxWidth: 950,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
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
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 13,
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 30,
  },

  statCard: {
    flexGrow: 1,
    flexBasis: "45%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  totalNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#7C3AED",
  },

  activeNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#059669",
  },

  inactiveNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#DC2626",
  },

  complaintNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2563EB",
  },

  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 5,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 14,
    minHeight: 52,
    marginBottom: 25,
  },

  searchIcon: {
    fontSize: 23,
    color: "#9CA3AF",
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
    paddingVertical: 12,
  },

  clearText: {
    fontSize: 15,
    color: "#9CA3AF",
    paddingHorizontal: 5,
  },

  filterLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },

  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 28,
  },

  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },

  selectedFilterButton: {
    backgroundColor: "#7C3AED",
    borderColor: "#7C3AED",
  },

  filterText: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "600",
  },

  selectedFilterText: {
    color: "#FFFFFF",
  },

  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  resultsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  resultsCount: {
    fontSize: 12,
    color: "#6B7280",
  },

  userList: {
    gap: 13,
  },

  userCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 19,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  userHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EDE9FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#7C3AED",
    fontSize: 18,
    fontWeight: "bold",
  },

  userHeaderContent: {
    flex: 1,
  },

  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  userEmail: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },

  activeBadge: {
    backgroundColor: "#D1FAE5",
  },

  activeText: {
    color: "#047857",
  },

  inactiveBadge: {
    backgroundColor: "#FEE2E2",
  },

  inactiveText: {
    color: "#B91C1C",
  },

  roleBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F5F3FF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 15,
  },

  roleText: {
    color: "#7C3AED",
    fontSize: 11,
    fontWeight: "600",
  },

  infoContainer: {
    marginTop: 17,
    gap: 10,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  infoLabel: {
    fontSize: 12,
    color: "#6B7280",
  },

  infoValue: {
    flex: 1,
    fontSize: 12,
    color: "#374151",
    fontWeight: "500",
    textAlign: "right",
  },

  complaintStats: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 20,
  },

  complaintStat: {
    flex: 1,
    alignItems: "center",
  },

  totalCount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#7C3AED",
  },

  pendingCount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#D97706",
  },

  resolvedCount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#059669",
  },

  complaintStatLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 4,
  },

  statDivider: {
    width: 1,
    backgroundColor: "#E5E7EB",
  },

  actionContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },

  viewButton: {
    flex: 1,
    minHeight: 45,
    borderRadius: 9,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
  },

  viewButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  statusButton: {
    flex: 1,
    minHeight: 45,
    borderRadius: 9,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  deactivateButton: {
    borderColor: "#DC2626",
    backgroundColor: "#FFFFFF",
  },

  activateButton: {
    borderColor: "#059669",
    backgroundColor: "#FFFFFF",
  },

  statusButtonText: {
    fontSize: 12,
    fontWeight: "600",
  },

  deactivateText: {
    color: "#DC2626",
  },

  activateText: {
    color: "#059669",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 10,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  emptyDescription: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 7,
  },

  resetButton: {
    backgroundColor: "#7C3AED",
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 9,
    marginTop: 18,
  },

  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  dashboardButton: {
    minHeight: 50,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  dashboardButtonText: {
    color: "#374151",
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