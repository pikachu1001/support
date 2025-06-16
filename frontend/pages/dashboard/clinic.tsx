import DashboardLayout from '../../components/DashboardLayout';

export default function ClinicDashboard() {
  return (
    <DashboardLayout userType="clinic">
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Patient Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Patients</h3>
              <p className="text-3xl font-bold text-blue-600">24</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Monthly Revenue</h3>
              <p className="text-3xl font-bold text-green-600">¥48,000</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">New This Month</h3>
              <p className="text-3xl font-bold text-purple-600">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">New patient registration</p>
                <p className="text-sm text-gray-500">John Doe - Plan A</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Payment received</p>
                <p className="text-sm text-gray-500">Jane Smith - Plan B</p>
              </div>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 