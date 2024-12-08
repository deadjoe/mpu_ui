'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import UserProfileForm from '@/components/users/UserProfileForm'

// Mock user data
const currentUser = {
  username: 'admin',
  role: 'admin',
  team: 'System',
  email: 'admin@example.com',
}

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <UserProfileForm user={currentUser} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
