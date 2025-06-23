import React, { useContext, useState } from 'react'
import { Target, Gift, Star, CheckCircle, Clock, Users, TrendingUp } from 'lucide-react'
import { AppContext } from '@/presentation/contexts/AppContext'

interface Mission {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  progress: number
  maxProgress: number
  reward: string
  completed: boolean
  type: 'discount' | 'orders' | 'revenue' | 'time'
}

export default function MissionsCard() {
  const { menuItems, orders, completedMissions, completeMission } = useContext(AppContext)

  const calculateMissionProgress = (mission: Mission) => {
    switch (mission.type) {
      case 'discount':
        const itemsWithDiscount = menuItems.filter((item) => item.discount > 0).length
        return Math.min(itemsWithDiscount, mission.maxProgress)

      case 'orders':
        const todayOrders = orders.filter((order) => {
          const today = new Date().toISOString().split('T')[0]
          return order.timestamp.split('T')[0] === today && order.status !== 'Cancelado'
        }).length
        return Math.min(todayOrders, mission.maxProgress)

      case 'revenue':
        const todayRevenue = orders
          .filter((order) => {
            const today = new Date().toISOString().split('T')[0]
            return order.timestamp.split('T')[0] === today && order.status !== 'Cancelado'
          })
          .reduce((sum, order) => sum + order.total, 0)
        return Math.min(Math.floor(todayRevenue / 100), mission.maxProgress)

      case 'time':
        // Mock: assume average prep time under 20 minutes
        return Math.min(1, mission.maxProgress)

      default:
        return 0
    }
  }

  const missions: Mission[] = [
    {
      id: 'discount_promo',
      title: 'Primeira Promoção',
      description: 'Insira 10% OFF em pelo menos um item do seu cardápio',
      icon: Gift,
      progress: 0,
      maxProgress: 1,
      reward: '+50 XP',
      completed: false,
      type: 'discount'
    },
    {
      id: 'daily_orders',
      title: 'Vendedor do Dia',
      description: 'Complete 10 pedidos em um dia',
      icon: Target,
      progress: 0,
      maxProgress: 10,
      reward: '+100 XP',
      completed: false,
      type: 'orders'
    },
    {
      id: 'revenue_goal',
      title: 'Meta de Faturamento',
      description: 'Alcance R$ 500 em vendas diárias',
      icon: TrendingUp,
      progress: 0,
      maxProgress: 5,
      reward: '+200 XP',
      completed: false,
      type: 'revenue'
    },
    {
      id: 'fast_service',
      title: 'Serviço Rápido',
      description: 'Mantenha tempo médio de preparo abaixo de 20 minutos',
      icon: Clock,
      progress: 0,
      maxProgress: 1,
      reward: '+75 XP',
      completed: false,
      type: 'time'
    }
  ]

  // Update missions with current progress
  const updatedMissions = missions.map((mission) => ({
    ...mission,
    progress: calculateMissionProgress(mission),
    completed: completedMissions.includes(mission.id) || calculateMissionProgress(mission) >= mission.maxProgress
  }))

  const handleClaimReward = (missionId: string) => {
    completeMission(missionId)
  }

  return (
    <div className="card-basic">
      <div className="flex items-center mb-4">
        <Star className="h-6 w-6 text-accent-500 mr-2" />
        <h2 className="text-xl font-semibold text-text-primary">Missões</h2>
      </div>

      <div className="space-y-4">
        {updatedMissions.map((mission) => {
          const IconComponent = mission.icon
          const progressPercentage = (mission.progress / mission.maxProgress) * 100

          return (
            <div
              key={mission.id}
              className={`p-4 rounded-sm border-2 transition-all ${
                mission.completed
                  ? 'border-accent-2-500 bg-accent-2-50'
                  : 'border-black bg-bg-dark hover:border-primary-500 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div
                    className={`p-2 rounded-sm border border-black mr-3 ${
                      mission.completed ? 'bg-accent-2-100 text-accent-2-600' : 'bg-primary-100 text-primary-600'
                    }`}
                  >
                    {mission.completed ? <CheckCircle className="h-5 w-5" /> : <IconComponent className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary text-body">{mission.title}</h3>
                    <p className="text-subtitle text-text-secondary">{mission.description}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-medium text-gray-500 mb-1">
                    {mission.progress}/{mission.maxProgress}
                  </div>
                  {mission.completed && !completedMissions.includes(mission.id) ? (
                    <button
                      onClick={() => handleClaimReward(mission.id)}
                      className="btn-primary text-xs py-1 px-3 animate-pop"
                    >
                      Resgatar
                    </button>
                  ) : mission.completed ? (
                    <span className="badge-level text-xs">Concluída</span>
                  ) : (
                    <span className="badge-currency text-xs">{mission.reward}</span>
                  )}
                </div>
              </div>

              <div className="progress-linear">
                <div
                  className={`progress-fill ${mission.completed ? 'bg-accent-2-500' : 'bg-primary-500'}`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-sm border border-black">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-primary text-body">Próximas Missões</h4>
            <p className="text-subtitle text-text-secondary">Complete as missões atuais para desbloquear novas</p>
          </div>
          <div className="text-2xl">🎯</div>
        </div>
      </div>
    </div>
  )
}
