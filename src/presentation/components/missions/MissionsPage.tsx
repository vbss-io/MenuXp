import React, { useContext } from 'react';
import { Trophy, Star, Gift, Target, Clock, TrendingUp, CheckCircle, Calendar } from 'lucide-react';
import { AppContext } from '@/presentation/contexts/AppContext';

interface CompletedMission {
  id: string;
  title: string;
  description: string;
  reward: string;
  completedAt: string;
  xpEarned: number;
  category: 'sales' | 'efficiency' | 'promotion' | 'customer';
}

export default function MissionsPage() {
  const { completedMissions } = useContext(AppContext);

  // Mock completed missions data
  const completedMissionsData: CompletedMission[] = [
    {
      id: 'first_sale',
      title: 'Primeira Venda',
      description: 'Complete seu primeiro pedido com sucesso',
      reward: '+50 XP + Badge Iniciante',
      completedAt: '2025-01-15T10:30:00Z',
      xpEarned: 50,
      category: 'sales'
    },
    {
      id: 'speed_master',
      title: 'Mestre da Velocidade',
      description: 'Mantenha tempo médio de preparo abaixo de 15 minutos por 3 dias consecutivos',
      reward: '+200 XP + Badge Velocista',
      completedAt: '2025-01-18T16:45:00Z',
      xpEarned: 200,
      category: 'efficiency'
    },
    {
      id: 'promotion_king',
      title: 'Rei das Promoções',
      description: 'Crie 5 promoções diferentes em um mês',
      reward: '+150 XP + Badge Promocional',
      completedAt: '2025-01-20T14:20:00Z',
      xpEarned: 150,
      category: 'promotion'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sales': return <TrendingUp className="h-5 w-5" />;
      case 'efficiency': return <Clock className="h-5 w-5" />;
      case 'promotion': return <Gift className="h-5 w-5" />;
      case 'customer': return <Star className="h-5 w-5" />;
      default: return <Target className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sales': return 'bg-accent-2-100 text-accent-2-800';
      case 'efficiency': return 'bg-info-100 text-info-800';
      case 'promotion': return 'bg-accent-100 text-accent-800';
      case 'customer': return 'bg-warning-100 text-warning-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalXP = completedMissionsData.reduce((sum, mission) => sum + mission.xpEarned, 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-section font-bold text-text-primary">Missões Concluídas</h1>
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-warning-400 to-warning-600 text-text-invert px-4 py-2 rounded-sm border border-black">
            <div className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              <span className="font-semibold text-nav">{totalXP} XP Total</span>
            </div>
          </div>
        </div>
      </div>

      {completedMissionsData.length === 0 ? (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-sm bg-bg-light mb-4 border border-black">
              <Trophy className="h-8 w-8 text-text-secondary" />
            </div>
            <h2 className="text-body font-semibold text-text-primary mb-2">
              Nenhuma Missão Concluída
            </h2>
            <p className="text-body text-text-secondary">
              Complete missões no dashboard para ver suas conquistas aqui.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card-basic">
              <div className="flex items-center">
                <div className="p-3 rounded-sm bg-accent-2-100 mr-4 border border-black">
                  <CheckCircle className="h-6 w-6 text-accent-2-600" />
                </div>
                <div>
                  <p className="text-subtitle text-text-secondary">Missões Concluídas</p>
                  <p className="text-section font-bold text-text-primary">{completedMissionsData.length}</p>
                </div>
              </div>
            </div>

            <div className="card-basic">
              <div className="flex items-center">
                <div className="p-3 rounded-sm bg-warning-100 mr-4 border border-black">
                  <Trophy className="h-6 w-6 text-warning-600" />
                </div>
                <div>
                  <p className="text-subtitle text-text-secondary">XP Acumulado</p>
                  <p className="text-section font-bold text-text-primary">{totalXP}</p>
                </div>
              </div>
            </div>

            <div className="card-basic">
              <div className="flex items-center">
                <div className="p-3 rounded-sm bg-accent-100 mr-4 border border-black">
                  <Star className="h-6 w-6 text-accent-600" />
                </div>
                <div>
                  <p className="text-subtitle text-text-secondary">Badges Conquistados</p>
                  <p className="text-section font-bold text-text-primary">{completedMissionsData.length}</p>
                </div>
              </div>
            </div>

            <div className="card-basic">
              <div className="flex items-center">
                <div className="p-3 rounded-sm bg-info-100 mr-4 border border-black">
                  <Calendar className="h-6 w-6 text-info-600" />
                </div>
                <div>
                  <p className="text-subtitle text-text-secondary">Última Conquista</p>
                  <p className="text-subtitle font-medium text-text-primary">
                    {completedMissionsData.length > 0 
                      ? new Date(completedMissionsData[completedMissionsData.length - 1].completedAt).toLocaleDateString('pt-BR')
                      : 'Nenhuma'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Completed Missions List */}
          <div className="card-basic overflow-hidden">
            <div className="px-6 py-4 border-b border-black">
              <h2 className="text-body font-medium text-text-primary">Histórico de Conquistas</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {completedMissionsData
                .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
                .map((mission) => (
                  <div key={mission.id} className="p-6 hover:bg-bg-light transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-sm border border-black ${getCategoryColor(mission.category)}`}>
                          {getCategoryIcon(mission.category)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-body font-medium text-text-primary">{mission.title}</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-subtitle font-medium border border-black ${getCategoryColor(mission.category)}`}>
                              {mission.category === 'sales' ? 'Vendas' :
                               mission.category === 'efficiency' ? 'Eficiência' :
                               mission.category === 'promotion' ? 'Promoção' : 'Cliente'}
                            </span>
                          </div>
                          
                          <p className="text-body text-text-secondary mb-3">{mission.description}</p>
                          
                          <div className="flex items-center space-x-4 text-subtitle text-text-secondary">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>
                                Concluída em {new Date(mission.completedAt).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="bg-gradient-to-r from-warning-400 to-warning-600 text-text-invert px-3 py-1 rounded-sm text-subtitle font-medium mb-2 border border-black">
                          +{mission.xpEarned} XP
                        </div>
                        <div className="text-subtitle text-text-secondary">
                          {mission.reward}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Achievement Showcase */}
          <div className="mt-8 bg-gradient-to-r from-info-50 to-accent-50 rounded-sm p-6 border border-black">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-body font-medium text-text-primary mb-2">Próximo Nível</h3>
                <p className="text-body text-text-secondary">Continue completando missões para desbloquear novos badges e recompensas!</p>
              </div>
              <div className="text-6xl">🏆</div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-subtitle text-text-secondary mb-1">
                <span>Progresso para o próximo nível</span>
                <span>{totalXP}/1000 XP</span>
              </div>
              <div className="progress-linear">
                <div 
                  className="bg-gradient-to-r from-info-500 to-accent-500 h-2 rounded-sm transition-all duration-500"
                  style={{ width: `${Math.min((totalXP / 1000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}