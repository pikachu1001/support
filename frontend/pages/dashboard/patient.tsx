import DashboardLayout from '../../components/DashboardLayout';

export default function PatientDashboard() {
  return (
    <DashboardLayout userType="patient">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">My Subscription</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Current Plan</h3>
            <p className="text-gray-600">Plan A - ¥3,000/month</p>
            <p className="text-sm text-gray-500 mt-2">Next billing date: March 1, 2024</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Payment Status</h3>
            <p className="text-green-600">Active</p>
            <p className="text-sm text-gray-500 mt-2">Last payment: February 1, 2024</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 