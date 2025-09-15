import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../services/api';

interface LayoutProps {
  children: ReactNode;
}

interface Stats {
  products: number;
  categories: number;
  tags: number;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [stats, setStats] = useState<Stats>({ products: 0, categories: 0, tags: 0 });
  const [loadingStats, setLoadingStats] = useState(false);

  const navigationItems = [
    { path: '/products', name: 'Productos', icon: '📦' },
    { path: '/categories', name: 'Categorías', icon: '📁' },
    { path: '/tags', name: 'Etiquetas', icon: '🏷️' },
  ];

  const loadStats = async () => {
    try {
      setLoadingStats(true);
      const [productsRes, categoriesRes, tagsRes] = await Promise.all([
        api.getProducts().catch(() => ({ data: [] })),
        api.getCategories().catch(() => ({ data: [] })),
        api.getTags().catch(() => ({ data: [] })),
      ]);

      setStats({
        products: productsRes.data?.length || 0,
        categories: categoriesRes.data?.length || 0,
        tags: tagsRes.data?.length || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, [location.pathname]);

  const getCurrentPageName = () => {
    const currentItem = navigationItems.find(item => item.path === location.pathname);
    return currentItem?.name || 'Productos';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="bg-blue-600 rounded-lg p-2">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7m16 10l-8 4-8-4" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">Sistema de Gestión</h1>
                  <p className="text-sm text-gray-500">Panel de administración</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      {new Date().toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Navegación</h2>
              <ul className="space-y-1">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.name}</span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">📦</span>
                    <span className="text-sm font-medium text-gray-700">Productos</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">
                    {loadingStats ? '...' : stats.products}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">📁</span>
                    <span className="text-sm font-medium text-gray-700">Categorías</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    {loadingStats ? '...' : stats.categories}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-600">🏷️</span>
                    <span className="text-sm font-medium text-gray-700">Etiquetas</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">
                    {loadingStats ? '...' : stats.tags}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Acciones rápidas</h4>
                <div className="space-y-2">
                  <button
                    onClick={loadStats}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    🔄 Actualizar estadísticas
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px]">
              <div className="p-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600">
                © 2025 Sistema de Gestión. Todos los derechos reservados.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Página actual:</span>
                <span className="font-medium text-blue-600">{getCurrentPageName()}</span>
              </div>

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;