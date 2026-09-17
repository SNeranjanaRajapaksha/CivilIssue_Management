import { router, useLocalSearchParams } from "expo-router";
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

type ComplaintStatus = "Pending" | "In Progress" | "Resolved";

type Complaint = {
  id: number;
  complaintId: string;
  title: string;
  category: string;
  description: string;
  location: string;
  submittedDate: string;
  citizen: string;
  priority: "Low" | "Medium" | "High";
  status: ComplaintStatus;
};

export default function OfficerComplaintDetails() {
  const { id } = useLocalSearchParams();

  const complaints: Complaint[] = [
    {
      id: 1,
      complaintId: "CIV-001",
      title: "Damaged road near bus stop",
      category: "Road & Transport",
      description:
        "There is a large damaged section of the road near the main bus stop. It is difficult for vehicles to pass safely, especially during rainy weather.",
      location: "Main Street",
      submittedDate: "15 Sep 2026",
      citizen: "Citizen User",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      complaintId: "CIV-002",
      title: "Garbage not collected",
      category: "Waste & Garbage",
      description:
        "Garbage has not been collected for several days. Waste is accumulating near the roadside.",
      location: "Lake Road",
      submittedDate: "12 Sep 2026",
      citizen: "Citizen User",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: 3,
      complaintId: "CIV-003",
      title: "Street light not working",
      category: "Street Lighting",
      description:
        "The street light near the junction has not been working for several nights.",
      location: "Temple Road",
      submittedDate: "08 Sep 2026",
      citizen: "Citizen User",
      priority: "Low",
      status: "Resolved",
    },
    {
      id: 4,
      complaintId: "CIV-004",
      title: "Blocked roadside drainage",
      category: "Drainage",
      description:
        "The roadside drainage is blocked and water collects on the road after rainfall.",
      location: "School Road",
      submittedDate: "16 Sep 2026",
      citizen: "Citizen User",
      priority: "High",
      status: "Pending",
    },
  ];

  const complaint = complaints.find(
    (item) => item.id.toString() === id?.toString()
  );

  const [status, setStatus] = useState<ComplaintStatus>(
    complaint?.status || "Pending"
  );

  const [updateNote, setUpdateNote] = useState("");

  if (!complaint) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>
          Complaint Not Found
        </Text>

        <Text style={styles.notFoundText}>
          This complaint could not be found.
        </Text>

        <Pressable
          style={styles.dashboardButton}
          onPress={() => router.replace("/officer/dashboard")}
        >
          <Text style={styles.dashboardButtonText}>
            Back to Dashboard
          </Text>
        </Pressable>
      </View>
    );
  }

  const handleUpdate = () => {
    if (!updateNote.trim()) {
      Alert.alert(
        "Update Note Required",
        "Please enter a note explaining the progress."
      );
      return;
    }

    // Later:
    // Send status + updateNote to Django API.

    Alert.alert(
      "Complaint Updated",
      `Status changed to "${status}".`,
      [
        {
          text: "OK",
          onPress: () => router.replace("/officer/dashboard"),
        },
      ]
    );
  };

  const getPriorityColor = () => {
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
          <Text style={styles.headerTitle}>
            Manage Complaint
          </Text>

          <Text style={styles.headerSubtitle}>
            {complaint.complaintId}
          </Text>
        </View>
      </View>

      {/* Complaint Header */}

      <View style={styles.mainCard}>
        <View style={styles.cardTop}>
          <Text style={styles.complaintId}>
            {complaint.complaintId}
          </Text>

          <View
            style={[
              styles.priorityBadge,
              getPriorityColor(),
            ]}
          >
            <Text style={styles.priorityText}>
              {complaint.priority} Priority
            </Text>
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

        <Text style={styles.label}>Description</Text>

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
          label="Citizen"
          value={complaint.citizen}
        />

        <View style={styles.line} />

        <InfoRow
          label="Location"
          value={complaint.location}
        />

        <View style={styles.line} />

        <InfoRow
          label="Category"
          value={complaint.category}
        />

        <View style={styles.line} />

        <InfoRow
          label="Submitted"
          value={complaint.submittedDate}
        />

        <View style={styles.line} />

        <InfoRow
          label="Priority"
          value={complaint.priority}
        />
      </View>

      {/* Attachment */}

      <Text style={styles.sectionTitle}>
        Citizen Attachment
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
            Citizen-uploaded images will appear here.
          </Text>
        </View>
      </View>

      {/* Status Management */}

      <Text style={styles.sectionTitle}>
        Update Complaint
      </Text>

      <View style={styles.managementCard}>
        <Text style={styles.label}>
          Complaint Status
        </Text>

        <Text style={styles.helperText}>
          Select the current progress of this complaint.
        </Text>

        <View style={styles.statusContainer}>
          <Pressable
            style={[
              styles.statusButton,
              status === "Pending" &&
                styles.pendingSelected,
            ]}
            onPress={() => setStatus("Pending")}
          >
            <Text
              style={[
                styles.statusButtonText,
                status === "Pending" &&
                  styles.selectedText,
              ]}
            >
              Pending
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.statusButton,
              status === "In Progress" &&
                styles.progressSelected,
            ]}
            onPress={() => setStatus("In Progress")}
          >
            <Text
              style={[
                styles.statusButtonText,
                status === "In Progress" &&
                  styles.selectedText,
              ]}
            >
              In Progress
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.statusButton,
              status === "Resolved" &&
                styles.resolvedSelected,
            ]}
            onPress={() => setStatus("Resolved")}
          >
            <Text
              style={[
                styles.statusButtonText,
                status === "Resolved" &&
                  styles.selectedText,
              ]}
            >
              Resolved
            </Text>
          </Pressable>
        </View>

        {/* Update Note */}

        <Text style={styles.label}>
          Progress Note
        </Text>

        <Text style={styles.helperText}>
          Explain what action has been taken.
        </Text>

        <TextInput
          style={styles.textArea}
          value={updateNote}
          onChangeText={setUpdateNote}
          placeholder="Example: Inspected the location and scheduled repair work..."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          maxLength={500}
        />

        <Text style={styles.characterCount}>
          {updateNote.length}/500
        </Text>

        <Pressable
          style={styles.updateButton}
          onPress={handleUpdate}
        >
          <Text style={styles.updateButtonText}>
            Save Update
          </Text>
        </Pressable>
      </View>

      {/* Progress History */}

      <Text style={styles.sectionTitle}>
        Progress History
      </Text>

      <View style={styles.historyCard}>
        <View style={styles.historyItem}>
          <View style={styles.historyDot} />

          <View style={styles.historyContent}>
            <Text style={styles.historyTitle}>
              Complaint Submitted
            </Text>

            <Text style={styles.historyDescription}>
              Citizen submitted this complaint.
            </Text>

            <Text style={styles.historyDate}>
              {complaint.submittedDate}
            </Text>
          </View>
        </View>

        {complaint.status !== "Pending" && (
          <View style={styles.historyItem}>
            <View style={styles.historyDot} />

            <View style={styles.historyContent}>
              <Text style={styles.historyTitle}>
                Complaint Reviewed
              </Text>

              <Text style={styles.historyDescription}>
                Complaint was reviewed and work was started.
              </Text>
            </View>
          </View>
        )}

        {complaint.status === "Resolved" && (
          <View style={styles.historyItem}>
            <View style={styles.resolvedHistoryDot} />

            <View style={styles.historyContent}>
              <Text style={styles.historyTitle}>
                Complaint Resolved
              </Text>

              <Text style={styles.historyDescription}>
                The reported issue was resolved.
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Back */}

      <Pressable
        style={styles.backDashboardButton}
        onPress={() =>
          router.replace("/officer/dashboard")
        }
      >
        <Text style={styles.backDashboardText}>
          Back to Officer Dashboard
        </Text>
      </Pressable>

      <Text style={styles.footer}>
        CivicIssue Officer Portal © 2026
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    width: "100%",
    maxWidth: 750,
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
  },

  complaintId: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },

  priorityBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
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

  helperText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: -3,
    marginBottom: 12,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4B5563",
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
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  attachmentIconText: {
    fontSize: 22,
    color: "#2563EB",
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

  managementCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 28,
  },

  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 25,
  },

  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  },

  statusButtonText: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "600",
  },

  pendingSelected: {
    backgroundColor: "#D97706",
    borderColor: "#D97706",
  },

  progressSelected: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  resolvedSelected: {
    backgroundColor: "#059669",
    borderColor: "#059669",
  },

  selectedText: {
    color: "#FFFFFF",
  },

  textArea: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 14,
    fontSize: 14,
    color: "#111827",
  },

  characterCount: {
    textAlign: "right",
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 5,
    marginBottom: 18,
  },

  updateButton: {
    minHeight: 50,
    backgroundColor: "#2563EB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 28,
  },

  historyItem: {
    flexDirection: "row",
    marginBottom: 20,
  },

  historyDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#2563EB",
    marginTop: 4,
    marginRight: 14,
  },

  resolvedHistoryDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#059669",
    marginTop: 4,
    marginRight: 14,
  },

  historyContent: {
    flex: 1,
  },

  historyTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  historyDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  historyDate: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 5,
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
    backgroundColor: "#2563EB",
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