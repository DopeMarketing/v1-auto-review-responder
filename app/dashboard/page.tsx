import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // TODO: Fetch reviews data from Supabase
  // TODO: Fetch responses data from Supabase  
  // TODO: Fetch analytics data from Supabase
  // TODO: Fetch platforms data from Supabase

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your review management activity</p>
      </div>

      {/* Reviews Overview */}
      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-500">Total Reviews</h3>
          <p className="text-3xl font-bold text-gray-900">247</p>
          <p className="text-sm text-green-600">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-500">Pending Responses</h3>
          <p className="text-3xl font-bold text-gray-900">8</p>
          <p className="text-sm text-yellow-600">Needs attention</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-500">Response Rate</h3>
          <p className="text-3xl font-bold text-gray-900">94%</p>
          <p className="text-sm text-green-600">Above average</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-500">Avg Rating</h3>
          <p className="text-3xl font-bold text-gray-900">4.2</p>
          <p className="text-sm text-gray-600">⭐⭐⭐⭐☆</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-400 pl-4">
              <p className="font-medium">Great service!</p>
              <p className="text-sm text-gray-600">⭐⭐⭐⭐⭐ • 2 hours ago</p>
            </div>
            <div className="border-l-4 border-yellow-400 pl-4">
              <p className="font-medium">Could be better...</p>
              <p className="text-sm text-gray-600">⭐⭐⭐☆☆ • 4 hours ago</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a href="/reviews" className="block w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100">
              <p className="font-medium text-blue-900">Monitor Reviews</p>
              <p className="text-sm text-blue-600">View and respond to reviews</p>
            </a>
            <a href="/templates" className="block w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              <p className="font-medium text-gray-900">Manage Templates</p>
              <p className="text-sm text-gray-600">Update response templates</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}