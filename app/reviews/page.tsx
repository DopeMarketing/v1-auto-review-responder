import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function ReviewsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // TODO: Fetch reviews data with response status from Supabase
  // TODO: Fetch platforms data for filtering from Supabase

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews Monitor</h1>
          <p className="text-gray-600">Monitor and respond to customer reviews</p>
        </div>
        <a href="/responses/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Create Response
        </a>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-lg border mb-6">
        <div className="flex flex-wrap gap-4">
          <select className="border rounded px-3 py-2">
            <option>All Platforms</option>
            <option>Google My Business</option>
            <option>Yelp</option>
          </select>
          <select className="border rounded px-3 py-2">
            <option>All Ratings</option>
            <option>5 Stars</option>
            <option>4 Stars</option>
            <option>3 Stars</option>
            <option>2 Stars</option>
            <option>1 Star</option>
          </select>
          <select className="border rounded px-3 py-2">
            <option>All Status</option>
            <option>Pending Response</option>
            <option>Responded</option>
            <option>Scheduled</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Responded</span>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <h3 className="font-medium mb-2">John Smith</h3>
          <p className="text-gray-700 mb-4">Excellent service! The team was professional and delivered exactly what we needed. Highly recommend!</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Google My Business</span>
            <a href="/reviews/1" className="text-blue-600 hover:text-blue-800">View Details →</a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-yellow-400">⭐⭐⭐☆☆</div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Pending</span>
            </div>
            <span className="text-sm text-gray-500">4 hours ago</span>
          </div>
          <h3 className="font-medium mb-2">Sarah Johnson</h3>
          <p className="text-gray-700 mb-4">The service was okay but there's room for improvement. The wait time was longer than expected.</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Google My Business</span>
            <div className="space-x-2">
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                Generate Response
              </button>
              <a href="/reviews/2" className="text-blue-600 hover:text-blue-800">View Details →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}