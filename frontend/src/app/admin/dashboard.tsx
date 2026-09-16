import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ComplaintStatus =
  | "Pending"
  | "In Progress"
  | "Resolved";

type Complaint = {
  id: number;
  complaintId: string;
  title: string;
  category: string;
  citizen: string;
  location: string;
  status: ComplaintStatus;
  assignedOfficer: string | null;
};

export default function AdminDashboard() {
  // Temporary data.
  // Later this will come from Django.

  const complaints: Complaint[] = [
    {
      id: 1,
      complaintId: "CIV-001",
      title: "Damaged road near bus stop",
      category: "Road & Transport",
      citizen: "Citizen User",
      location: "Main Street",
      status: "Pending",
      assignedOfficer: null,
    },
    {
      id: 2,
      complaintId: "CIV-002",
      title: "Garbage not collected",
      category: "Waste & Garbage",
      citizen: "Citizen User",
      location: "Lake Road",
      status: "In Progress",
      assignedOfficer: "Officer 01",
    },
    {
      id: 3,
      complaintId: "CIV-003",
      title: "Street light not working",
      category: "Street Lighting",
      citizen: "Citizen User",
      location: "Temple Road",
      status: "Resolved",
      assignedOfficer: "Officer 02",
    },
    {
      id: 4,
      complaintId: "CIV-004",
      title: "Blocked roadside drainage",
      category: "Drainage",
      citizen: "Citizen User",
      location: "School Road",
      status: "Pending",
      assignedOfficer: null,
    },
  ];

  const totalUsers = 24;
  const totalOfficers = 5;

  const pendingCount = complaints.filter(
    (item) => item.status === "Pending"
  ).length;

  const progressCount = complaints.filter(
    (item) => item.status === "In Progress"
  ).length;

  const resolvedCount = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

  const unassignedComplaints = complaints.filter(
    (item) => item.assignedOfficer === null
  );

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

          <Text style={styles.adminName}>
            Administrator
          </Text>

          <Text style={styles.roleText}>
            CivicIssue Administration
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            A
          </Text>
        </View>
      </View>

      {/* Admin Banner */}

      <View style={styles.banner}>
        <Text style={styles.bannerLabel}>
          ADMIN PORTAL
        </Text>

        <Text style={styles.bannerTitle}>
          System Overview
        </Text>

        <Text style={styles.bannerDescription}>
          Manage complaints, officers, users and
          monitor the overall complaint resolution
          process.
        </Text>
      </View>

      {/* Complaint Statistics */}

      <Text style={styles.sectionTitle}>
        Complaint Overview
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.totalNumber}>
            {complaints.length}
          </Text>

          <Text style={styles.statLabel}>
            Total Complaints
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

      {/* System Statistics */}

      <Text style={styles.sectionTitle}>
        System Users
      </Text>

      <View style={styles.userStats}>
        <View style={styles.userStatCard}>
          <Text style={styles.userStatNumber}>
            {totalUsers}
          </Text>

          <Text style={styles.userStatLabel}>
            Registered Citizens
          </Text>
        </View>

        <View style={styles.userStatCard}>
          <Text style={styles.userStatNumber}>
            {totalOfficers}
          </Text>

          <Text style={styles.userStatLabel}>
            Officers
          </Text>
        </View>
      </View>

      {/* Quick Management */}

      <Text style={styles.sectionTitle}>
        Management
      </Text>

      <View style={styles.managementContainer}>
        <Pressable
          style={styles.managementCard}
          onPress={() =>
            router.push("/admin/complaints")
          }
        >
          <View style={styles.managementIcon}>
            <Text style={styles.managementIconText}>
              ≡
            </Text>
          </View>

          <View style={styles.managementContent}>
            <Text style={styles.managementTitle}>
              Manage Complaints
            </Text>

            <Text style={styles.managementDescription}>
              Review, assign and manage all complaints
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <Pressable
          style={styles.managementCard}
          onPress={() =>
            router.push("/admin/officers")
          }
        >
          <View style={styles.managementIcon}>
            <Text style={styles.managementIconText}>
              O
            </Text>
          </View>

          <View style={styles.managementContent}>
            <Text style={styles.managementTitle}>
              Manage Officers
            </Text>

            <Text style={styles.managementDescription}>
              View and manage officer accounts
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <Pressable
          style={styles.managementCard}
          onPress={() =>
            router.push("/admin/users")
          }
        >
          <View style={styles.managementIcon}>
            <Text style={styles.managementIconText}>
              U
            </Text>
          </View>

          <View style={styles.managementContent}>
            <Text style={styles.managementTitle}>
              Manage Users
            </Text>

            <Text style={styles.managementDescription}>
              View registered citizen accounts
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>
      </View>

      {/* Unassigned Complaints */}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Unassigned Complaints
        </Text>

        <Text style={styles.countText}>
          {unassignedComplaints.length}
        </Text>
      </View>

      {unassignedComplaints.length > 0 ? (
        <View style={styles.complaintList}>
          {unassignedComplaints.map(
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

                <Text
                  style={styles.complaintTitle}
                >
                  {complaint.title}
                </Text>

                <View style={styles.categoryBadge}>
                  <Text
                    style={styles.categoryText}
                  >
                    {complaint.category}
                  </Text>
                </View>

                <View style={styles.details}>
                  <Text style={styles.detailText}>
                    Citizen: {complaint.citizen}
                  </Text>

                  <Text style={styles.detailText}>
                    Location: {complaint.location}
                  </Text>

                  <Text
                    style={styles.unassignedText}
                  >
                    Officer: Not Assigned
                  </Text>
                </View>

                <View style={styles.cardBottom}>
                  <Text
                    style={styles.assignText}
                  >
                    Review & Assign
                  </Text>

                  <Text style={styles.arrow}>
                    ›
                  </Text>
                </View>
              </Pressable>
            )
          )}
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            No unassigned complaints
          </Text>

          <Text style={styles.emptyText}>
            All complaints have been assigned
            to officers.
          </Text>
        </View>
      )}

      {/* Recent Complaints */}

      <Text style={styles.recentTitle}>
        Recent Complaints
      </Text>

      <View style={styles.recentCard}>
        {complaints.slice(0, 3).map(
          (complaint, index) => (
            <View key={complaint.id}>
              <Pressable
                style={styles.recentItem}
                onPress={() =>
                  router.push(
                    `/admin/complaint/${complaint.id}`
                  )
                }
              >
                <View
                  style={styles.recentContent}
                >
                  <Text
                    style={styles.recentComplaintId}
                  >
                    {complaint.complaintId}
                  </Text>

                  <Text
                    style={styles.recentComplaintTitle}
                  >
                    {complaint.title}
                  </Text>
                </View>

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
              </Pressable>

              {index < 2 && (
                <View style={styles.divider} />
              )}
            </View>
          )
        )}
      </View>

      {/* Logout */}

      <Pressable
        style={styles.logoutButton}
        onPress={() =>
          router.replace("/login")
        }
      >
        <Text style={styles.logoutText}>
          Sign Out
        </Text>
      </Pressable>

      <Text style={styles.footer}>
        CivicIssue Admin Portal © 2026
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
    maxWidth: 950,
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

  adminName: {
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
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  banner: {
    backgroundColor: "#4C1D95",
    borderRadius: 18,
    padding: 24,
    marginBottom: 30,
  },

  bannerLabel: {
    color: "#C4B5FD",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 7,
  },

  bannerDescription: {
    color: "#EDE9FE",
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

  userStats: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },

  userStatCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  userStatNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7C3AED",
  },

  userStatLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 5,
  },

  managementContainer: {
    gap: 12,
    marginBottom: 30,
  },

  managementCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  managementIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#F5F3FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  managementIconText: {
    color: "#7C3AED",
    fontSize: 19,
    fontWeight: "bold",
  },

  managementContent: {
    flex: 1,
  },

  managementTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  managementDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  arrow: {
    fontSize: 25,
    color: "#9CA3AF",
    marginLeft: 8,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  countText: {
    color: "#FFFFFF",
    backgroundColor: "#DC2626",
    minWidth: 25,
    height: 25,
    borderRadius: 13,
    textAlign: "center",
    lineHeight: 25,
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 13,
  },

  complaintList: {
    gap: 12,
    marginBottom: 30,
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
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 14,
  },

  statusText: {
    fontSize: 10,
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 12,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 9,
    marginTop: 8,
  },

  categoryText: {
    fontSize: 11,
    color: "#4B5563",
  },

  details: {
    marginTop: 14,
    gap: 5,
  },

  detailText: {
    fontSize: 12,
    color: "#6B7280",
  },

  unassignedText: {
    fontSize: 12,
    color: "#DC2626",
    fontWeight: "600",
  },

  cardBottom: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    marginTop: 15,
    paddingTop: 12,
  },

  assignText: {
    color: "#7C3AED",
    fontSize: 12,
    fontWeight: "600",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 30,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111827",
  },

  emptyText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 5,
  },

  recentTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },

  recentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },

  recentContent: {
    flex: 1,
    marginRight: 10,
  },

  recentComplaintId: {
    fontSize: 11,
    color: "#6B7280",
  },

  recentComplaintTitle: {
    fontSize: 13,
    color: "#111827",
    fontWeight: "600",
    marginTop: 3,
  },

  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
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