import React, { useContext, useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, Package, DollarSign } from 'lucide-react';
import { AppContext } from '@/presentation/contexts/AppContext';

export default function ReportsPage() {
  const { operationReports, generateReport } = useContext(AppContext);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const handleDownloadReport = (report: any) => {
    // In a real app, this would generate and download a PDF
    const reportContent = `
RELATÓRIO DIÁRIO - ${report.date}
=====================================

RESUMO DA OPERAÇÃO:
- Início: ${report.startTime}
- Fim: ${report.endTime}
- Duração: ${report.duration}

PEDIDOS:
- Total de Pedidos: ${report.totalOrders}
- Pedidos Concluídos: ${report.completedOrders}
- Pedidos Cancelados: ${report.canceledOrders}
- Taxa de Sucesso: ${((report.completedOrders / report.totalOrders) * 100).toFixed(1)}%

FINANCEIRO:
- Faturamento Total: R$ ${report.revenue.toFixed(2)}
- Ticket Médio: R$ ${(report.revenue / report.completedOrders).toFixed(2)}

DETALHES DOS PEDIDOS:
${report.orders.map((order: any) => `
- Pedido #${order.id} - ${order.status} - R$ ${order.total.toFixed(2)}
  Cliente: ${order.customer_name} (${order.customer_phone})
  Tipo: ${order.order_type} | Pagamento: ${order.payment_method}
`).join('')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-${report.date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-section font-bold mb-6 text-text-primary">Relatórios</h1>
      
      {operationReports.length === 0 ? (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-sm bg-bg-light mb-4 border border-black">
              <FileText className="h-8 w-8 text-text-secondary" />
            </div>
            <h2 className="text-body font-semibold text-text-primary mb-2">
              Nenhum Relatório Disponível
            </h2>
            <p className="text-body text-text-secondary">
              Os relatórios serão gerados automaticamente ao encerrar as operações diárias.
            </p>
          </div>
        </div>
      ) : (
        <div className="card-basic overflow-hidden">
          <div className="px-6 py-4 border-b border-black">
            <h2 className="text-body font-medium text-text-primary">Relatórios Disponíveis</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {operationReports.map((report) => (
              <div key={report.id} className="p-6 hover:bg-bg-light transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <h3 className="text-body font-medium text-text-primary">
                        Relatório do dia {formatDate(report.date)}
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 text-info-500 mr-2" />
                        <div>
                          <p className="text-subtitle text-text-secondary">Total de Pedidos</p>
                          <p className="font-semibold text-text-primary text-subtitle">{report.totalOrders}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-accent-2-500 mr-2" />
                        <div>
                          <p className="text-subtitle text-text-secondary">Concluídos</p>
                          <p className="font-semibold text-text-primary text-subtitle">{report.completedOrders}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-accent-500 mr-2" />
                        <div>
                          <p className="text-subtitle text-text-secondary">Faturamento</p>
                          <p className="font-semibold text-text-primary text-subtitle">R$ {report.revenue.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div>
                          <p className="text-subtitle text-text-secondary">Operação</p>
                          <p className="font-semibold text-text-primary text-subtitle">
                            {formatTime(report.startTime)} - {formatTime(report.endTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-subtitle text-text-secondary">
                      <span>Duração: {report.duration}</span>
                      <span className="mx-2">•</span>
                      <span>
                        Taxa de Sucesso: {((report.completedOrders / report.totalOrders) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-6 flex space-x-3">
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="btn-secondary"
                    >
                      Visualizar
                    </button>
                    
                    <button
                      onClick={() => handleDownloadReport(report)}
                      className="btn-primary bg-primary-500 hover:bg-primary-600 inline-flex items-center"
                    >
                      <Download size={16} className="mr-2" />
                      Baixar PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedReport && (
        <div className="modal-overlay">
          <div className="modal-content max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="modal-header flex justify-between items-center">
              <h2 className="text-body font-semibold text-text-primary">
                Relatório Detalhado - {formatDate(selectedReport.date)}
              </h2>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-info-50 p-4 rounded-sm border border-black">
                  <h3 className="font-medium text-info-900 mb-2 text-subtitle">Resumo de Pedidos</h3>
                  <p className="text-section font-bold text-info-600">{selectedReport.totalOrders}</p>
                  <p className="text-subtitle text-info-700">Total de pedidos</p>
                </div>
                
                <div className="bg-accent-2-50 p-4 rounded-sm border border-black">
                  <h3 className="font-medium text-accent-2-900 mb-2 text-subtitle">Faturamento</h3>
                  <p className="text-section font-bold text-accent-2-600">R$ {selectedReport.revenue.toFixed(2)}</p>
                  <p className="text-subtitle text-accent-2-700">Receita total</p>
                </div>
                
                <div className="bg-accent-50 p-4 rounded-sm border border-black">
                  <h3 className="font-medium text-accent-900 mb-2 text-subtitle">Ticket Médio</h3>
                  <p className="text-section font-bold text-accent-600">
                    R$ {(selectedReport.revenue / selectedReport.completedOrders).toFixed(2)}
                  </p>
                  <p className="text-subtitle text-accent-700">Por pedido concluído</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-body font-medium mb-4 text-text-primary">Detalhes dos Pedidos</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-secondary-500">
                      <tr>
                        <th className="px-6 py-3 text-left text-nav font-medium text-text-invert uppercase tracking-wider">
                          Pedido
                        </th>
                        <th className="px-6 py-3 text-left text-nav font-medium text-text-invert uppercase tracking-wider">
                          Cliente
                        </th>
                        <th className="px-6 py-3 text-left text-nav font-medium text-text-invert uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-nav font-medium text-text-invert uppercase tracking-wider">
                          Valor
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-bg-dark divide-y divide-gray-200">
                      {selectedReport.orders.map((order: any) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-subtitle font-medium text-text-primary">
                            #{order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-subtitle text-text-secondary">
                            {order.customer_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-subtitle rounded-sm border border-black ${
                              order.status === 'Entregue' ? 'status-delivered' :
                              order.status === 'Cancelado' ? 'status-canceled' :
                              'status-received'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-subtitle text-text-primary">
                            R$ {order.total.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}