import React, { useState, useContext } from 'react';
import { Menu, Search, Bell, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '@/presentation/contexts/AppContext';

interface TopAppBarProps {
  onMenuClick: () => void;
}

export default function TopAppBar({ onMenuClick }: TopAppBarProps) {
  const { orders } = useContext(AppContext);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    
    if (searchQuery.trim().length >= 2) {
      const results = orders.filter(order => 
        order.id.toString().includes(searchQuery) ||
        order.customer_phone.includes(searchQuery) ||
        order.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }

  function handleSelectOrder(order: any) {
    setQuery('');
    setShowResults(false);
    setSearchResults([]);
    
    // Navigate to orders page and open the order modal
    navigate('/orders', { state: { openOrderId: order.id } });
  }

  function clearSearch() {
    setQuery('');
    setShowResults(false);
    setSearchResults([]);
  }

  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-bg-dark shadow-sm flex items-center px-4 z-10 border-b border-black">
      <button 
        onClick={onMenuClick} 
        className="mr-4 p-2 rounded-sm hover:bg-bg-light lg:hidden transition-colors border border-black"
        aria-label="Toggle menu"
      >
        <Menu size={24} className="text-text-primary" />
      </button>
      
      <div className="text-xl font-semibold mr-4 hidden md:block text-text-primary font-mono">
        Admin - <span className="text-primary-500">MenuXP</span>
      </div>
      
      <div className="flex-1 mx-4 relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Buscar pedido por ID, telefone ou nome do cliente…"
            value={query}
            onChange={handleSearch}
            className="input-base block w-full pl-10 pr-10"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-text-primary transition-colors"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
        
        {/* Search Results Dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-bg-dark border border-black rounded-sm shadow-lg z-50 max-h-80 overflow-y-auto">
            {searchResults.length > 0 ? (
              <>
                <div className="px-3 py-2 text-xs text-gray-500 border-b bg-bg-light">
                  {searchResults.length} resultado(s) encontrado(s)
                </div>
                {searchResults.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => handleSelectOrder(order)}
                    className="w-full px-3 py-3 text-left hover:bg-bg-light border-b border-gray-100 last:border-b-0 focus:outline-none focus:bg-bg-light transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-text-primary text-body">
                          Pedido #{order.id}
                        </div>
                        <div className="text-subtitle text-text-secondary">
                          {order.customer_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.customer_phone}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs px-2 py-1 rounded-sm border border-black ${
                          order.status === 'Recebido' ? 'status-received' :
                          order.status === 'Confirmado' ? 'status-confirmed' :
                          order.status === 'Em Produção' ? 'status-production' :
                          order.status === 'Pronto' ? 'status-ready' :
                          order.status === 'Saiu para Entrega' ? 'status-delivery' :
                          order.status === 'Entregue' ? 'status-delivered' :
                          'status-canceled'
                        }`}>
                          {order.status}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          R$ {order.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </>
            ) : (
              <div className="px-3 py-4 text-subtitle text-gray-500 text-center">
                Nenhum pedido encontrado para "{query}"
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="ml-auto flex items-center">
        <button 
          className="p-2 rounded-sm hover:bg-bg-light relative transition-colors border border-black"
          aria-label="Notifications"
        >
          <Bell size={20} className="text-text-primary" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-sm bg-primary-500 animate-pulse"></span>
        </button>
      </div>
    </header>
  );
}