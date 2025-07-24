"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Plus, Search, Filter, AlertTriangle, CheckCircle, 
  Clock, ChevronRight, GitBranch 
} from 'lucide-react';
import Navbar from '../../../components/Navbar';
import api from '../../../services/api';

interface Api {
  _id: string;
  name: string;
  url: string;
  lastChecked?: string;
  version?: string;
  status?: 'stable' | 'breaking' | 'updated';
}

export default function DashboardPage() {
  const [apis, setApis] = useState<Api[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchApis = async () => {
      try {
        const response = await api.get('/apis');
        // Add mock data for demo purposes
        const enhancedApis = response.data.map((api: Api, index: number) => ({
          ...api,
          status: ['stable', 'breaking', 'updated'][index % 3] as 'stable' | 'breaking' | 'updated',
          version: ['v2023-10-16', 'v2023-11-27', 'v1.7.0'][index % 3],
          lastChecked: ['2 hours ago', '1 day ago', '6 hours ago'][index % 3]
        }));
        setApis(enhancedApis);
      } catch (err) {
        setError('Failed to fetch APIs.');
      } finally {
        setLoading(false);
      }
    };

    fetchApis();
  }, []);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'stable':
        return 'text-green-600 bg-green-100';
      case 'breaking':
        return 'text-red-600 bg-red-100';
      case 'updated':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'stable':
        return <CheckCircle size={16} />;
      case 'breaking':
        return <AlertTriangle size={16} />;
      case 'updated':
        return <Clock size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const filteredApis = apis.filter(api =>
    api.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-600">Monitor your API dependencies</p>
          </div>
          <Link
            href="/apis/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add API</span>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total APIs</p>
                <p className="text-2xl font-bold text-gray-900">{apis.length}</p>
              </div>
              <GitBranch className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stable</p>
                <p className="text-2xl font-bold text-green-600">
                  {apis.filter(api => api.status === 'stable').length}
                </p>
              </div>
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Breaking Changes</p>
                <p className="text-2xl font-bold text-red-600">
                  {apis.filter(api => api.status === 'breaking').length}
                </p>
              </div>
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Updates Available</p>
                <p className="text-2xl font-bold text-orange-600">
                  {apis.filter(api => api.status === 'updated').length}
                </p>
              </div>
              <Clock className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* API List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Tracked APIs</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search APIs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <Filter size={16} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredApis.length === 0 ? (
              <div className="text-center py-12">
                <GitBranch className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No APIs</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating your first API endpoint.</p>
                <div className="mt-6">
                  <Link
                    href="/apis/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add API
                  </Link>
                </div>
              </div>
            ) : (
              filteredApis.map((api) => (
                <Link 
                  key={api._id} 
                  href={`/apis/${api._id}`}
                  className="p-6 hover:bg-gray-50 cursor-pointer block"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(api.status)}`}>
                        {getStatusIcon(api.status)}
                        <span className="capitalize">{api.status}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{api.name}</h4>
                        <p className="text-sm text-gray-600">Version: {api.version || 'Unknown'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Last checked</p>
                        <p className="text-sm font-medium">{api.lastChecked || 'Never'}</p>
                      </div>
                      <ChevronRight className="text-gray-400" size={16} />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
