"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Globe, Clock, CheckCircle, AlertTriangle, 
  Edit, Trash2, ExternalLink, RefreshCw, GitBranch,
  Calendar, Tag, FileText, TrendingUp
} from 'lucide-react';
import Navbar from '../../../../components/Navbar';
import api from '../../../../services/api';

interface ApiDetail {
  _id: string;
  name: string;
  url: string;
  description?: string;
  category?: string;
  tags?: string[];
  status?: 'stable' | 'breaking' | 'updated';
  version?: string;
  lastChecked?: string;
  createdAt?: string;
}

interface ApiChange {
  id: string;
  type: 'version' | 'breaking' | 'deprecation' | 'feature';
  title: string;
  description: string;
  date: string;
  version?: string;
}

export default function ApiDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [apiData, setApiData] = useState<ApiDetail | null>(null);
  const [changes, setChanges] = useState<ApiChange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const fetchApiDetails = async () => {
      try {
        const response = await api.get(`/apis/${params.id}`);
        // Add mock data for demo
        const enhancedApi = {
          ...response.data,
          status: 'stable' as const,
          version: 'v2023-10-16',
          lastChecked: '2 hours ago',
          category: 'REST API',
          tags: ['payment', 'stripe', 'e-commerce'],
          description: 'Stripe Payment API for processing online payments and managing customer subscriptions.'
        };
        setApiData(enhancedApi);

        // Mock change history
        setChanges([
          {
            id: '1',
            type: 'version',
            title: 'Version 2023-10-16 Released',
            description: 'New payment methods added, improved error handling',
            date: '2023-10-16',
            version: 'v2023-10-16'
          },
          {
            id: '2',
            type: 'feature',
            title: 'New Payment Links API',
            description: 'Introduced Payment Links for no-code payment flows',
            date: '2023-09-15',
            version: 'v2023-09-15'
          },
          {
            id: '3',
            type: 'deprecation',
            title: 'Legacy Webhooks Deprecated',
            description: 'Old webhook endpoints will be removed in 6 months',
            date: '2023-08-01',
            version: 'v2023-08-01'
          }
        ]);
      } catch (err) {
        setError('Failed to fetch API details.');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchApiDetails();
    }
  }, [params.id]);

  const handleCheckNow = async () => {
    setChecking(true);
    // Simulate API check
    setTimeout(() => {
      setApiData(prev => prev ? { ...prev, lastChecked: 'Just now' } : null);
      setChecking(false);
    }, 2000);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this API?')) {
      try {
        await api.delete(`/apis/${params.id}`);
        router.push('/dashboard');
      } catch (err) {
        setError('Failed to delete API.');
      }
    }
  };

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

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'version':
        return <GitBranch className="text-blue-600" size={16} />;
      case 'feature':
        return <TrendingUp className="text-green-600" size={16} />;
      case 'breaking':
        return <AlertTriangle className="text-red-600" size={16} />;
      case 'deprecation':
        return <Clock className="text-orange-600" size={16} />;
      default:
        return <FileText className="text-gray-600" size={16} />;
    }
  };

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

  if (!apiData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">API Not Found</h1>
          <Link
            href="/dashboard"
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/dashboard"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Dashboard
            </Link>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Globe className="text-blue-600" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{apiData.name}</h1>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(apiData.status)}`}>
                      {getStatusIcon(apiData.status)}
                      <span className="capitalize">{apiData.status}</span>
                    </div>
                    <span className="text-sm text-gray-600">Version: {apiData.version}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCheckNow}
                  disabled={checking}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2"
                >
                  <RefreshCw size={16} className={checking ? 'animate-spin' : ''} />
                  <span>{checking ? 'Checking...' : 'Check Now'}</span>
                </button>
                <Link
                  href={`/apis/${apiData._id}/edit`}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 flex items-center space-x-2"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* API Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">API Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                    <div className="flex items-center space-x-2">
                      <code className="bg-gray-100 px-3 py-2 rounded text-sm flex-1">{apiData.url}</code>
                      <a
                        href={apiData.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:text-gray-900"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                  
                  {apiData.description && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <p className="text-gray-600">{apiData.description}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    {apiData.category && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <div className="flex items-center space-x-2">
                          <Tag size={14} className="text-gray-500" />
                          <span className="text-gray-600">{apiData.category}</span>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Checked</label>
                      <div className="flex items-center space-x-2">
                        <Clock size={14} className="text-gray-500" />
                        <span className="text-gray-600">{apiData.lastChecked}</span>
                      </div>
                    </div>
                  </div>
                  
                  {apiData.tags && apiData.tags.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                      <div className="flex flex-wrap gap-2">
                        {apiData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Change History */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Change History</h2>
                <div className="space-y-4">
                  {changes.map((change) => (
                    <div key={change.id} className="border-l-4 border-blue-200 pl-4 py-2">
                      <div className="flex items-start space-x-3">
                        {getChangeIcon(change.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900">{change.title}</h3>
                            {change.version && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {change.version}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{change.description}</p>
                          <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                            <Calendar size={12} />
                            <span>{change.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2">
                    <RefreshCw size={16} />
                    <span>Force Check</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2">
                    <FileText size={16} />
                    <span>View Documentation</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2">
                    <TrendingUp size={16} />
                    <span>View Analytics</span>
                  </button>
                </div>
              </div>

              {/* Monitoring Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Monitoring Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uptime</span>
                    <span className="font-medium text-green-600">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Response</span>
                    <span className="font-medium">245ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Downtime</span>
                    <span className="font-medium">15 days ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Checks</span>
                    <span className="font-medium">1,247</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
