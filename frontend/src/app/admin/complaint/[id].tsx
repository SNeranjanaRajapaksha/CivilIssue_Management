import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ComplaintStatus = "Pending" | "In Progress" | "Resolved";
type Priority = "Low" | "Medium" | "High";

type Complaint = {
  id: number;
  complaintId: string;
  title: string;
  category: string;
  description: string;
  citizen: string;
  citizenEmail: string;
  location: string;
  submittedDate: string;
  status: ComplaintStatus;
  priority: Priority;
  assignedOfficer: number | null;
};

type Officer = {
  id: number;
  name: string;
  department: string;
  activeComplaints: number;
};

export default function AdminComplaintDetails() {
  const { id } = useLocalSearchParams();

  // Temporary complaint data.
  // Later this will come from Django.
  const complaints: Complaint[] = [
    {
      id: 1,
      complaintId: "CIV-001",
      title: "Damaged road near bus stop",
      category: "Road & Transport",
      description:
        "There is a large damaged section of the road near the main bus stop. It is difficult for vehicles to pass safely, especially during rainy weather.",
      citizen: "Citizen User",
      citizenEmail: "citizen@example.com",
      location: "Main Street",
      submittedDate: "15 Sep 2026",
      status: "Pending",
      priority: "High",
      assignedOfficer: null,
    },
    {
      id: 2,
      complaintId: "CIV-002",
      title: "Garbage not collected",
      category: "Waste & Garbage",
      description:
        "Garbage has not been collected for several days. Waste is accumulating near the roadside.",
      citizen: "Citizen User",
      citizenEmail: "citizen@example.com",
      location: "Lake Road",
      submittedDate: "12 Sep 2026",
      status: "In Progress",
      priority: "Medium",
      assignedOfficer: 2,
    },
    {
      id: 3,
      complaintId: "CIV-003",
      title: "Street light not working",
      category: "Street Lighting",
      description:
        "The street light near the junction has not been working for several nights.",
      citizen: "Citizen User",
      citizenEmail: "citizen@example.com",
      location: "Temple Road",
      submittedDate: "08 Sep 2026",
      status: "Resolved",
      priority: "Low",
      assignedOfficer: 3,
    },
    {
      id: 4,
      complaintId: "CIV-004",
      title: "Blocked roadside drainage",
      category: "Drainage",
      description:
        "The roadside drainage is blocked and water collects on the road after rainfall.",
      citizen: "Citizen User",
      citizenEmail: "citizen@example.com",
      location: "School Road",
      submittedDate: "16 Sep 2026",
      status: "Pending",
      priority: "High",
      assignedOfficer: null,
    },
  ];

  // Temporary officers.
  // Later this will come from Django.
  const officers: Officer[] = [
    {
      id: 1,
      name: "Officer 01",
      department: "Road & Transport",
      activeComplaints: 2,
    },
    {
      id: 2,
      name: "Officer 02",
      department: "Waste Management",
      activeComplaints: 3,
    },
    {
      id: 3,
      name: "Officer 03",
      department: "Public Utilities",
      activeComplaints: 1,
    },
    {
      id: 4,
      name: "Officer 04",
      department: "Drainage & Water",
      activeComplaints: 2,
    },
  ];

  const complaint = complaints.find(
    (item) => item.id.toString() === id?.toString()
  );

  const [selectedOfficer, setSelectedOfficer] = useState<number | null>(
    complaint?.assignedOfficer ?? null
  );

  if (!complaint) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>
          Complaint Not Found
        </Text>

        <Text style={styles.notFoundText}>
          The requested complaint could not be found.
        </Text>

        <Pressable
          style={styles.dashboardButton}
          onPress={() => router.replace("/admin/dashboard")}
        >
          <Text style={styles.dashboardButtonText}>
            Back to Dashboard
          </Text>
        </Pressable>
      </View>
    );
  }

  const handleAssign = () => {
    if (selectedOfficer === null) {
      Alert.alert(
        "Select Officer",
        "Please select an officer before assigning this complaint."
      );

      return;
    }

    const officer = officers.find(
      (item) => item.id === selectedOfficer
    );

    if (!officer) {
      return;
    }

    // Later:
    // Send complaint ID and officer ID to Django API.

    Alert.alert(
      "Complaint Assigned",
      `${complaint.complaintId} has been assigned to ${officer.name}.`,
      [
        {
          text: "OK",
          onPress: () => router.replace("/admin/dashboard"),
        },
      ]
    );
  };

  const handleRemoveAssignment = () => {
    setSelectedOfficer(null);

    // Later this will update Django.
    Alert.alert(
      "Assignment Removed",
      "The officer assignment has been removed temporarily."
    );
  };

  const getStatusStyle = () => {
    if (complaint.status === "Pending") {
      return styles.pendingStatus;
    }

    if (complaint.status === "In Progress") {
      return styles.progressStatus;
    }

    return styles.resolvedStatus;
  };

  const getStatusTextStyle = () => {
    if (complaint.status === "Pending") {
      return styles.pendingText;
    }

    if (complaint.status === "In Progress") {
      return styles.progressText;
    }

    return styles.resolvedText;
  };

  const getPriorityStyle = () => {
    if (complaint.priority === "High") {
      return styles.highPriority;
    }

    if (complaint.priority === "Medium") {
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
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>
            Complaint Management
          </Text>

          <Text style={styles.headerSubtitle}>
            Review and assign complaint
          </Text>
        </View>
      </View>

      {/* Complaint Header */}

      <View style={styles.mainCard}>
        <View style={styles.cardTop}>
          <Text style={styles.complaintId}>
            {complaint.complaintId}
          </Text>

          <View style={styles.badges}>
            <View
              style={[
                styles.badge,
                getPriorityStyle(),
              ]}
            >
              <Text style={styles.priorityText}>
                {complaint.priority}
              </Text>
            </View>

            <View
              style={[
                styles.badge,
                getStatusStyle(),
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  getStatusTextStyle(),
                ]}
              >
                {complaint.status}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>
          {complaint.title}
        </Text>

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>
            {complaint.category}
          </Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.label}>
          Description
        </Text>

        <Text style={styles.description}>
          {complaint.description}
        </Text>
      </View>

      {/* Complaint Information */}

      <Text style={styles.sectionTitle}>
        Complaint Information
      </Text>

      <View style={styles.infoCard}>
        <InfoRow
          label="Complaint ID"
          value={complaint.complaintId}
        />

        <View style={styles.line} />

        <InfoRow
          label="Category"
          value={complaint.category}
        />

        <View style={styles.line} />

        <InfoRow
          label="Location"
          value={complaint.location}
        />

        <View style={styles.line} />

        <InfoRow
          label="Submitted"
          value={complaint.submittedDate}
        />

        <View style={styles.line} />

        <InfoRow
          label="Status"
          value={complaint.status}
        />

        <View style={styles.line} />

        <InfoRow
          label="Priority"
          value={complaint.priority}
        />
      </View>

      {/* Citizen Information */}

      <Text style={styles.sectionTitle}>
        Citizen Information
      </Text>

      <View style={styles.infoCard}>
        <InfoRow
          label="Name"
          value={complaint.citizen}
        />

        <View style={styles.line} />

        <InfoRow
          label="Email"
          value={complaint.citizenEmail}
        />
      </View>

      {/* Attachment */}

      <Text style={styles.sectionTitle}>
        Complaint Attachment
      </Text>

      <View style={styles.attachmentCard}>
        <View style={styles.attachmentIcon}>
          <Text style={styles.attachmentIconText}>
            ▧
          </Text>
        </View>

        <View style={styles.attachmentContent}>
          <Text style={styles.attachmentTitle}>
            No attachment available
          </Text>

          <Text style={styles.attachmentDescription}>
            Citizen-uploaded images will be shown here.
          </Text>
        </View>
      </View>

      {/* Officer Assignment */}

      <Text style={styles.sectionTitle}>
        Officer Assignment
      </Text>

      <View style={styles.assignmentCard}>
        <Text style={styles.assignmentTitle}>
          Select Officer
        </Text>

        <Text style={styles.assignmentDescription}>
          Choose the appropriate officer to handle this
          complaint.
        </Text>

        <View style={styles.officerList}>
          {officers.map((officer) => {
            const isSelected =
              selectedOfficer === officer.id;

            return (
              <Pressable
                key={officer.id}
                style={[
                  styles.officerCard,
                  isSelected &&
                    styles.selectedOfficerCard,
                ]}
                onPress={() =>
                  setSelectedOfficer(officer.id)
                }
              >
                <View
                  style={[
                    styles.officerAvatar,
                    isSelected &&
                      styles.selectedOfficerAvatar,
                  ]}
                >
                  <Text
                    style={[
                      styles.officerAvatarText,
                      isSelected &&
                        styles.selectedOfficerAvatarText,
                    ]}
                  >
                    O
                  </Text>
                </View>

                <View style={styles.officerContent}>
                  <Text style={styles.officerName}>
                    {officer.name}
                  </Text>

                  <Text
                    style={styles.officerDepartment}
                  >
                    {officer.department}
                  </Text>

                  <Text style={styles.workload}>
                    {officer.activeComplaints} active{" "}
                    {officer.activeComplaints === 1
                      ? "complaint"
                      : "complaints"}
                  </Text>
                </View>

                <View
                  style={[
                    styles.radioOuter,
                    isSelected &&
                      styles.selectedRadioOuter,
                  ]}
                >
                  {isSelected && (
                    <View
                      style={styles.radioInner}
                    />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Selected Officer */}

        {selectedOfficer !== null && (
          <View style={styles.selectedBox}>
            <Text style={styles.selectedLabel}>
              Selected Officer
            </Text>

            <Text style={styles.selectedName}>
              {
                officers.find(
                  (item) =>
                    item.id === selectedOfficer
                )?.name
              }
            </Text>
          </View>
        )}

        {/* Assign Button */}

        <Pressable
          style={[
            styles.assignButton,
            selectedOfficer === null &&
              styles.disabledButton,
          ]}
          onPress={handleAssign}
          disabled={selectedOfficer === null}
        >
          <Text style={styles.assignButtonText}>
            {complaint.assignedOfficer
              ? "Update Assignment"
              : "Assign Complaint"}
          </Text>
        </Pressable>

        {complaint.assignedOfficer !== null && (
          <Pressable
            style={styles.removeButton}
            onPress={handleRemoveAssignment}
          >
            <Text style={styles.removeButtonText}>
              Remove Assignment
            </Text>
          </Pressable>
        )}
      </View>

      {/* Workflow Information */}

      <Text style={styles.sectionTitle}>
        Complaint Workflow
      </Text>

      <View style={styles.workflowCard}>
        <WorkflowItem
          number="1"
          title="Complaint Submitted"
          description="Citizen reports an issue."
          active
        />

        <WorkflowItem
          number="2"
          title="Admin Review"
          description="Administrator reviews the complaint."
          active
        />

        <WorkflowItem
          number="3"
          title="Officer Assignment"
          description={
            selectedOfficer
              ? "An officer has been selected."
              : "Waiting for officer assignment."
          }
          active={selectedOfficer !== null}
        />

        <WorkflowItem
          number="4"
          title="Issue Resolution"
          description="Assigned officer investigates and resolves the issue."
          active={
            complaint.status === "In Progress" ||
            complaint.status === "Resolved"
          }
        />

        <WorkflowItem
          number="5"
          title="Completed"
          description="Citizen can view the final resolution."
          active={complaint.status === "Resolved"}
          last
        />
      </View>

      {/* Back */}

      <Pressable
        style={styles.backDashboardButton}
        onPress={() =>
          router.replace("/admin/dashboard")
        }
      >
        <Text style={styles.backDashboardText}>
          Back to Admin Dashboard
        </Text>
      </Pressable>

      <Text style={styles.footer}>
        CivicIssue Admin Portal © 2026
      </Text>
    </ScrollView>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}

function WorkflowItem({
  number,
  title,
  description,
  active,
  last = false,
}: {
  number: string;
  title: string;
  description: string;
  active: boolean;
  last?: boolean;
}) {
  return (
    <View style={styles.workflowItem}>
      <View style={styles.workflowLeft}>
        <View
          style={[
            styles.workflowCircle,
            active &&
              styles.activeWorkflowCircle,
          ]}
        >
          <Text
            style={[
              styles.workflowNumber,
              active &&
                styles.activeWorkflowNumber,
            ]}
          >
            {number}
          </Text>
        </View>

        {!last && (
          <View
            style={[
              styles.workflowLine,
              active &&
                styles.activeWorkflowLine,
            ]}
          />
        )}
      </View>

      <View style={styles.workflowContent}>
        <Text style={styles.workflowTitle}>
          {title}
        </Text>

        <Text style={styles.workflowDescription}>
          {description}
        </Text>
      </View>
    </View>
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

  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 28,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  complaintId: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },

  badges: {
    flexDirection: "row",
    gap: 7,
  },

  badge: {
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 14,
  },

  priorityText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#374151",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "600",
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

  title: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 15,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 7,
    marginTop: 10,
  },

  categoryText: {
    fontSize: 11,
    color: "#4B5563",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 22,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 28,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    gap: 20,
  },

  infoLabel: {
    fontSize: 13,
    color: "#6B7280",
  },

  infoValue: {
    flex: 1,
    fontSize: 13,
    color: "#111827",
    fontWeight: "500",
    textAlign: "right",
  },

  line: {
    height: 1,
    backgroundColor: "#F3F4F6",
  },

  attachmentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 28,
  },

  attachmentIcon: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: "#F5F3FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  attachmentIconText: {
    color: "#7C3AED",
    fontSize: 22,
  },

  attachmentContent: {
    flex: 1,
  },

  attachmentTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  attachmentDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  assignmentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 28,
  },

  assignmentTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  assignmentDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 18,
  },

  officerList: {
    gap: 10,
  },

  officerCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
  },

  selectedOfficerCard: {
    borderColor: "#7C3AED",
    backgroundColor: "#FAF5FF",
  },

  officerAvatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  selectedOfficerAvatar: {
    backgroundColor: "#7C3AED",
  },

  officerAvatarText: {
    color: "#4B5563",
    fontWeight: "bold",
  },

  selectedOfficerAvatarText: {
    color: "#FFFFFF",
  },

  officerContent: {
    flex: 1,
  },

  officerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  officerDepartment: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 3,
  },

  workload: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 3,
  },

  radioOuter: {
    width: 21,
    height: 21,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },

  selectedRadioOuter: {
    borderColor: "#7C3AED",
  },

  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#7C3AED",
  },

  selectedBox: {
    backgroundColor: "#F5F3FF",
    borderRadius: 10,
    padding: 13,
    marginTop: 18,
  },

  selectedLabel: {
    fontSize: 10,
    color: "#7C3AED",
    fontWeight: "600",
  },

  selectedName: {
    fontSize: 14,
    color: "#4C1D95",
    fontWeight: "bold",
    marginTop: 3,
  },

  assignButton: {
    minHeight: 50,
    backgroundColor: "#7C3AED",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },

  disabledButton: {
    backgroundColor: "#C4B5FD",
  },

  assignButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  removeButton: {
    minHeight: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  removeButtonText: {
    color: "#DC2626",
    fontSize: 13,
    fontWeight: "600",
  },

  workflowCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 28,
  },

  workflowItem: {
    flexDirection: "row",
    minHeight: 75,
  },

  workflowLeft: {
    width: 35,
    alignItems: "center",
  },

  workflowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  activeWorkflowCircle: {
    backgroundColor: "#7C3AED",
  },

  workflowNumber: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "bold",
  },

  activeWorkflowNumber: {
    color: "#FFFFFF",
  },

  workflowLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#E5E7EB",
  },

  activeWorkflowLine: {
    backgroundColor: "#C4B5FD",
  },

  workflowContent: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 20,
  },

  workflowTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  workflowDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    lineHeight: 18,
  },

  backDashboardButton: {
    minHeight: 50,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  backDashboardText: {
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

  notFoundContainer: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  notFoundTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  notFoundText: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 7,
  },

  dashboardButton: {
    backgroundColor: "#7C3AED",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 9,
    marginTop: 20,
  },

  dashboardButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});