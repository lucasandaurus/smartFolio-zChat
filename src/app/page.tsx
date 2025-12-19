'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { EvolutionChart } from '@/components/charts/evolution-chart'
import { DistributionChart } from '@/components/charts/distribution-chart'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  Plus, 
  List, 
  Brain,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Building,
  Bitcoin
} from 'lucide-react'

export default function Dashboard() {
  const [selectedCurrency, setSelectedCurrency] = useState('ARS')
  const [isLoading, setIsLoading] = useState(true)

  // Datos de ejemplo - en producción vendrían de la API
  const portfolioData = {
    totalValue: 12500000,
    investedValue: 10000000,
    dailyChange: 2.5,
    dailyChangeAmount: 312500,
    walletChange: 1.2,
    alycChange: 3.8,
    cryptoChange: -0.5
  }

  const topAssets = [
    { ticker: 'AAPL', name: 'Apple Inc.', change: 5.2, value: 2500000 },
    { ticker: 'GGAL', name: 'Grupo Galicia', change: 3.1, value: 1800000 },
    { ticker: 'BTC', name: 'Bitcoin', change: -2.3, value: 1500000 },
    { ticker: 'YPFD', name: 'YPF', change: 4.7, value: 1200000 },
    { ticker: 'TS', name: 'Ternium', change: 1.8, value: 900000 }
  ]

  // Datos para gráficos de evolución
  const evolutionData = [
    { date: '2024-01-01', value: 10000000 },
    { date: '2024-01-08', value: 10250000 },
    { date: '2024-01-15', value: 10800000 },
    { date: '2024-01-22', value: 11200000 },
    { date: '2024-01-29', value: 11500000 },
    { date: '2024-02-05', value: 11800000 },
    { date: '2024-02-12', value: 12100000 },
    { date: '2024-02-19', value: 12500000 }
  ]

  const cryptoEvolutionData = [
    { date: '2024-01-01', value: 2000000 },
    { date: '2024-01-08', value: 2100000 },
    { date: '2024-01-15', value: 1950000 },
    { date: '2024-01-22', value: 1800000 },
    { date: '2024-01-29', value: 1900000 },
    { date: '2024-02-05', value: 2100000 },
    { date: '2024-02-12', value: 2200000 },
    { date: '2024-02-19', value: 1500000 }
  ]

  const alycEvolutionData = [
    { date: '2024-01-01', value: 7000000 },
    { date: '2024-01-08', value: 7200000 },
    { date: '2024-01-15', value: 7600000 },
    { date: '2024-01-22', value: 8200000 },
    { date: '2024-01-29', value: 8500000 },
    { date: '2024-02-05', value: 8800000 },
    { date: '2024-02-12', value: 9200000 },
    { date: '2024-02-19', value: 9800000 }
  ]

  const walletEvolutionData = [
    { date: '2024-01-01', value: 1000000 },
    { date: '2024-01-08', value: 950000 },
    { date: '2024-01-15', value: 1250000 },
    { date: '2024-01-22', value: 1200000 },
    { date: '2024-01-29', value: 1100000 },
    { date: '2024-02-05', value: 900000 },
    { date: '2024-02-12', value: 700000 },
    { date: '2024-02-19', value: 1200000 }
  ]

  // Datos para gráficos de distribución
  const assetTypeDistribution = [
    { name: 'CEDEARs', value: 4500000, percentage: 36 },
    { name: 'Acciones', value: 3750000, percentage: 30 },
    { name: 'Cripto', value: 1500000, percentage: 12 },
    { name: 'Bonos', value: 1750000, percentage: 14 },
    { name: 'FCI', value: 1000000, percentage: 8 }
  ]

  const platformDistribution = [
    { name: 'Balanz', value: 4000000, percentage: 32 },
    { name: 'IOL', value: 3500000, percentage: 28 },
    { name: 'Belo', value: 1500000, percentage: 12 },
    { name: 'Ualá', value: 2000000, percentage: 16 },
    { name: 'Banco Galicia', value: 1500000, percentage: 12 }
  ]

  const natureDistribution = [
    { name: 'ALyC', value: 9800000, percentage: 78.4 },
    { name: 'Crypto', value: 1500000, percentage: 12 },
    { name: 'Billetera', value: 1200000, percentage: 9.6 }
  ]

  const currencyOptions = [
    { value: 'ARS', label: 'Pesos Argentinos' },
    { value: 'USD_OFICIAL', label: 'USD Oficial' },
    { value: 'USD_CCL', label: 'USD CCL' },
    { value: 'USD_BLUE', label: 'USD Blue' }
  ]

  const formatCurrency = (amount: number) => {
    const symbol = selectedCurrency === 'ARS' ? '$' : 'U$D'
    const formattedAmount = new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
    return `${symbol} ${formattedAmount}`
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando smartFolioIA...</p>
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
              <h1 className="text-2xl font-bold text-primary">smartFolioIA</h1>
              <Badge variant="secondary" className="text-xs">
                Asesor Inteligente de Inversiones
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Seleccionar moneda" />
                </SelectTrigger>
                <SelectContent>
                  {currencyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Resumen General */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patrimonio Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(portfolioData.totalValue)}</div>
              <p className="text-xs text-muted-foreground">
                Capital invertido: {formatCurrency(portfolioData.investedValue)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ganancia/Pérdida Total</CardTitle>
              {portfolioData.dailyChangeAmount > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${portfolioData.dailyChangeAmount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(portfolioData.dailyChangeAmount)}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatPercentage(((portfolioData.totalValue - portfolioData.investedValue) / portfolioData.investedValue) * 100)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rendimiento del Día</CardTitle>
              {portfolioData.dailyChange > 0 ? (
                <ArrowUpRight className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${portfolioData.dailyChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(portfolioData.dailyChange)}
              </div>
              <p className="text-xs text-muted-foreground">
                Variación respecto al cierre anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activos Totales</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                Distribuidos en 8 plataformas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Rendimiento por Naturaleza */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Rendimiento del Día por Naturaleza</CardTitle>
            <CardDescription>
              Variación porcentual de cada tipo de portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Billetera</p>
                    <p className="text-sm text-muted-foreground">Cuentas y efectivo</p>
                  </div>
                </div>
                <div className={`text-lg font-semibold ${portfolioData.walletChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(portfolioData.walletChange)}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">ALyC</p>
                    <p className="text-sm text-muted-foreground">Acciones y bonos</p>
                  </div>
                </div>
                <div className={`text-lg font-semibold ${portfolioData.alycChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(portfolioData.alycChange)}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Bitcoin className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium">Crypto</p>
                    <p className="text-sm text-muted-foreground">Criptomonedas</p>
                  </div>
                </div>
                <div className={`text-lg font-semibold ${portfolioData.cryptoChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(portfolioData.cryptoChange)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gráficos de Evolución y Distribución */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráficos de Evolución */}
          <Card>
            <CardHeader>
              <CardTitle>Gráficos de Evolución</CardTitle>
              <CardDescription>
                Visualiza el rendimiento histórico de tus activos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="total" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="total">Total</TabsTrigger>
                  <TabsTrigger value="crypto">Crypto</TabsTrigger>
                  <TabsTrigger value="alyc">ALyC</TabsTrigger>
                  <TabsTrigger value="wallet">Billetera</TabsTrigger>
                </TabsList>
                <TabsContent value="total" className="mt-4">
                  <EvolutionChart data={evolutionData} title="Patrimonio Total" color="#8884d8" />
                </TabsContent>
                <TabsContent value="crypto" className="mt-4">
                  <EvolutionChart data={cryptoEvolutionData} title="Patrimonio Cripto" color="#ff7300" />
                </TabsContent>
                <TabsContent value="alyc" className="mt-4">
                  <EvolutionChart data={alycEvolutionData} title="Patrimonio ALyC" color="#00c49f" />
                </TabsContent>
                <TabsContent value="wallet" className="mt-4">
                  <EvolutionChart data={walletEvolutionData} title="Patrimonio Billetera" color="#ffbb28" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Top Activos */}
          <Card>
            <CardHeader>
              <CardTitle>Top Activos</CardTitle>
              <CardDescription>
                Mejores y peores rendimientos del día
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-green-600 mb-2">Mejores Rendimientos</h4>
                  <div className="space-y-2">
                    {topAssets.slice(0, 3).map((asset, index) => (
                      <div key={asset.ticker} className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{index + 1}.</span>
                          <div>
                            <p className="text-sm font-medium">{asset.ticker}</p>
                            <p className="text-xs text-muted-foreground">{asset.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-green-600">
                            {formatPercentage(asset.change)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatCurrency(asset.value)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2">Peores Rendimientos</h4>
                  <div className="space-y-2">
                    {topAssets.filter(asset => asset.change < 0).map((asset, index) => (
                      <div key={asset.ticker} className="flex items-center justify-between p-2 bg-red-50 rounded">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{index + 1}.</span>
                          <div>
                            <p className="text-sm font-medium">{asset.ticker}</p>
                            <p className="text-xs text-muted-foreground">{asset.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-red-600">
                            {formatPercentage(asset.change)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatCurrency(asset.value)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos de Distribución */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Tipo de Activo</CardTitle>
              <CardDescription>
                Composición del portfolio por tipo de inversión
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DistributionChart data={assetTypeDistribution} title="Tipo de Activo" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribución por Plataforma</CardTitle>
              <CardDescription>
                Composición del portfolio por broker/plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DistributionChart data={platformDistribution} title="Plataforma" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribución por Naturaleza</CardTitle>
              <CardDescription>
                Composición del portfolio por naturaleza de activo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DistributionChart data={natureDistribution} title="Naturaleza" />
            </CardContent>
          </Card>
        </div>

        {/* Accesos Rápidos */}
        <Card>
          <CardHeader>
            <CardTitle>Accesos Rápidos</CardTitle>
            <CardDescription>
              Navega rápidamente a las funciones principales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button className="flex items-center gap-2" onClick={() => window.location.href = '/operations'}>
                <Plus className="h-4 w-4" />
                Cargar Operación
              </Button>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => window.location.href = '/assets'}>
                <List className="h-4 w-4" />
                Listado de Activos
              </Button>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => window.location.href = '/analysis'}>
                <Brain className="h-4 w-4" />
                Análisis IA
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}