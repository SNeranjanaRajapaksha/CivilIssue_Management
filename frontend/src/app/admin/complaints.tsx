import { router } from "expo-router";
import React, { useState } from "react";

import {
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

type ComplaintStatus =
  | "Pending"
  | "In Progress"
  | "Resolved";

type Priority =
  | "Low"
  | "Medium"
  | "High";

type Complaint = {
  id: number;
  complaintId: string;
  title: string;
  category: string;
  citizen: string;
  location: string;
  date: string;
  status: ComplaintStatus;
  priority: Priority;
  assignedOfficer: string | null;
};

// ----------------------------------
// TEMPORARY COMPLAINT DATA
// ----------------------------------

const complaints: Complaint[] = [
  {
    id: 1,
    complaintId: "CIV-001",
    title: "Damaged road near bus stop",
    category: "Road & Transport",
    citizen: "Citizen User",
    location: "Main Street",
    date: "15 Sep 2026",
    status: "Pending",
    priority: "High",
    assignedOfficer: null,
  },
  {
    id: 2,
    complaintId: "CIV-002",
    title: "Garbage not collected",
    category: "Waste & Garbage",
    citizen: "Citizen User",
    location: "Lake Road",
    date: "12 Sep 2026",
    status: "In Progress",
    priority: "Medium",
    assignedOfficer: "Officer 02",
  },
  {
    id: 3,
    complaintId: "CIV-003",
    title: "Street light not working",
    category: "Street Lighting",
    citizen: "Citizen User",
    location: "Temple Road",
    date: "08 Sep 2026",
    status: "Resolved",
    priority: "Low",
    assignedOfficer: "Officer 03",
  },
  {
    id: 4,
    complaintId: "CIV-004",
    title: "Blocked roadside drainage",
    category: "Drainage",
    citizen: "Citizen User",
    location: "School Road",
    date: "16 Sep 2026",
    status: "Pending",
    priority: "High",
    assignedOfficer: null,
  },
];

// ----------------------------------
// FILTER OPTIONS
// ----------------------------------

const filters = [
  "All",
  "Pending",
  "In Progress",
  "Resolved",
  "Unassigned",
];

// ----------------------------------
// MAIN SCREEN
// ----------------------------------

export default function AdminComplaintsScreen() {
  const [searchQuery, setSearchQuery] =
    useState("");

  const [selectedFilter, setSelectedFilter] =
    useState("All");

  // ----------------------------------
  // STATISTICS
  // ----------------------------------

  const totalCount = complaints.length;

  const pendingCount = complaints.filter(
    (item) => item.status === "Pending"
  ).length;

  const progressCount = complaints.filter(
    (item) => item.status === "In Progress"
  ).length;

  const resolvedCount = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

  const unassignedCount = complaints.filter(
    (item) => item.assignedOfficer === null
  ).length;

  // ----------------------------------
  // SEARCH AND FILTER
  // ----------------------------------

  const filteredComplaints = complaints.filter(
    (complaint) => {
      const query = searchQuery
        .trim()
        .toLowerCase();

      const matchesSearch =
        complaint.title
          .toLowerCase()
          .includes(query) ||
        complaint.complaintId
          .toLowerCase()
          .includes(query) ||
        complaint.category
          .toLowerCase()
          .includes(query) ||
        complaint.location
          .toLowerCase()
          .includes(query);

      let matchesFilter = true;

      if (selectedFilter === "Unassigned") {
        matchesFilter =
          complaint.assignedOfficer === null;
      } else if (selectedFilter !== "All") {
        matchesFilter =
          complaint.status === selectedFilter;
      }

      return matchesSearch && matchesFilter;
    }
  );

  // ----------------------------------
  // STATUS COLORS
  // ----------------------------------

  const getStatusStyle = (
    status: ComplaintStatus
  ) => {
    if (status === "Pending") {
      return styles.pendingStatus;
    }

    if (status === "In Progress") {
      return styles.progressStatus;
    }

    return styles.resolvedStatus;
  };

  const getStatusTextStyle = (
    status: ComplaintStatus
  ) => {
    if (status === "Pending") {
      return styles.pendingText;
    }

    if (status === "In Progress") {
      return styles.progressText;
    }

    return styles.resolvedText;
  };

  // ----------------------------------
  // PRIORITY COLORS
  // ----------------------------------

  const getPriorityStyle = (
    priority: Priority
  ) => {
    if (priority === "High") {
      return styles.highPriority;
    }

    if (priority === "Medium") {
      return styles.mediumPriority;
    }

    return styles.lowPriority;
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
            Manage Complaints
          </Text>

          <Text style={styles.headerSubtitle}>
            View and manage all citizen complaints
          </Text>
        </View>
      </View>

      {/* SUMMARY */}

      <Text style={styles.sectionTitle}>
        Complaint Overview
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.totalNumber}>
            {totalCount}
          </Text>

          <Text style={styles.statLabel}>
            Total
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.pendingNumber}>
            {pendingCount}
          </Text>

          <Text style={styles.statLabel}>
            Pending
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.progressNumber}>
            {progressCount}
          </Text>

          <Text style={styles.statLabel}>
            In Progress
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.resolvedNumber}>
            {resolvedCount}
          </Text>

          <Text style={styles.statLabel}>
            Resolved
          </Text>
        </View>
      </View>

      {/* UNASSIGNED ALERT */}

      <Pressable
        style={styles.alertCard}
        onPress={() =>
          setSelectedFilter("Unassigned")
        }
      >
        <View style={styles.alertIcon}>
          <Text style={styles.alertIconText}>
            !
          </Text>
        </View>

        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>
            {unassignedCount} Unassigned Complaints
          </Text>

          <Text style={styles.alertDescription}>
            These complaints are waiting for officer
            assignment.
          </Text>
        </View>

        <Text style={styles.alertArrow}>
          ›
        </Text>
      </Pressable>

      {/* SEARCH */}

      <Text style={styles.sectionTitle}>
        Search Complaints
      </Text>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>
          ⌕
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search by ID, title, category or location"
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          styles.filterContainer
        }
      >
        {filters.map((filter) => (
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
      </ScrollView>

      {/* RESULTS HEADER */}

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>
          {selectedFilter === "All"
            ? "All Complaints"
            : `${selectedFilter} Complaints`}
        </Text>

        <Text style={styles.resultsCount}>
          {filteredComplaints.length} results
        </Text>
      </View>

      {/* COMPLAINT LIST */}

      <View style={styles.complaintList}>
        {filteredComplaints.map(
          (complaint) => (
            <Pressable
              key={complaint.id}
              style={({ pressed }) => [
                styles.complaintCard,

                pressed &&
                  styles.pressedCard,
              ]}
              onPress={() =>
                router.push(
                  `/admin/complaint/${complaint.id}`
                )
              }
            >
              {/* ID AND STATUS */}

              <View style={styles.cardTop}>
                <Text style={styles.complaintId}>
                  {complaint.complaintId}
                </Text>

                <View
                  style={[
                    styles.statusBadge,

                    getStatusStyle(
                      complaint.status
                    ),
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,

                      getStatusTextStyle(
                        complaint.status
                      ),
                    ]}
                  >
                    {complaint.status}
                  </Text>
                </View>
              </View>

              {/* TITLE */}

              <Text style={styles.complaintTitle}>
                {complaint.title}
              </Text>

              {/* CATEGORY */}

              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>
                  {complaint.category}
                </Text>
              </View>

              {/* INFORMATION */}

              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    Citizen
                  </Text>

                  <Text style={styles.infoValue}>
                    {complaint.citizen}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    Location
                  </Text>

                  <Text style={styles.infoValue}>
                    {complaint.location}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    Submitted
                  </Text>

                  <Text style={styles.infoValue}>
                    {complaint.date}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    Priority
                  </Text>

                  <View
                    style={[
                      styles.priorityBadge,

                      getPriorityStyle(
                        complaint.priority
                      ),
                    ]}
                  >
                    <Text
                      style={styles.priorityText}
                    >
                      {complaint.priority}
                    </Text>
                  </View>
                </View>
              </View>

              {/* OFFICER ASSIGNMENT */}

              <View style={styles.assignmentBox}>
                <Text style={styles.assignmentLabel}>
                  Assigned Officer
                </Text>

                {complaint.assignedOfficer ? (
                  <Text
                    style={styles.assignedOfficer}
                  >
                    {complaint.assignedOfficer}
                  </Text>
                ) : (
                  <Text
                    style={styles.unassignedOfficer}
                  >
                    Not Assigned
                  </Text>
                )}
              </View>

              {/* ACTION */}

              <View style={styles.cardBottom}>
                <Text style={styles.actionText}>
                  {complaint.assignedOfficer
                    ? "View & Manage"
                    : "Review & Assign"}
                </Text>

                <Text style={styles.arrow}>
                  ›
                </Text>
              </View>
            </Pressable>
          )
        )}
      </View>

      {/* EMPTY STATE */}

      {filteredComplaints.length === 0 && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            No Complaints Found
          </Text>

          <Text style={styles.emptyDescription}>
            Try another search or select a different
            filter.
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

  pendingNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#D97706",
  },

  progressNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2563EB",
  },

  resolvedNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#059669",
  },

  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 5,
  },

  alertCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 14,
    padding: 17,
    marginBottom: 30,
  },

  alertIcon: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  alertIconText: {
    color: "#DC2626",
    fontSize: 18,
    fontWeight: "bold",
  },

  alertContent: {
    flex: 1,
  },

  alertTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#991B1B",
  },

  alertDescription: {
    fontSize: 12,
    color: "#B91C1C",
    marginTop: 4,
    lineHeight: 18,
  },

  alertArrow: {
    fontSize: 25,
    color: "#DC2626",
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
    marginBottom: 18,
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

  filterContainer: {
    gap: 8,
    paddingBottom: 25,
  },

  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
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

  complaintList: {
    gap: 13,
  },

  complaintCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 19,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  pressedCard: {
    opacity: 0.8,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  complaintId: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
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

  pendingStatus: {
    backgroundColor: "#FEF3C7",
  },

  pendingText: {
    color: "#92400E",
  },

  progressStatus: {
    backgroundColor: "#DBEAFE",
  },

  progressText: {
    color: "#1D4ED8",
  },

  resolvedStatus: {
    backgroundColor: "#D1FAE5",
  },

  resolvedText: {
    color: "#047857",
  },

  complaintTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 14,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 7,
    marginTop: 9,
  },

  categoryText: {
    fontSize: 11,
    color: "#4B5563",
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

  priorityBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  priorityText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#374151",
  },

  highPriority: {
    backgroundColor: "#FEE2E2",
  },

  mediumPriority: {
    backgroundColor: "#FEF3C7",
  },

  lowPriority: {
    backgroundColor: "#D1FAE5",
  },

  assignmentBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 13,
    marginTop: 17,
  },

  assignmentLabel: {
    fontSize: 11,
    color: "#6B7280",
  },

  assignedOfficer: {
    fontSize: 13,
    fontWeight: "600",
    color: "#059669",
    marginTop: 4,
  },

  unassignedOfficer: {
    fontSize: 13,
    fontWeight: "600",
    color: "#DC2626",
    marginTop: 4,
  },

  cardBottom: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 13,
    marginTop: 16,
  },

  actionText: {
    fontSize: 12,
    color: "#7C3AED",
    fontWeight: "600",
  },

  arrow: {
    fontSize: 23,
    color: "#7C3AED",
    marginLeft: 6,
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