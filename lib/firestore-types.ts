import { Timestamp } from 'firebase/firestore';

// Base user data stored in 'users' collection
export interface UserProfile {
  uid: string;
  email: string;
  role: 'patient' | 'clinic' | 'admin';
  createdAt: Timestamp;
}

// Data for a patient, stored in 'patients' collection
export interface Patient {
  uid: string; // Corresponds to auth user uid
  profile: UserProfile;
  clinicId?: string; // ID of the clinic they are associated with
  subscriptionId?: string; // ID of their current subscription in the 'subscriptions' collection
}

// Data for a clinic, stored in 'clinics' collection
export interface Clinic {
  uid: string; // Corresponds to auth user uid
  profile: UserProfile;
  clinicName: string;
  baseFeeStatus: 'active' | 'inactive' | 'pending';
}

// Data for a subscription, stored in 'subscriptions' collection
export interface Subscription {
  id: string; // The document ID
  userId: string;
  planId: 'A' | 'B' | 'C';
  status: 'pending' | 'active' | 'cancelled' | 'failed';
  createdAt: Timestamp;
  stripeSubscriptionId?: string; // From Stripe
}

// Data for the activity feed, stored in 'activity_feed' collection
export interface ActivityEvent {
  id: string; // The document ID
  timestamp: Timestamp;
  type: 'new_patient' | 'new_subscription' | 'payment_success' | 'payment_failure';
  details: {
    message: string;
    userId?: string;
    clinicId?: string;
  };
} 