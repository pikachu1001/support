import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  activeSubscribers: number;
  status: 'active' | 'inactive';
  description: string;
  billingCycle: 'monthly' | 'yearly';
  maxAppointments: number;
  maxPrescriptions: number;
  maxLabTests: number;
}

export default function SubscriptionsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [plans] = useState<SubscriptionPlan[]>([
    {
      id: '1',
      name: 'Plan A',
      price: 3000,
      features: [
        'Basic Health Coverage',
        'Online Consultations',
        'Basic Lab Tests',
        'Prescription Service',
      ],
      activeSubscribers: 500,
      status: 'active',
      description: 'Basic health coverage for individuals and families',
      billingCycle: 'monthly',
      maxAppointments: 4,
      maxPrescriptions: 2,
      maxLabTests: 1,
    },
    {
      id: '2',
      name: 'Plan B',
      price: 4000,
      features: [
        'Extended Coverage',
        'Priority Appointments',
        'Advanced Lab Tests',
        'Unlimited Prescriptions',
        '24/7 Support',
      ],
      activeSubscribers: 300,
      status: 'active',
      description: 'Extended coverage with priority services',
      billingCycle: 'monthly',
      maxAppointments: 8,
      maxPrescriptions: 4,
      maxLabTests: 2,
    },
    {
      id: '3',
      name: 'Plan C',
      price: 5000,
      features: [
        'Premium Coverage',
        '24/7 Support',
        'Unlimited Appointments',
        'Unlimited Prescriptions',
        'Comprehensive Lab Tests',
        'Home Care Services',
      ],
      activeSubscribers: 200,
      status: 'active',
      description: 'Premium coverage with comprehensive services',
      billingCycle: 'monthly',
      maxAppointments: -1, // Unlimited
      maxPrescriptions: -1, // Unlimited
      maxLabTests: 4,
    },
  ]);

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const navigationItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Clinics', href: '/admin/clinics', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { name: 'Patients', href: '/admin/patients', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Subscription Plans', href: '/admin/subscriptions', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Insurance Claims', href: '/admin/insurance-claims', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'System Settings', href: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Subscription Plans</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  localStorage.removeItem('adminToken');
                  sessionStorage.removeItem('adminData');
                  router.push('/');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white shadow-sm h-screen">
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    router.pathname === item.href
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg
                    className={`mr-3 h-6 w-6 ${
                      router.pathname === item.href
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Filters */}
            <div className="mb-6 flex space-x-4">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                  Search Plans
                </label>
                <input
                  type="text"
                  id="search"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Filter by Status
                </label>
                <select
                  id="status"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => router.push('/admin/subscriptions/new')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add New Plan
                </button>
              </div>
            </div>

            {/* Subscription Plans Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPlans.map((plan) => (
                <div key={plan.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        plan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                    <p className="mt-4 text-3xl font-bold text-gray-900">¥{plan.price.toLocaleString()}</p>
                    <p className="mt-1 text-sm text-gray-500">per {plan.billingCycle}</p>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900">Service Limits</h4>
                      <dl className="mt-2 grid grid-cols-1 gap-2">
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Appointments</dt>
                          <dd className="text-sm text-gray-900">
                            {plan.maxAppointments === -1 ? 'Unlimited' : plan.maxAppointments}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Prescriptions</dt>
                          <dd className="text-sm text-gray-900">
                            {plan.maxPrescriptions === -1 ? 'Unlimited' : plan.maxPrescriptions}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Lab Tests</dt>
                          <dd className="text-sm text-gray-900">
                            {plan.maxLabTests === -1 ? 'Unlimited' : plan.maxLabTests}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900">Features</h4>
                      <ul className="mt-2 space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="ml-2 text-sm text-gray-500">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <p className="text-sm text-gray-500">Active Subscribers: {plan.activeSubscribers}</p>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <button
                        onClick={() => router.push(`/admin/subscriptions/${plan.id}`)}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => router.push(`/admin/subscriptions/${plan.id}/edit`)}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Edit Plan
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 