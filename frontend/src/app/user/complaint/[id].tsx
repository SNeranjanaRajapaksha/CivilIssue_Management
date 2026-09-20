import { router, useLocalSearchParams } from "expo-router";
import React from "react";
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
  description: string;
  location: string;
  submittedDate: string;
  status: ComplaintStatus;
};

export default function ComplaintDetailsScreen() {
  const { id } = useLocalSearchParams();

  // Temporary sample data.
  // Later this will come from Django.
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
      status: "Pending",
    },
    {
      id: 2,
      complaintId: "CIV-002",
      title: "Garbage not collected",
      category: "Waste & Garbage",
      description:
        "Garbage has not been collected for several days. Waste is accumulating near the roadside and causing an unpleasant smell.",
      location: "Lake Road",
      submittedDate: "12 Sep 2026",
      status: "In Progress",
    },
    {
      id: 3,
      complaintId: "CIV-003",
      title: "Street light not working",
      category: "Street Lighting",
      description:
        "The street light near the junction has not been working for several nights. The area becomes very dark at night.",
      location: "Temple Road",
      submittedDate: "08 Sep 2026",
      status: "Resolved",
    },
  ];

  const complaint = complaints.find(
    (item) => item.id.toString() === id?.toString()
  );

  if (!complaint) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>
          Complaint Not Found
        </Text>

        <Text style={styles.notFoundText}>
          We couldn't find this complaint.
        </Text>

        <Pressable
          style={styles.backToComplaintsButton}
          onPress={() => router.replace("/user/complaints")}
        >
          <Text style={styles.backToComplaintsText}>
            Back to My Complaints
          </Text>
        </Pressable>
      </View>
    );
  }

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
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>
            Complaint Details
          </Text>

          <Text style={styles.headerSubtitle}>
            {complaint.complaintId}
          </Text>
        </View>
      </View>

      {/* Main information */}
      <View style={styles.mainCard}>
        <View style={styles.cardTop}>
          <Text style={styles.complaintId}>
            {complaint.complaintId}
          </Text>

          <View
            style={[
              styles.statusBadge,
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

      {/* Issue Information */}
      <Text style={styles.sectionTitle}>
        Issue Information
      </Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location</Text>

          <Text style={styles.infoValue}>
            {complaint.location}
          </Text>
        </View>

        <View style={styles.line} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Submitted
          </Text>

          <Text style={styles.infoValue}>
            {complaint.submittedDate}
          </Text>
        </View>

        <View style={styles.line} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Category</Text>

          <Text style={styles.infoValue}>
            {complaint.category}
          </Text>
        </View>

        <View style={styles.line} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status</Text>

          <Text style={styles.infoValue}>
            {complaint.status}
          </Text>
        </View>
      </View>

      {/* Attachment */}
      <Text style={styles.sectionTitle}>
        Attachment
      </Text>

      <View style={styles.attachmentCard}>
        <View style={styles.attachmentPlaceholder}>
          <Text style={styles.attachmentIcon}>▧</Text>
        </View>

        <View style={styles.attachmentContent}>
          <Text style={styles.attachmentTitle}>
            No attachment available
          </Text>

          <Text style={styles.attachmentDescription}>
            Complaint images will appear here.
          </Text>
        </View>
      </View>

      {/* Progress */}
      <Text style={styles.sectionTitle}>
        Complaint Progress
      </Text>

      <View style={styles.progressCard}>
        <ProgressItem
          title="Complaint Submitted"
          description={`Submitted on ${complaint.submittedDate}`}
          completed={true}
        />

        <ProgressItem
          title="Under Review"
          description="Complaint is being reviewed"
          completed={
            complaint.status === "In Progress" ||
            complaint.status === "Resolved"
          }
        />

        <ProgressItem
          title="In Progress"
          description="Officer is working on the issue"
          completed={
            complaint.status === "In Progress" ||
            complaint.status === "Resolved"
          }
        />

        <ProgressItem
          title="Resolved"
          description="Issue has been resolved"
          completed={complaint.status === "Resolved"}
          last={true}
        />
      </View>

      {/* Officer section */}
      <Text style={styles.sectionTitle}>
        Assigned Officer
      </Text>

      <View style={styles.officerCard}>
        <View style={styles.officerAvatar}>
          <Text style={styles.officerAvatarText}>O</Text>
        </View>

        <View style={styles.officerContent}>
          <Text style={styles.officerName}>
            {complaint.status === "Pending"
              ? "Not assigned yet"
              : "Municipal Officer"}
          </Text>

          <Text style={styles.officerDescription}>
            {complaint.status === "Pending"
              ? "An officer will be assigned after review."
              : "Assigned to handle this complaint."}
          </Text>
        </View>
      </View>

      {/* Feedback */}
      {complaint.status === "Resolved" && (
        <>
          <Text style={styles.sectionTitle}>
            Your Feedback
          </Text>

          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackTitle}>
              Was this issue resolved satisfactorily?
            </Text>

            <Text style={styles.feedbackDescription}>
              Your feedback helps improve our service.
            </Text>

            <Pressable
              style={styles.feedbackButton}
              onPress={() =>
                alert(
                  "Feedback functionality will be added later."
                )
              }
            >
              <Text style={styles.feedbackButtonText}>
                Give Feedback
              </Text>
            </Pressable>
          </View>
        </>
      )}

      <Pressable
        style={styles.backToListButton}
        onPress={() => router.replace("/user/complaints")}
      >
        <Text style={styles.backToListText}>
          Back to My Complaints
        </Text>
      </Pressable>

      <Text style={styles.footer}>
        CivicIssue © 2026
      </Text>
    </ScrollView>
  );
}

type ProgressItemProps = {
  title: string;
  description: string;
  completed: boolean;
  last?: boolean;
};

function ProgressItem({
  title,
  description,
  completed,
  last = false,
}: ProgressItemProps) {
  return (
    <View style={styles.progressItem}>
      <View style={styles.progressLeft}>
        <View
          style={[
            styles.progressCircle,
            completed && styles.completedCircle,
          ]}
        >
          <Text
            style={[
              styles.progressCheck,
              completed && styles.completedCheck,
            ]}
          >
            {completed ? "✓" : ""}
          </Text>
        </View>

        {!last && (
          <View
            style={[
              styles.progressLine,
              completed && styles.completedLine,
            ]}
          />
        )}
      </View>

      <View style={styles.progressContent}>
        <Text style={styles.progressTitle}>
          {title}
        </Text>

        <Text style={styles.progressDescription}>
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
    maxWidth: 750,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
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

  backIcon: {
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
    color: "#6B7280",
    fontSize: 13,
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
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "600",
  },

  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 11,
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

  title: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 15,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 9,
    marginTop: 10,
  },

  categoryText: {
    color: "#4B5563",
    fontSize: 11,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 20,
  },

  label: {
    fontSize: 13,
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
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  attachmentPlaceholder: {
    width: 55,
    height: 55,
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  attachmentIcon: {
    fontSize: 23,
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

  progressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 28,
  },

  progressItem: {
    flexDirection: "row",
    minHeight: 75,
  },

  progressLeft: {
    alignItems: "center",
    marginRight: 14,
  },

  progressCircle: {
    width: 27,
    height: 27,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  completedCircle: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  progressCheck: {
    fontSize: 13,
  },

  completedCheck: {
    color: "#FFFFFF",
  },

  progressLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#E5E7EB",
  },

  completedLine: {
    backgroundColor: "#2563EB",
  },

  progressContent: {
    flex: 1,
    paddingBottom: 20,
  },

  progressTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  progressDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  officerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 17,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  officerAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  officerAvatarText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 16,
  },

  officerContent: {
    flex: 1,
  },

  officerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  officerDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  feedbackCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    marginBottom: 28,
  },

  feedbackTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E3A8A",
  },

  feedbackDescription: {
    fontSize: 12,
    color: "#4B5563",
    marginTop: 5,
  },

  feedbackButton: {
    alignSelf: "flex-start",
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 15,
  },

  feedbackButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  backToListButton: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  backToListText: {
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
    color: "#6B7280",
    marginTop: 8,
  },

  backToComplaintsButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 9,
    marginTop: 20,
  },

  backToComplaintsText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});