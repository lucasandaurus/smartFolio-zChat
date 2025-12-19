'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CalendarIcon, Plus, Minus, Save, X } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function OperationsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [platform, setPlatform] = useState('')
  const [assetType, setAssetType] = useState('')
  const [operationType, setOperationType] = useState('')
  const [currency, setCurrency] = useState('ARS')
  const [ticker, setTicker] = useState('')
  const [assetName, setAssetName] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [commissions, setCommissions] = useState('0')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Datos de ejemplo
  const platforms = [
    { value: 'uala', label: 'Ualá', type: 'BILLETERA' },
    { value: 'balanz', label: 'Balanz', type: 'ALYC' },
    { value: 'belo', label: 'Belo', type: 'CRYPTO' },
    { value: 'ripio', label: 'Ripio', type: 'CRYPTO' },
    { value: 'iol', label: 'Invertir Online', type: 'ALYC' },
    { value: 'bancogalicia', label: 'Banco Galicia', type: 'BILLETERA' }
  ]

  const assetTypes = [
    { value: 'ACCIONES', label: 'Acciones' },
    { value: 'CEDEARS', label: 'CEDEARs' },
    { value: 'BONOS', label: 'Bonos' },
    { value: 'LETRAS', label: 'Letras' },
    { value: 'CRYPTO', label: 'Criptomonedas' },
    { value: 'FCI', label: 'Fondos Comunes de Inversión' },
    { value: 'FIDEICOMISOS', label: 'Fideicomisos' },
    { value: 'ON', label: 'Obligaciones Negociables' }
  ]

  const getOperationTypes = (assetType: string) => {
    switch (assetType) {
      case 'CEDEARS':
      case 'ACCIONES':
      case 'BONOS':
      case 'LETRAS':
      case 'CRYPTO':
      case 'ON':
        return [
          { value: 'COMPRA', label: 'Compra' },
          { value: 'VENTA', label: 'Venta' }
        ]
      case 'FCI':
      case 'FIDEICOMISOS':
        return [
          { value: 'SUSCRIPCION', label: 'Suscripción' },
          { value: 'RESCATE', label: 'Rescate' }
        ]
      default:
        return []
    }
  }

  const getAdditionalOperationTypes = (assetType: string) => {
    switch (assetType) {
      case 'CEDEARS':
      case 'ACCIONES':
        return [{ value: 'DIVIDENDOS', label: 'Pago de dividendos' }]
      case 'BONOS':
      case 'LETRAS':
      case 'FIDEICOMISOS':
        return [{ value: 'PAGO_RENTA', label: 'Pago de renta' }]
      default:
        return []
    }
  }

  const calculateTotal = () => {
    const priceValue = parseFloat(price) || 0
    const quantityValue = parseFloat(quantity) || 0
    const commissionsValue = parseFloat(commissions) || 0
    
    if (operationType === 'VENTA' || operationType === 'RESCATE') {
      return (priceValue * quantityValue) - commissionsValue
    } else {
      return (priceValue * quantityValue) + commissionsValue
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const operationData = {
        date: selectedDate.toISOString(),
        platform,
        assetType,
        operationType,
        currency,
        ticker,
        assetName,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        commissions: parseFloat(commissions),
        total: calculateTotal(),
        description
      }

      // Aquí iría la llamada a la API
      console.log('Operation data:', operationData)
      
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Resetear formulario
      resetForm()
      
      alert('Operación cargada exitosamente en smartFolioIA')
    } catch (error) {
      console.error('Error saving operation:', error)
      alert('Error al guardar la operación')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setSelectedDate(new Date())
    setPlatform('')
    setAssetType('')
    setOperationType('')
    setCurrency('ARS')
    setTicker('')
    setAssetName('')
    setPrice('')
    setQuantity('')
    setCommissions('0')
    setDescription('')
  }

  const filteredPlatforms = platforms.filter(p => !assetType || p.type === 'BILLETERA' || p.type === 'ALYC' || p.type === 'CRYPTO')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-primary">Gestión de Operaciones</h1>
              <Badge variant="secondary">Carga Manual</Badge>
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
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Nueva Operación</CardTitle>
              <CardDescription>
                Ingresa los detalles de tu operación de inversión
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Fecha */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha de la operación</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => date && setSelectedDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Moneda */}
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moneda</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar moneda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ARS">Pesos Argentinos (ARS)</SelectItem>
                        <SelectItem value="USD">Dólares (USD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Plataforma */}
                <div className="space-y-2">
                  <Label htmlFor="platform">Plataforma</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredPlatforms.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tipo de Activo */}
                <div className="space-y-2">
                  <Label htmlFor="assetType">Tipo de Activo</Label>
                  <Select value={assetType} onValueChange={setAssetType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo de activo" />
                    </SelectTrigger>
                    <SelectContent>
                      {assetTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Ticker y Nombre del Activo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ticker">Ticker/Símbolo</Label>
                    <Input
                      id="ticker"
                      value={ticker}
                      onChange={(e) => setTicker(e.target.value.toUpperCase())}
                      placeholder="Ej: AAPL, GGAL, BTC"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assetName">Nombre del Activo</Label>
                    <Input
                      id="assetName"
                      value={assetName}
                      onChange={(e) => setAssetName(e.target.value)}
                      placeholder="Ej: Apple Inc., Grupo Galicia"
                      required
                    />
                  </div>
                </div>

                {/* Tipo de Operación */}
                <div className="space-y-2">
                  <Label htmlFor="operationType">Tipo de Operación</Label>
                  <Select value={operationType} onValueChange={setOperationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo de operación" />
                    </SelectTrigger>
                    <SelectContent>
                      {assetType && (
                        <>
                          {getOperationTypes(assetType).map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                          {getAdditionalOperationTypes(assetType).map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Precio, Cantidad y Comisiones */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio por Unidad</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Cantidad</Label>
                    <Input
                      id="quantity"
                      type="number"
                      step="0.01"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="commissions">Comisiones</Label>
                    <Input
                      id="commissions"
                      type="number"
                      step="0.01"
                      value={commissions}
                      onChange={(e) => setCommissions(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Total Calculado */}
                <div className="space-y-2">
                  <Label>Total (calculado automáticamente)</Label>
                  <div className="text-2xl font-bold text-primary">
                    {currency === 'ARS' ? '$' : 'U$D'} {calculateTotal().toFixed(2)}
                  </div>
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción (opcional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Notas adicionales sobre la operación..."
                    rows={3}
                  />
                </div>

                <Separator />

                {/* Botones de Acción */}
                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Limpiar Formulario
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? 'Guardando...' : 'Guardar Operación'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}