import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-800">Health Support System</h1>
            </div>
            <div>
              <Link href="/admin/login" className="text-gray-600 hover:text-gray-900">
                Go to Admin Page
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Welcome to Health Support System
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Your trusted partner in health and wellness
          </p>
        </div>

        {/* Subscription Plans */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Choose Your Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['A', 'B', 'C'].map((plan) => (
              <div key={plan} className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold mb-4">Plan {plan}</h4>
                <p className="text-gray-600 mb-4">
                  {plan === 'A' ? '¥3,000/month' : 
                   plan === 'B' ? '¥4,000/month' : 
                   '¥5,000/month'}
                </p>
                <button
                  onClick={() => router.push('/auth/patient')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Login Options */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Are you a clinic or patient?</h3>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => router.push('/auth/clinic')}
              className="bg-green-600 text-white py-3 px-8 rounded-lg hover:bg-green-700"
            >
              For Clinic 
            </button>
            <button
              onClick={() => router.push('/auth/patient')}
              className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700"
            >
              For Patient 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 