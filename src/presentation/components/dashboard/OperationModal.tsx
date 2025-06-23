import { AlertTriangle, Pause, Play, Square, X } from 'lucide-react'

interface OperationModalProps {
  action: 'start' | 'pause' | 'end'
  onConfirm: () => void
  onCancel: () => void
}

export default function OperationModal({ action, onConfirm, onCancel }: OperationModalProps) {
  const getModalContent = () => {
    switch (action) {
      case 'start':
        return {
          title: 'Iniciar Operação',
          icon: <Play className="h-8 w-8 text-accent-2-600" />,
          message: 'Ao iniciar a operação, seu restaurante ficará disponível para receber pedidos online.',
          confirmText: 'Iniciar Operação',
          confirmClass: 'btn-primary bg-accent-2-500 hover:bg-accent-2-600',
          warning: null
        }

      case 'pause':
        return {
          title: 'Pausar Operação',
          icon: <Pause className="h-8 w-8 text-warning-600" />,
          message:
            'Ao pausar a operação, seu restaurante ficará temporariamente indisponível para novos pedidos. Pedidos em andamento continuarão normalmente.',
          confirmText: 'Pausar Operação',
          confirmClass: 'btn-primary bg-warning-500 hover:bg-warning-600',
          warning: 'Clientes não poderão fazer novos pedidos durante a pausa.'
        }

      case 'end':
        return {
          title: 'Encerrar Operação',
          icon: <Square className="h-8 w-8 text-error-600" />,
          message: 'Ao encerrar a operação, um relatório completo do dia será gerado e seu restaurante ficará offline.',
          confirmText: 'Encerrar Operação',
          confirmClass: 'btn-primary bg-error-500 hover:bg-error-600',
          warning: 'Esta ação não pode ser desfeita. Certifique-se de que todos os pedidos foram finalizados.'
        }

      default:
        return null
    }
  }

  const content = getModalContent()
  if (!content) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-md w-full">
        <div className="modal-header flex justify-between items-center">
          <h2 className="text-body font-semibold text-text-primary">{content.title}</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-text-primary transition-colors"
            aria-label="Fechar"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-sm bg-bg-light mb-4 border border-black">
              {content.icon}
            </div>

            <p className="text-body text-text-secondary mb-4">{content.message}</p>

            {content.warning && (
              <div className="bg-warning-50 border border-warning-200 rounded-sm p-3 mb-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-warning-600 mr-2" />
                  <p className="text-subtitle text-warning-800">{content.warning}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={onCancel} className="btn-secondary flex-1">
              Cancelar
            </button>

            <button onClick={onConfirm} className={`flex-1 ${content.confirmClass}`}>
              {content.confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
