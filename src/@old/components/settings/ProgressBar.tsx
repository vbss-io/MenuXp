import type { Settings } from '@/@old/models/settings.model'
import { Trophy } from 'lucide-react'
import { useState } from 'react'

interface ProgressBarProps {
  settings: Settings
}

export default function ProgressBar({ settings }: ProgressBarProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const calculateProgress = () => {
    let completedFields = 0
    const totalFields = 8 // Total number of required fields

    // Check branding fields
    if (settings.name && settings.name.trim()) completedFields++
    if (settings.logo_url && settings.logo_url.trim()) completedFields++
    if (settings.theme_color && settings.theme_color !== '#3B82F6') completedFields++ // Not default color
    if (settings.whatsapp_number && settings.whatsapp_number.trim()) completedFields++

    // Check business hours (at least 3 days configured)
    const configuredDays = Object.values(settings.business_hours).filter(
      (hours) => hours && hours.trim() && hours !== '00:00-00:00'
    ).length
    if (configuredDays >= 3) completedFields++

    // Check templates (at least 3 templates configured)
    const configuredTemplates = Object.values(settings.templates).filter(
      (template) => template && template.trim() && !template.includes('#{')
    ).length
    if (configuredTemplates >= 3) completedFields++
    if (configuredTemplates >= 5) completedFields++
    if (configuredTemplates >= 7) completedFields++

    return Math.round((completedFields / totalFields) * 100)
  }

  const progress = calculateProgress()
  const isComplete = progress === 100

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-text-secondary">Configuração: {progress}%</span>
        <div className="progress-linear w-32">
          <div
            className={`progress-fill ${
              isComplete ? 'bg-gradient-to-r from-accent-500 to-warning-500 trophy-shine' : 'bg-primary-500'
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="relative">
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`p-2 rounded-full transition-all duration-300 ${
            isComplete
              ? 'bg-gradient-to-r from-accent-500 to-warning-500 text-text-primary shadow-lg animate-shine gamification-glow'
              : 'bg-gray-200 text-gray-400'
          }`}
          aria-label="Progresso das configurações"
        >
          <Trophy size={20} />
        </button>

        {showTooltip && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-secondary-800 text-text-invert text-sm rounded-lg shadow-xl p-4 z-50 animate-pop">
            <div className="absolute -top-2 right-4 w-4 h-4 bg-secondary-800 transform rotate-45"></div>
            <div className="space-y-2">
              <div className="font-semibold text-accent-400">
                {isComplete
                  ? '🏆 Parabéns! Selo Casa Dourada conquistado!'
                  : 'Complete todas as configurações, receba o Selo Casa Dourada e:'}
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center">
                  <span className="mr-2">🔹</span>
                  Aumente a credibilidade com clientes
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🔹</span>
                  Reduza cancelamentos por desconfiança
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🔹</span>
                  Destaque-se como referência de profissionalismo
                </div>
              </div>
              {!isComplete && (
                <div className="mt-3 pt-2 border-t border-secondary-600 text-xs text-gray-300">
                  Faltam {100 - progress}% para completar
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
