'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Lightbulb,
  RefreshCw,
  Target,
  Shield,
  Zap,
  X,
  ChevronRight
} from 'lucide-react'

export default function AnalysisPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Datos de ejemplo para el análisis
  const mockAnalysis = {
    portfolioHealth: {
      score: 78,
      diversification: 65,
      riskLevel: 'Moderado',
      performance: 82
    },
    alerts: [
      {
        type: 'warning',
        title: 'Concentración elevada en tecnología',
        description: 'Tu portfolio tiene un 45% en activos de tecnología. Considera diversificar para reducir riesgo.',
        severity: 'medium',
        suggestedAction: 'Explorar sectores como energía o consumo básico'
      },
      {
        type: 'opportunity',
        title: 'Oportunidad en YPF',
        description: 'YPF muestra una tendencia alcista sostenida con fundamentos sólidos.',
        severity: 'low',
        suggestedAction: 'Considerar aumentar posición si alinea con tu estrategia'
      },
      {
        type: 'risk',
        title: 'Volatilidad en criptoactivos',
        description: 'Bitcoin ha caído 15% esta semana debido a noticias regulatorias.',
        severity: 'high',
        suggestedAction: 'Evaluar rebalanceo o establecer stop-loss'
      }
    ],
    insights: [
      {
        category: 'Rendimiento',
        title: 'Mejorando respecto al mercado',
        description: 'Tu portfolio ha superado al S&P Merval en 2.3% este mes.',
        impact: 'positive'
      },
      {
        category: 'Riesgo',
        title: 'Beta del portfolio: 1.2',
        description: 'Tu portfolio es ligeramente más volátil que el mercado.',
        impact: 'neutral'
      },
      {
        category: 'Diversificación',
        title: 'Correlación moderada',
        description: 'Los activos en tu portfolio tienen una correlación promedio de 0.65.',
        impact: 'neutral'
      }
    ],
    recommendations: [
      {
        priority: 'high',
        title: 'Rebalancear sector tecnología',
        description: 'Reducir exposición a tecnología del 45% al 30% y aumentar sectores defensivos.',
        expectedImpact: 'Reducción de riesgo sin afectar significativamente el rendimiento',
        timeframe: '1-2 semanas'
      },
      {
        priority: 'medium',
        title: 'Considerar bonos soberanos',
        description: 'Agregar bonos del gobierno para reducir volatilidad general del portfolio.',
        expectedImpact: 'Mejora del ratio riesgo/retorno',
        timeframe: '2-4 semanas'
      },
      {
        priority: 'low',
        title: 'Explorar FCI de renta fija',
        description: 'Pequeña asignación (5-10%) a fondos de renta fija para estabilidad.',
        expectedImpact: 'Ingresos pasivos y menor volatilidad',
        timeframe: '1 mes'
      }
    ],
    marketAnalysis: {
      trend: 'alcista moderado',
      keyFactors: [
        'Inflación desacelerándose',
        'Tasas de interés estables',
        'Recuperación económica local',
        'Volatilidad internacional elevada'
      ],
      outlook: 'positivo_corto_plazo'
    }
  }

  useEffect(() => {
    // Simular carga inicial del análisis
    setTimeout(() => {
      setAnalysis(mockAnalysis)
    }, 1500)
  }, [])

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    
    // Simular proceso de análisis con IA
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setAnalysis(mockAnalysis)
    setLastUpdate(new Date())
    setIsAnalyzing(false)
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'opportunity':
        return <Lightbulb className="h-4 w-4 text-green-600" />
      case 'risk':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50'
      case 'medium':
        return 'border-yellow-200 bg-yellow-50'
      case 'low':
        return 'border-green-200 bg-green-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Analizando tu portfolio con smartFolioIA...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                <Brain className="h-6 w-6" />
                Análisis IA
              </h1>
              <Badge variant="secondary">smartFolioIA</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={runAnalysis} 
                disabled={isAnalyzing}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                {isAnalyzing ? 'Analizando...' : 'Actualizar Análisis'}
              </Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                <X className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Salud del Portfolio */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Salud General</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analysis.portfolioHealth.score}/100</div>
              <Progress value={analysis.portfolioHealth.score} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Diversificación</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analysis.portfolioHealth.diversification}%</div>
              <Progress value={analysis.portfolioHealth.diversification} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nivel de Riesgo</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analysis.portfolioHealth.riskLevel}</div>
              <p className="text-xs text-muted-foreground">Basado en volatilidad</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rendimiento</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analysis.portfolioHealth.performance}%</div>
              <p className="text-xs text-muted-foreground">vs. benchmark</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="alerts">Alertas</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
            <TabsTrigger value="market">Análisis de Mercado</TabsTrigger>
          </TabsList>

          {/* Alertas */}
          <TabsContent value="alerts">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Alertas y Notificaciones</h3>
              {analysis.alerts.map((alert, index) => (
                <Alert key={index} className={getAlertColor(alert.severity)}>
                  {getAlertIcon(alert.type)}
                  <AlertTitle className="flex items-center gap-2">
                    {alert.title}
                    <Badge variant="outline" className="text-xs">
                      {alert.severity === 'high' ? 'Alta' : alert.severity === 'medium' ? 'Media' : 'Baja'}
                    </Badge>
                  </AlertTitle>
                  <AlertDescription>
                    <p className="mb-2">{alert.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <ChevronRight className="h-3 w-3" />
                      <span className="font-medium">Acción sugerida:</span> {alert.suggestedAction}
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </TabsContent>

          {/* Insights */}
          <TabsContent value="insights">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Insights del Portfolio</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analysis.insights.map((insight, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Badge variant={insight.impact === 'positive' ? 'default' : 'secondary'}>
                          {insight.category}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium mb-2">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Recomendaciones */}
          <TabsContent value="recommendations">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recomendaciones Personalizadas</h3>
              {analysis.recommendations.map((rec, index) => (
                <Card key={index} className={`border-l-4 ${getPriorityColor(rec.priority)}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{rec.title}</CardTitle>
                      <Badge variant="outline">
                        {rec.priority === 'high' ? 'Alta Prioridad' : rec.priority === 'medium' ? 'Media Prioridad' : 'Baja Prioridad'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{rec.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="h-3 w-3" />
                        <span><strong>Impacto esperado:</strong> {rec.expectedImpact}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <RefreshCw className="h-3 w-3" />
                        <span><strong>Plazo sugerido:</strong> {rec.timeframe}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Análisis de Mercado */}
          <TabsContent value="market">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Análisis del Mercado</h3>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tendencia Actual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Badge variant={analysis.marketAnalysis.trend.includes('alcista') ? 'default' : 'destructive'}>
                      {analysis.marketAnalysis.trend}
                    </Badge>
                    <span className="text-muted-foreground">
                      Perspectiva: {analysis.marketAnalysis.outlook === 'positivo_corto_plazo' ? 'Positivo a corto plazo' : 'Neutral'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Factores Clave del Mercado</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.marketAnalysis.keyFactors.map((factor, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <ChevronRight className="h-3 w-3 text-primary" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-8" />
        
        <div className="text-center text-sm text-muted-foreground">
          Última actualización: {lastUpdate.toLocaleString('es-AR')}
        </div>
      </main>
    </div>
  )
}