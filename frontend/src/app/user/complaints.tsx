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
};

export default function ComplaintsScreen() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "Pending", "In Progress", "Resolved"];

  // Temporary data
  // Later this will come from the Django API.
  const complaints: Complaint[] = [
    {
      id: 1,
      complaintId: "CIV-001",
      title: "Damaged road near bus stop",
      category: "Road & Transport",
      location: "Main Street",
      date: "15 Sep 2026",
      status: "Pending",
    },
    {
      id: 2,
      complaintId: "CIV-002",
      title: "Garbage not collected",
      category: "Waste & Garbage",
      location: "Lake Road",
      date: "12 Sep 2026",
      status: "In Progress",
    },
    {
      id: 3,
      complaintId: "CIV-003",
      title: "Street light not working",
      category: "Street Lighting",
      location: "Temple Road",
      date: "08 Sep 2026",
      status: "Resolved",
    },
  ];

  const filteredComplaints =
    selectedFilter === "All"
      ? complaints
      : complaints.filter(
          (complaint) => complaint.status === selectedFilter
        );

  const getStatusStyle = (status: ComplaintStatus) => {
    switch (status) {
      case "Pending":
        return styles.pendingStatus;

      case "In Progress":
        return styles.progressStatus;

      case "Resolved":
        return styles.resolvedStatus;

      default:
        return {};
    }
  };

  const getStatusTextStyle = (status: ComplaintStatus) => {
    switch (status) {
      case "Pending":
        return styles.pendingText;

      case "In Progress":
        return styles.progressText;

      case "Resolved":
        return styles.resolvedText;

      default:
        return {};
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
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
          <Text style={styles.title}>My Complaints</Text>

          <Text style={styles.subtitle}>
            Track your submitted issues
          </Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/user/create-complaint")}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      {/* Summary */}

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            {complaints.length}
          </Text>

          <Text style={styles.summaryLabel}>Total</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            {
              complaints.filter(
                (complaint) => complaint.status === "Pending"
              ).length
            }
          </Text>

          <Text style={styles.summaryLabel}>Pending</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            {
              complaints.filter(
                (complaint) =>
                  complaint.status === "In Progress"
              ).length
            }
          </Text>

          <Text style={styles.summaryLabel}>In Progress</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            {
              complaints.filter(
                (complaint) => complaint.status === "Resolved"
              ).length
            }
          </Text>

          <Text style={styles.summaryLabel}>Resolved</Text>
        </View>
      </View>

      {/* Filter */}

      <Text style={styles.sectionTitle}>Filter Complaints</Text>

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

      {/* Complaints */}

      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>
          {selectedFilter === "All"
            ? "All Complaints"
            : selectedFilter}
        </Text>

        <Text style={styles.resultCount}>
          {filteredComplaints.length} issue
          {filteredComplaints.length !== 1 ? "s" : ""}
        </Text>
      </View>

      {filteredComplaints.length > 0 ? (
        <View style={styles.complaintList}>
          {filteredComplaints.map((complaint) => (
            <Pressable
              key={complaint.id}
              style={({ pressed }) => [
                styles.complaintCard,
                pressed && styles.cardPressed,
              ]}
              onPress={() =>
                router.push(`/user/complaint/${complaint.id}`)
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
                      getStatusTextStyle(complaint.status),
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

              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>
                  {complaint.category}
                </Text>
              </View>

              {/* Information */}

              <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>
                  Location: {complaint.location}
                </Text>

                <Text style={styles.detailText}>
                  Submitted: {complaint.date}
                </Text>
              </View>

              <View style={styles.cardBottom}>
                <Text style={styles.viewDetails}>
                  View Details
                </Text>

                <Text style={styles.arrow}>›</Text>
              </View>
            </Pressable>
          ))}
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>!</Text>

          <Text style={styles.emptyTitle}>
            No complaints found
          </Text>

          <Text style={styles.emptyDescription}>
            You don't have any {selectedFilter.toLowerCase()}{" "}
            complaints.
          </Text>
        </View>
      )}

      {/* New Complaint */}

      <Pressable
        style={styles.reportButton}
        onPress={() => router.push("/user/create-complaint")}
      >
        <Text style={styles.reportButtonText}>
          + Report New Issue
        </Text>
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
    maxWidth: 800,
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
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
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

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 3,
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 25,
  },

  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 28,
  },

  summaryCard: {
    flexGrow: 1,
    flexBasis: "45%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 13,
    padding: 16,
  },

  summaryNumber: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#2563EB",
  },

  summaryLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },

  filterContainer: {
    gap: 8,
    paddingBottom: 25,
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
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  filterText: {
    color: "#4B5563",
    fontSize: 13,
    fontWeight: "500",
  },

  selectedFilterText: {
    color: "#FFFFFF",
  },

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  resultCount: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 12,
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

  cardPressed: {
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

  detailsContainer: {
    marginTop: 15,
    gap: 5,
  },

  detailText: {
    fontSize: 12,
    color: "#6B7280",
  },

  cardBottom: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },

  viewDetails: {
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
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  emptyIcon: {
    fontSize: 22,
    color: "#2563EB",
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  emptyDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 6,
    textAlign: "center",
  },

  reportButton: {
    backgroundColor: "#2563EB",
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 25,
  },

  reportButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  footer: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 25,
  },
});