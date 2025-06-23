import React, { useContext, useState } from 'react';
import { RefreshCw, Check, CheckCheck, AlertCircle } from 'lucide-react';
import { AppContext, Message } from '@/presentation/contexts/AppContext';

export default function MessagesTimeline() {
  const { messages, resendMessage } = useContext(AppContext);
  const [resending, setResending] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check size={16} className="text-gray-500" />;
      case 'delivered':
        return <Check size={16} className="text-info-500" />;
      case 'read':
        return <CheckCheck size={16} className="text-accent-2-500" />;
      default:
        return <AlertCircle size={16} className="text-error-500" />;
    }
  };

  const handleResend = async (messageId: number) => {
    setResending(messageId);
    setError(null);
    
    try {
      await resendMessage(messageId);
    } catch (error) {
      setError('Falha ao reenviar mensagem. Tente novamente.');
    } finally {
      setResending(null);
    }
  };

  const formatTemplateName = (name: string) => {
    return name.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="p-6">
      <h1 className="text-section font-bold mb-6 text-text-primary">Histórico de Mensagens</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-error-100 text-error-800 rounded-sm border border-black">
          {error}
        </div>
      )}
      
      <div className="card-basic overflow-hidden">
        <div className="px-6 py-4 border-b border-black">
          <h2 className="text-body font-medium text-text-primary">Mensagens Enviadas</h2>
        </div>
        
        <ul className="divide-y divide-gray-200">
          {messages.length === 0 ? (
            <li className="p-6 text-center text-text-secondary text-body">Nenhuma mensagem enviada ainda.</li>
          ) : (
            messages
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map((message) => (
                <li key={message.id} className="p-4 hover:bg-bg-light transition-colors">
                  <div className="flex items-start">
                    <div className={`mt-1 rounded-sm h-2 w-2 flex-shrink-0 border border-black ${
                      message.status === 'sent' ? 'bg-gray-400' : 
                      message.status === 'delivered' ? 'bg-info-400' :
                      message.status === 'read' ? 'bg-accent-2-400' : 'bg-error-400'
                    }`}></div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-subtitle font-medium text-text-primary">
                            Pedido #{message.order_id}
                          </h3>
                          <p className="text-subtitle text-text-secondary mt-1">
                            Template: {formatTemplateName(message.template_name)}
                          </p>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-subtitle text-text-secondary mr-2">{formatDate(message.timestamp)}</span>
                          <span title={`Status: ${message.status}`}>{getStatusIcon(message.status)}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => handleResend(message.id)}
                          disabled={resending === message.id}
                          className="inline-flex items-center text-subtitle text-text-secondary hover:text-primary-600 focus:outline-none disabled:opacity-50 transition-colors"
                        >
                          <RefreshCw size={12} className={`mr-1 ${resending === message.id ? 'animate-spin' : ''}`} />
                          {resending === message.id ? 'Reenviando...' : 'Reenviar'}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
          )}
        </ul>
      </div>
    </div>
  );
}