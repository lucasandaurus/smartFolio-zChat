'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter,
  ArrowUpDown,
  Eye,
  X
} from 'lucide-react'

export default function AssetsPage() {
  const [assets, setAssets] = useState([])
  const [filteredAssets, setFilteredAssets] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterPlatform, setFilterPlatform] = useState('all')
  const [sortBy, setSortBy] = useState('value')
  const [sortOrder, setSortOrder] = useState('desc')
  const [isLoading, setIsLoading] = useState(true)

  // Datos de ejemplo
  const exampleAssets = [
    {
      id: '1',
      ticker: 'AAPL',
      name: 'Apple Inc.',
      sector: 'Tecnología',
      assetType: 'CEDEAR',
      platform: 'Balanz',
      quantity: 10,
      avgPrice: 165.20,
      currentPrice: 185.50,
      dailyChange: 2.3,
      value: 1855.00,
      profit: 203.00,
      profitPercent: 12.3
    },
    {
      id: '2',
      ticker: 'GGAL',
      name: 'Grupo Galicia',
      sector: 'Financiero',
      assetType: 'ACCION',
      platform: 'IOL',
      quantity: 100,
      avgPrice: 850.50,
      currentPrice: 920.80,
      dailyChange: 3.1,
      value: 92080.00,
      profit: 7030.00,
      profitPercent: 8.3
    },
    {
      id: '3',
      ticker: 'BTC',
      name: 'Bitcoin',
      sector: 'Cripto',
      assetType: 'CRYPTO',
      platform: 'Belo',
      quantity: 0.05,
      avgPrice: 38000.00,
      currentPrice: 42500.00,
      dailyChange: -2.3,
      value: 2125.00,
      profit: 225.00,
      profitPercent: 11.8
    },
    {
      id: '4',
      ticker: 'YPFD',
      name: 'YPF',
      sector: 'Energía',
      assetType: 'ACCION',
      platform: 'Balanz',
      quantity: 50,
      avgPrice: 450.30,
      currentPrice: 580.60,
      dailyChange: 4.7,
      value: 29030.00,
      profit: 6515.00,
      profitPercent: 28.9
    },
    {
      id: '5',
      ticker: 'TS',
      name: 'Ternium',
      sector: 'Metalurgia',
      assetType: 'CEDEAR',
      platform: 'IOL',
      quantity: 20,
      avgPrice: 28.50,
      currentPrice: 32.80,
      dailyChange: 1.8,
      value: 656.00,
      profit: 86.00,
      profitPercent: 15.1
    },
    {
      id: '6',
      ticker: 'AL30',
      name: 'Bonar 2030',
      sector: 'Renta Fija',
      assetType: 'BONO',
      platform: 'Balanz',
      quantity: 1000,
      avgPrice: 28.50,
      currentPrice: 29.20,
      dailyChange: 0.8,
      value: 29200.00,
      profit: 700.00,
      profitPercent: 2.5
    }
  ]

  const assetTypes = ['all', 'CEDEAR', 'ACCION', 'CRYPTO', 'BONO']
  const platforms = ['all', 'Balanz', 'IOL', 'Belo', 'Ualá']

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setAssets(exampleAssets)
      setFilteredAssets(exampleAssets)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = assets

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(asset => 
        asset.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtrar por tipo de activo
    if (filterType !== 'all') {
      filtered = filtered.filter(asset => asset.assetType === filterType)
    }

    // Filtrar por plataforma
    if (filterPlatform !== 'all') {
      filtered = filtered.filter(asset => asset.platform === filterPlatform)
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'ticker':
          aValue = a.ticker
          bValue = b.ticker
          break
        case 'value':
          aValue = a.value
          bValue = b.value
          break
        case 'profit':
          aValue = a.profit
          bValue = b.profit
          break
        case 'profitPercent':
          aValue = a.profitPercent
          bValue = b.profitPercent
          break
        case 'dailyChange':
          aValue = a.dailyChange
          bValue = b.dailyChange
          break
        default:
          aValue = a.value
          bValue = b.value
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      } else {
        return sortOrder === 'asc' 
          ? aValue - bValue
          : bValue - aValue
      }
    })

    setFilteredAssets(filtered)
  }, [assets, searchTerm, filterType, filterPlatform, sortBy, sortOrder])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const totalValue = filteredAssets.reduce((sum, asset) => sum + asset.value, 0)
  const totalProfit = filteredAssets.reduce((sum, asset) => sum + asset.profit, 0)
  const totalProfitPercent = totalValue > 0 ? (totalProfit / (totalValue - totalProfit)) * 100 : 0

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando activos...</p>
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
              <h1 className="text-2xl font-bold text-primary">Listado de Activos</h1>
              <Badge variant="secondary">{filteredAssets.length} activos</Badge>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              <X className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ganancia/Pérdida Total</CardTitle>
              {totalProfit >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(totalProfit)}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatPercentage(totalProfitPercent)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activos Filtrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredAssets.length}</div>
              <p className="text-xs text-muted-foreground">
                de {assets.length} totales
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros y Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por ticker o nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de activo" />
                </SelectTrigger>
                <SelectContent>
                  {assetTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === 'all' ? 'Todos los tipos' : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Plataforma" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform === 'all' ? 'Todas las plataformas' : platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="value">Valor</SelectItem>
                  <SelectItem value="profit">Ganancia/Pérdida</SelectItem>
                  <SelectItem value="profitPercent">Porcentaje</SelectItem>
                  <SelectItem value="dailyChange">Variación del día</SelectItem>
                  <SelectItem value="ticker">Ticker</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Activos */}
        <Card>
          <CardHeader>
            <CardTitle>Activos del Portfolio</CardTitle>
            <CardDescription>
              Vista detallada de todos tus activos de inversión
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('ticker')}
                    >
                      <div className="flex items-center gap-1">
                        Ticker
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Plataforma</TableHead>
                    <TableHead className="text-right">Cantidad</TableHead>
                    <TableHead className="text-right">Precio Promedio</TableHead>
                    <TableHead className="text-right">Precio Actual</TableHead>
                    <TableHead className="text-right">Variación Día</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 text-right"
                      onClick={() => handleSort('value')}
                    >
                      <div className="flex items-center gap-1 justify-end">
                        Valor Actual
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 text-right"
                      onClick={() => handleSort('profit')}
                    >
                      <div className="flex items-center gap-1 justify-end">
                        Ganancia/Pérdida
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-center">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets.map((asset) => (
                    <TableRow key={asset.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{asset.ticker}</TableCell>
                      <TableCell>{asset.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{asset.sector}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{asset.assetType}</Badge>
                      </TableCell>
                      <TableCell>{asset.platform}</TableCell>
                      <TableCell className="text-right">{asset.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(asset.avgPrice)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(asset.currentPrice)}</TableCell>
                      <TableCell className={`text-right font-medium ${asset.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(asset.dailyChange)}
                      </TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(asset.value)}</TableCell>
                      <TableCell className={`text-right font-medium ${asset.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <div>
                          <div>{formatCurrency(asset.profit)}</div>
                          <div className="text-sm">{formatPercentage(asset.profitPercent)}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}