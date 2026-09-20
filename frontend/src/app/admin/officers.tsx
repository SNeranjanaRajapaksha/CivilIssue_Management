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

type OfficerStatus = "Active" | "Inactive";

type Officer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  assignedComplaints: number;
  resolvedComplaints: number;
  status: OfficerStatus;
};

// ----------------------------------
// TEMPORARY OFFICER DATA
// ----------------------------------

const initialOfficers: Officer[] = [
  {
    id: 1,
    name: "Officer 01",
    email: "officer01@example.com",
    phone: "0771234561",
    department: "Road & Transport",
    assignedComplaints: 5,
    resolvedComplaints: 12,
    status: "Active",
  },
  {
    id: 2,
    name: "Officer 02",
    email: "officer02@example.com",
    phone: "0771234562",
    department: "Waste Management",
    assignedComplaints: 3,
    resolvedComplaints: 8,
    status: "Active",
  },
  {
    id: 3,
    name: "Officer 03",
    email: "officer03@example.com",
    phone: "0771234563",
    department: "Public Utilities",
    assignedComplaints: 4,
    resolvedComplaints: 10,
    status: "Active",
  },
  {
    id: 4,
    name: "Officer 04",
    email: "officer04@example.com",
    phone: "0771234564",
    department: "Drainage & Water",
    assignedComplaints: 2,
    resolvedComplaints: 6,
    status: "Active",
  },
  {
    id: 5,
    name: "Officer 05",
    email: "officer05@example.com",
    phone: "0771234565",
    department: "Road & Transport",
    assignedComplaints: 0,
    resolvedComplaints: 4,
    status: "Inactive",
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

const departments = [
  "All Departments",
  "Road & Transport",
  "Waste Management",
  "Public Utilities",
  "Drainage & Water",
];

// ----------------------------------
// MAIN SCREEN
// ----------------------------------

export default function AdminOfficersScreen() {
  const [officers, setOfficers] =
    useState<Officer[]>(initialOfficers);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");

  // ----------------------------------
  // STATISTICS
  // ----------------------------------

  const totalOfficers = officers.length;

  const activeOfficers = officers.filter(
    (officer) => officer.status === "Active"
  ).length;

  const inactiveOfficers = officers.filter(
    (officer) => officer.status === "Inactive"
  ).length;

  const totalAssignedComplaints = officers.reduce(
    (total, officer) =>
      total + officer.assignedComplaints,
    0
  );

  // ----------------------------------
  // SEARCH AND FILTER
  // ----------------------------------

  const filteredOfficers = officers.filter(
    (officer) => {
      const query = searchQuery
        .trim()
        .toLowerCase();

      const matchesSearch =
        officer.name
          .toLowerCase()
          .includes(query) ||
        officer.email
          .toLowerCase()
          .includes(query) ||
        officer.department
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        selectedStatus === "All" ||
        officer.status === selectedStatus;

      const matchesDepartment =
        selectedDepartment === "All Departments" ||
        officer.department === selectedDepartment;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment
      );
    }
  );

  // ----------------------------------
  // CHANGE OFFICER STATUS
  // ----------------------------------

  const handleStatusChange = (
    officer: Officer
  ) => {
    const newStatus: OfficerStatus =
      officer.status === "Active"
        ? "Inactive"
        : "Active";

    Alert.alert(
      "Change Officer Status",
      `Do you want to change ${officer.name} to ${newStatus}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            setOfficers((previousOfficers) =>
              previousOfficers.map((item) =>
                item.id === officer.id
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
  // VIEW OFFICER
  // ----------------------------------

  const handleViewOfficer = (
    officer: Officer
  ) => {
    Alert.alert(
      officer.name,
      `Department: ${officer.department}\n\nEmail: ${officer.email}\n\nPhone: ${officer.phone}\n\nAssigned Complaints: ${officer.assignedComplaints}\n\nResolved Complaints: ${officer.resolvedComplaints}\n\nStatus: ${officer.status}`
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
            Manage Officers
          </Text>

          <Text style={styles.headerSubtitle}>
            View and manage officer accounts
          </Text>
        </View>
      </View>

      {/* SUMMARY */}

      <Text style={styles.sectionTitle}>
        Officer Overview
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.totalNumber}>
            {totalOfficers}
          </Text>

          <Text style={styles.statLabel}>
            Total Officers
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.activeNumber}>
            {activeOfficers}
          </Text>

          <Text style={styles.statLabel}>
            Active
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.inactiveNumber}>
            {inactiveOfficers}
          </Text>

          <Text style={styles.statLabel}>
            Inactive
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.assignedNumber}>
            {totalAssignedComplaints}
          </Text>

          <Text style={styles.statLabel}>
            Assigned Issues
          </Text>
        </View>
      </View>

      {/* ADD OFFICER */}

      <Pressable
        style={styles.addOfficerButton}
        onPress={() =>
          Alert.alert(
            "Coming Soon",
            "The Add Officer form will be connected to the backend later."
          )
        }
      >
        <Text style={styles.addOfficerText}>
          + Add New Officer
        </Text>
      </Pressable>

      {/* SEARCH */}

      <Text style={styles.sectionTitle}>
        Search Officers
      </Text>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>
          ⌕
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, email or department"
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

      {/* STATUS FILTER */}

      <Text style={styles.filterLabel}>
        Account Status
      </Text>

      <View style={styles.filterContainer}>
        {statusFilters.map((filter) => (
          <Pressable
            key={filter}
            style={[
              styles.filterButton,

              selectedStatus === filter &&
                styles.selectedFilterButton,
            ]}
            onPress={() =>
              setSelectedStatus(filter)
            }
          >
            <Text
              style={[
                styles.filterText,

                selectedStatus === filter &&
                  styles.selectedFilterText,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* DEPARTMENT FILTER */}

      <Text style={styles.filterLabel}>
        Department
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          styles.departmentContainer
        }
      >
        {departments.map((department) => (
          <Pressable
            key={department}
            style={[
              styles.departmentButton,

              selectedDepartment === department &&
                styles.selectedDepartmentButton,
            ]}
            onPress={() =>
              setSelectedDepartment(department)
            }
          >
            <Text
              style={[
                styles.departmentText,

                selectedDepartment === department &&
                  styles.selectedDepartmentText,
              ]}
            >
              {department}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* RESULTS HEADER */}

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>
          Officer Directory
        </Text>

        <Text style={styles.resultsCount}>
          {filteredOfficers.length} officers
        </Text>
      </View>

      {/* OFFICER LIST */}

      <View style={styles.officerList}>
        {filteredOfficers.map((officer) => (
          <View
            key={officer.id}
            style={styles.officerCard}
          >
            {/* OFFICER HEADER */}

            <View style={styles.officerHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {officer.name.charAt(0)}
                </Text>
              </View>

              <View style={styles.officerHeaderContent}>
                <Text style={styles.officerName}>
                  {officer.name}
                </Text>

                <Text style={styles.officerEmail}>
                  {officer.email}
                </Text>
              </View>

              <View
                style={[
                  styles.statusBadge,

                  officer.status === "Active"
                    ? styles.activeBadge
                    : styles.inactiveBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,

                    officer.status === "Active"
                      ? styles.activeText
                      : styles.inactiveText,
                  ]}
                >
                  {officer.status}
                </Text>
              </View>
            </View>

            {/* DEPARTMENT */}

            <View style={styles.departmentBadge}>
              <Text style={styles.departmentBadgeText}>
                {officer.department}
              </Text>
            </View>

            {/* INFORMATION */}

            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Phone
                </Text>

                <Text style={styles.infoValue}>
                  {officer.phone}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Department
                </Text>

                <Text style={styles.infoValue}>
                  {officer.department}
                </Text>
              </View>
            </View>

            {/* COMPLAINT STATISTICS */}

            <View style={styles.complaintStats}>
              <View style={styles.complaintStat}>
                <Text style={styles.assignedCount}>
                  {officer.assignedComplaints}
                </Text>

                <Text style={styles.complaintStatLabel}>
                  Assigned
                </Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.complaintStat}>
                <Text style={styles.resolvedCount}>
                  {officer.resolvedComplaints}
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
                  handleViewOfficer(officer)
                }
              >
                <Text style={styles.viewButtonText}>
                  View Details
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.statusButton,

                  officer.status === "Active"
                    ? styles.deactivateButton
                    : styles.activateButton,
                ]}
                onPress={() =>
                  handleStatusChange(officer)
                }
              >
                <Text
                  style={[
                    styles.statusButtonText,

                    officer.status === "Active"
                      ? styles.deactivateText
                      : styles.activateText,
                  ]}
                >
                  {officer.status === "Active"
                    ? "Deactivate"
                    : "Activate"}
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      {/* EMPTY STATE */}

      {filteredOfficers.length === 0 && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            No Officers Found
          </Text>

          <Text style={styles.emptyDescription}>
            Try another search or change the filters.
          </Text>

          <Pressable
            style={styles.resetButton}
            onPress={() => {
              setSearchQuery("");
              setSelectedStatus("All");
              setSelectedDepartment("All Departments");
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
    marginBottom: 25,
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

  assignedNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2563EB",
  },

  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 5,
  },

  addOfficerButton: {
    minHeight: 50,
    backgroundColor: "#7C3AED",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  addOfficerText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
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
    marginBottom: 23,
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
    marginBottom: 23,
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

  departmentContainer: {
    gap: 8,
    paddingBottom: 27,
  },

  departmentButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },

  selectedDepartmentButton: {
    backgroundColor: "#7C3AED",
    borderColor: "#7C3AED",
  },

  departmentText: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "600",
  },

  selectedDepartmentText: {
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

  officerList: {
    gap: 13,
  },

  officerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 19,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  officerHeader: {
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

  officerHeaderContent: {
    flex: 1,
  },

  officerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  officerEmail: {
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

  departmentBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F5F3FF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 15,
  },

  departmentBadgeText: {
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

  assignedCount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2563EB",
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