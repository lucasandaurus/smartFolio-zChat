'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface EvolutionChartProps {
  data: Array<{
    date: string
    value: number
  }>
  title: string
  color?: string
}

export function EvolutionChart({ data, title, color = '#8884d8' }: EvolutionChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })
            }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={formatCurrency}
          />
          <Tooltip 
            formatter={(value: number) => [formatCurrency(value), title]}
            labelFormatter={(label) => {
              const date = new Date(label)
              return date.toLocaleDateString('es-AR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}