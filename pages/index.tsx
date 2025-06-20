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
              <h1 className="text-xl font-bold text-gray-800">ヘルスサポートシステム</h1>
            </div>
            <div>
              <Link 
                href="/auth/admin/login" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                管理者ログイン
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            ヘルスサポートシステムへようこそ
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            健康とウェルネスの信頼できるパートナー
          </p>
        </div>

        {/* Subscription Plans */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">プランを選択してください</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['A', 'B', 'C'].map((plan) => (
              <div key={plan} className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold mb-4">プラン{plan}</h4>
                <p className="text-gray-600 mb-4">
                  {plan === 'A' ? '月額3,000円' : 
                   plan === 'B' ? '月額4,000円' : 
                   '月額5,000円'}
                </p>
                <button
                  onClick={() => router.push('/auth/patient/login')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  このプランを選択
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Login Options */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">クリニックまたは患者としてログイン</h3>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => router.push('/auth/clinic/login')}
              className="bg-green-600 text-white py-3 px-8 rounded-lg hover:bg-green-700"
            >
              クリニックの方はこちら
            </button>
            <button
              onClick={() => router.push('/auth/patient/login')}
              className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700"
            >
              患者の方はこちら
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 