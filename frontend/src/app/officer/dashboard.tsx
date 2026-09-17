import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ComplaintStatus = "Pending" | "In Progress" | "Resolved";

type Complaint = {
  id: number;
  complaintId: string;
  title: string;
  category: string;
  location: string;
  date: string;
  status: ComplaintStatus;
  priority: "Low" | "Medium" | "High";
};

export default function OfficerDashboard() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Temporary officer information.
  // Later this will come from Django.
  const officerName = "Officer";

  // Temporary complaints.
  const complaints: Complaint[] = [
    {
      id: 1,
      complaintId: "CIV-001",
      title: "Damaged road near bus stop",
      category: "Road & Transport",
      location: "Main Street",
      date: "15 Sep 2026",
      status: "Pending",
      priority: "High",
    },
    {
      id: 2,
      complaintId: "CIV-002",
      title: "Garbage not collected",
      category: "Waste & Garbage",
      location: "Lake Road",
      date: "12 Sep 2026",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: 3,
      complaintId: "CIV-003",
      title: "Street light not working",
      category: "Street Lighting",
      location: "Temple Road",
      date: "08 Sep 2026",
      status: "Resolved",
      priority: "Low",
    },
    {
      id: 4,
      complaintId: "CIV-004",
      title: "Blocked roadside drainage",
      category: "Drainage",
      location: "School Road",
      date: "16 Sep 2026",
      status: "Pending",
      priority: "High",
    },
  ];

  const filters = [
    "All",
    "Pending",
    "In Progress",
    "Resolved",
  ];

  const filteredComplaints =
    selectedFilter === "All"
      ? complaints
      : complaints.filter(
          (complaint) =>
            complaint.status === selectedFilter
        );

  const pendingCount = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const progressCount = complaints.filter(
    (complaint) => complaint.status === "In Progress"
  ).length;

  const resolvedCount = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  const getStatusStyle = (status: ComplaintStatus) => {
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

  const getPriorityStyle = (
    priority: "Low" | "Medium" | "High"
  ) => {
    if (priority === "High") {
      return styles.highPriority;
    }

    if (priority === "Medium") {
      return styles.mediumPriority;
    }

    return styles.lowPriority;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}

      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>
            Welcome back,
          </Text>

          <Text style={styles.officerName}>
            {officerName}
          </Text>

          <Text style={styles.roleText}>
            Complaint Management Officer
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>O</Text>
        </View>
      </View>

      {/* Main Banner */}

      <View style={styles.banner}>
        <Text style={styles.bannerLabel}>
          OFFICER PORTAL
        </Text>

        <Text style={styles.bannerTitle}>
          Manage Assigned Issues
        </Text>

        <Text style={styles.bannerDescription}>
          Review citizen complaints, update their
          progress and help resolve community issues.
        </Text>
      </View>

      {/* Statistics */}

      <Text style={styles.sectionTitle}>
        Complaint Overview
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {complaints.length}
          </Text>

          <Text style={styles.statLabel}>
            Assigned
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

      {/* Filters */}

      <Text style={styles.sectionTitle}>
        Assigned Complaints
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {filters.map((filter) => (
          <Pressable
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter &&
                styles.selectedFilterButton,
            ]}
            onPress={() => setSelectedFilter(filter)}
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

      {/* Result count */}

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>
          {selectedFilter === "All"
            ? "All Assigned Issues"
            : `${selectedFilter} Issues`}
        </Text>

        <Text style={styles.resultCount}>
          {filteredComplaints.length} issue
          {filteredComplaints.length !== 1 ? "s" : ""}
        </Text>
      </View>

      {/* Complaint List */}

      <View style={styles.complaintList}>
        {filteredComplaints.map((complaint) => (
          <Pressable
            key={complaint.id}
            style={({ pressed }) => [
              styles.complaintCard,
              pressed && styles.pressedCard,
            ]}
            onPress={() =>
              router.push(
                `/officer/complaint/${complaint.id}`
              )
            }
          >
            {/* ID + Status */}

            <View style={styles.cardTop}>
              <Text style={styles.complaintId}>
                {complaint.complaintId}
              </Text>

              <View
                style={[
                  styles.statusBadge,
                  getStatusStyle(complaint.status),
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

            {/* Title */}

            <Text style={styles.complaintTitle}>
              {complaint.title}
            </Text>

            {/* Category */}

            <Text style={styles.category}>
              {complaint.category}
            </Text>

            {/* Information */}

            <View style={styles.infoContainer}>
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
                  <Text style={styles.priorityText}>
                    {complaint.priority}
                  </Text>
                </View>
              </View>
            </View>

            {/* Bottom */}

            <View style={styles.cardBottom}>
              <Text style={styles.manageText}>
                View & Manage
              </Text>

              <Text style={styles.arrow}>›</Text>
            </View>
          </Pressable>
        ))}
      </View>

      {/* Empty state */}

      {filteredComplaints.length === 0 && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            No complaints found
          </Text>

          <Text style={styles.emptyText}>
            There are no complaints in this category.
          </Text>
        </View>
      )}

      {/* Logout */}

      <Pressable
        style={styles.logoutButton}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.logoutText}>
          Sign Out
        </Text>
      </Pressable>

      <Text style={styles.footer}>
        CivicIssue Officer Portal © 2026
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
    fontSize: 13,
    color: "#6B7280",
  },

  officerName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 2,
  },

  roleText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1D4ED8",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  banner: {
    backgroundColor: "#1E3A8A",
    borderRadius: 18,
    padding: 24,
    marginBottom: 30,
  },

  bannerLabel: {
    color: "#93C5FD",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 7,
  },

  bannerDescription: {
    color: "#DBEAFE",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
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

  statNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#111827",
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

  filterContainer: {
    gap: 8,
    paddingBottom: 24,
  },

  filterButton: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },

  selectedFilterButton: {
    backgroundColor: "#1D4ED8",
    borderColor: "#1D4ED8",
  },

  filterText: {
    fontSize: 13,
    color: "#4B5563",
    fontWeight: "500",
  },

  selectedFilterText: {
    color: "#FFFFFF",
  },

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  listTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },

  resultCount: {
    fontSize: 12,
    color: "#6B7280",
  },

  complaintList: {
    gap: 13,
  },

  complaintCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 18,
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
    marginTop: 13,
  },

  category: {
    alignSelf: "flex-start",
    fontSize: 11,
    color: "#4B5563",
    backgroundColor: "#F3F4F6",
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 7,
    marginTop: 8,
  },

  infoContainer: {
    marginTop: 16,
    gap: 8,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  infoLabel: {
    fontSize: 12,
    color: "#6B7280",
  },

  infoValue: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "500",
  },

  priorityBadge: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 10,
  },

  priorityText: {
    fontSize: 10,
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

  cardBottom: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 13,
    marginTop: 16,
  },

  manageText: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "600",
  },

  arrow: {
    color: "#2563EB",
    fontSize: 22,
    marginLeft: 5,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  emptyText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 5,
  },

  logoutButton: {
    minHeight: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
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