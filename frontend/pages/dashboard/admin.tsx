import DashboardLayout from '../../components/DashboardLayout';

export default function AdminDashboard() {
  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Patients</h3>
              <p className="text-3xl font-bold text-blue-600">156</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Active Clinics</h3>
              <p className="text-3xl font-bold text-green-600">12</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Monthly Revenue</h3>
              <p className="text-3xl font-bold text-purple-600">¥468,000</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">New Today</h3>
              <p className="text-3xl font-bold text-yellow-600">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">New clinic registration</p>
                <p className="text-sm text-gray-500">Tokyo Health Clinic</p>
              </div>
              <span className="text-sm text-gray-500">1 hour ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">New patient subscription</p>
                <p className="text-sm text-gray-500">Osaka Wellness Center - Plan C</p>
              </div>
              <span className="text-sm text-gray-500">3 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Payment processed</p>
                <p className="text-sm text-gray-500">Kyoto Medical Center - ¥12,000</p>
              </div>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 