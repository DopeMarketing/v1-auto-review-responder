export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">
            Automate Your Review Responses
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Respond to Google My Business reviews instantly with AI-powered, personalized responses
          </p>
          <div className="space-x-4">
            <a href="/signup" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Start Free Trial
            </a>
            <a href="/login" className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
              Sign In
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">AI-Powered Responses</h3>
              <p className="text-gray-600">Generate personalized responses based on review sentiment and customer data</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">Multi-Platform Sync</h3>
              <p className="text-gray-600">Connect Google My Business and other review platforms</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">Analytics Dashboard</h3>
              <p className="text-gray-600">Track response performance and customer engagement metrics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg border">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <p className="text-4xl font-bold mb-6">$29<span className="text-lg text-gray-600">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li>✓ Up to 100 responses/month</li>
                <li>✓ 1 platform integration</li>
                <li>✓ Basic templates</li>
              </ul>
              <a href="/signup" className="w-full bg-blue-600 text-white py-3 rounded-lg block text-center">Get Started</a>
            </div>
            <div className="bg-white p-8 rounded-lg border border-blue-600">
              <h3 className="text-2xl font-bold mb-4">Professional</h3>
              <p className="text-4xl font-bold mb-6">$99<span className="text-lg text-gray-600">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li>✓ Unlimited responses</li>
                <li>✓ Multiple platforms</li>
                <li>✓ Advanced AI templates</li>
                <li>✓ Analytics dashboard</li>
              </ul>
              <a href="/signup" className="w-full bg-blue-600 text-white py-3 rounded-lg block text-center">Get Started</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}