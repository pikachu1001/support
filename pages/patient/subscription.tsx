import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isCurrent: boolean;
}

interface BillingHistory {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
}

export default function PatientSubscription() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [subscriptionPlans] = useState<SubscriptionPlan[]>([
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 1000,
      features: [
        'Basic health record access',
        'Standard appointment booking',
        'Email support',
      ],
      isCurrent: true,
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 2000,
      features: [
        'Advanced health record access',
        'Priority appointment booking',
        '24/7 support',
        'Telemedicine consultations',
        'Health tracking tools',
      ],
      isCurrent: false,
    },
  ]);

  const [billingHistory] = useState<BillingHistory[]>([
    {
      id: '1',
      date: '2024-03-01',
      amount: 1000,
      status: 'paid',
      description: 'Basic Plan - Monthly Subscription',
    },
    {
      id: '2',
      date: '2024-02-01',
      amount: 1000,
      status: 'paid',
      description: 'Basic Plan - Monthly Subscription',
    },
    {
      id: '3',
      date: '2024-01-01',
      amount: 1000,
      status: 'paid',
      description: 'Basic Plan - Monthly Subscription',
    },
  ]);

  const handleUpgrade = async (planId: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual plan upgrade
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
    } catch (error) {
      console.error('Failed to upgrade plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/patient/dashboard" className="text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="ml-4 text-xl font-bold text-gray-800">サブスクリプション</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Current Plan */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">現在のプラン</h3>
              <div className="mt-4">
                {subscriptionPlans.find(plan => plan.isCurrent) && (
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                          {subscriptionPlans.find(plan => plan.isCurrent)?.name}
                        </h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>次回の請求日は2024年4月1日です</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Available Plans */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">利用可能なプラン</h3>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {subscriptionPlans.map(plan => (
                  <div
                    key={plan.id}
                    className={`relative rounded-lg border ${
                      plan.isCurrent ? 'border-blue-500' : 'border-gray-300'
                    } bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="focus:outline-none">
                        <p className="text-sm font-medium text-gray-900">{plan.name}</p>
                        <p className="text-sm text-gray-500">¥{plan.price.toLocaleString()} / 月</p>
                        <ul className="mt-4 space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="ml-2 text-sm text-gray-500">{feature === 'Basic health record access' ? '基本的な健康記録の閲覧' : feature === 'Standard appointment booking' ? '標準的な予約' : feature === 'Email support' ? 'メールサポート' : feature === 'Advanced health record access' ? '高度な健康記録の閲覧' : feature === 'Priority appointment booking' ? '優先予約' : feature === '24/7 support' ? '24時間サポート' : feature === 'Telemedicine consultations' ? '遠隔診療' : feature === 'Health tracking tools' ? '健康管理ツール' : feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {!plan.isCurrent && (
                      <button
                        onClick={() => handleUpgrade(plan.id)}
                        disabled={isLoading}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                          isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLoading ? 'アップグレード中...' : 'アップグレード'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">請求履歴</h3>
              <div className="mt-6">
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                日付
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                説明
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                金額
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ステータス
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {billingHistory.map(bill => (
                              <tr key={bill.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(bill.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {bill.description}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  ¥{bill.amount.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      bill.status === 'paid'
                                        ? 'bg-green-100 text-green-800'
                                        : bill.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}
                                  >
                                    {bill.status === 'paid' ? '支払い済み' : bill.status === 'pending' ? '保留中' : '失敗'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 