"use client";

import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { jwtDecode } from 'jwt-decode';
import { 
  User, Mail, Calendar, MapPin, GitBranch, 
  TrendingUp, Activity, Clock 
} from 'lucide-react';
import Navbar from '../../../components/Navbar';

interface UserProfile {
  email: string;
  name?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      try {
        const decodedToken: { email: string } = jwtDecode(token);
        setUser({ 
          email: decodedToken.email,
          name: decodedToken.email.split('@')[0] // Extract name from email
        });
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  const stats = [
    { label: 'APIs Tracked', value: '12', icon: GitBranch, color: 'text-blue-600' },
    { label: 'Breaking Changes', value: '3', icon: TrendingUp, color: 'text-red-600' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: 'text-green-600' },
    { label: 'Avg Response', value: '245ms', icon: Clock, color: 'text-orange-600' }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'api_added',
      message: 'Added Stripe Payment API to tracking',
      time: '2 hours ago',
      icon: GitBranch,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'breaking_change',
      message: 'Breaking change detected in GitHub API v4',
      time: '1 day ago',
      icon: TrendingUp,
      color: 'text-red-600'
    },
    {
      id: 3,
      type: 'update',
      message: 'Updated API monitoring settings',
      time: '3 days ago',
      icon: Activity,
      color: 'text-green-600'
    },
    {
      id: 4,
      type: 'api_added',
      message: 'Added OpenAI API to tracking',
      time: '1 week ago',
      icon: GitBranch,
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="text-blue-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                <p className="text-gray-600">Manage your personal information and activity</p>
              </div>
            </div>
          </div>

          {user ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User Info Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="text-blue-600" size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{user.name || 'User'}</h2>
                    <p className="text-gray-600 mb-4">Full-stack developer passionate about API integration and monitoring.</p>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-center space-x-2 text-gray-600">
                        <Mail size={16} />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-gray-600">
                        <MapPin size={16} />
                        <span>San Francisco, CA</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-gray-600">
                        <Calendar size={16} />
                        <span>Joined December 2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats and Activity */}
              <div className="lg:col-span-2 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">{stat.label}</p>
                            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                          </div>
                          <Icon className={stat.color} size={20} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => {
                      const Icon = activity.icon;
                      return (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                            <Icon size={16} />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900">{activity.message}</p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <GitBranch className="text-blue-600" size={20} />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">Add New API</p>
                        <p className="text-sm text-gray-600">Track a new API endpoint</p>
                      </div>
                    </button>
                    <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <Activity className="text-green-600" size={20} />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">View Analytics</p>
                        <p className="text-sm text-gray-600">Check API performance</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
