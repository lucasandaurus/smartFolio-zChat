import ZAI from 'z-ai-web-dev-sdk';

export interface PortfolioData {
  totalValue: number;
  investedValue: number;
  assets: Array<{
    ticker: string;
    name: string;
    sector: string;
    assetType: string;
    quantity: number;
    currentPrice: number;
    avgPrice: number;
    dailyChange: number;
  }>;
}

export interface AIAnalysis {
  portfolioHealth: {
    score: number;
    diversification: number;
    riskLevel: string;
    performance: number;
  };
  alerts: Array<{
    type: 'warning' | 'opportunity' | 'risk';
    title: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
    suggestedAction: string;
  }>;
  insights: Array<{
    category: string;
    title: string;
    description: string;
    impact: 'positive' | 'neutral' | 'negative';
  }>;
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    expectedImpact: string;
    timeframe: string;
  }>;
  marketAnalysis: {
    trend: string;
    keyFactors: string[];
    outlook: string;
  };
}

export class AIAnalysisService {
  private static instance: AIAnalysisService;

  static getInstance(): AIAnalysisService {
    if (!AIAnalysisService.instance) {
      AIAnalysisService.instance = new AIAnalysisService();
    }
    return AIAnalysisService.instance;
  }

  async analyzePortfolio(portfolioData: PortfolioData): Promise<AIAnalysis> {
    try {
      const zai = await ZAI.create();
      
      // Construir el prompt para el análisis
      const prompt = this.buildAnalysisPrompt(portfolioData);
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `Eres un asesor financiero experto especializado en mercados argentinos. 
            Analiza portfolios de inversión y proporciona recomendaciones personalizadas basadas en:
            - Análisis de riesgo y diversificación
            - Tendencias del mercado actual
            - Perfil de inversor conservador/moderado
            - Contexto económico de Argentina
            
            Responde en formato JSON estructurado con las siguientes claves:
            - portfolioHealth (con score, diversification, riskLevel, performance)
            - alerts (array de alertas con type, title, description, severity, suggestedAction)
            - insights (array de insights con category, title, description, impact)
            - recommendations (array de recomendaciones con priority, title, description, expectedImpact, timeframe)
            - marketAnalysis (con trend, keyFactors, outlook)`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const analysisText = completion.choices[0]?.message?.content;
      
      if (!analysisText) {
        throw new Error('No se recibió respuesta del modelo de IA');
      }

      // Intentar parsear la respuesta como JSON
      try {
        const analysis = JSON.parse(analysisText);
        return this.validateAndNormalizeAnalysis(analysis);
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        // Si no se puede parsear, devolver análisis por defecto
        return this.getDefaultAnalysis();
      }
    } catch (error) {
      console.error('Error in AI analysis:', error);
      return this.getDefaultAnalysis();
    }
  }

  private buildAnalysisPrompt(portfolioData: PortfolioData): string {
    const totalReturn = ((portfolioData.totalValue - portfolioData.investedValue) / portfolioData.investedValue) * 100;
    
    // Analizar distribución por sector
    const sectorDistribution = this.calculateSectorDistribution(portfolioData.assets);
    
    // Analizar distribución por tipo de activo
    const assetTypeDistribution = this.calculateAssetTypeDistribution(portfolioData.assets);
    
    // Identificar activos con mejor y peor rendimiento
    const topPerformers = portfolioData.assets
      .sort((a, b) => ((b.currentPrice - b.avgPrice) / b.avgPrice) - ((a.currentPrice - a.avgPrice) / a.avgPrice))
      .slice(0, 3);
    
    const worstPerformers = portfolioData.assets
      .sort((a, b) => ((a.currentPrice - a.avgPrice) / a.avgPrice) - ((b.currentPrice - b.avgPrice) / b.avgPrice))
      .slice(0, 3);

    return `
Por favor, analiza el siguiente portfolio de inversión:

RESUMEN DEL PORTFOLIO:
- Valor total: $${portfolioData.totalValue.toLocaleString('es-AR')}
- Valor invertido: $${portfolioData.investedValue.toLocaleString('es-AR')}
- Retorno total: ${totalReturn.toFixed(2)}%
- Número de activos: ${portfolioData.assets.length}

DISTRIBUCIÓN POR SECTOR:
${Object.entries(sectorDistribution).map(([sector, percentage]) => 
  `- ${sector}: ${percentage.toFixed(1)}%`
).join('\n')}

DISTRIBUCIÓN POR TIPO DE ACTIVO:
${Object.entries(assetTypeDistribution).map(([type, percentage]) => 
  `- ${type}: ${percentage.toFixed(1)}%`
).join('\n')}

TOP PERFORMERS:
${topPerformers.map(asset => 
  `- ${asset.ticker} (${asset.name}): ${((asset.currentPrice - asset.avgPrice) / asset.avgPrice * 100).toFixed(2)}%`
).join('\n')}

PEORES PERFORMERS:
${worstPerformers.map(asset => 
  `- ${asset.ticker} (${asset.name}): ${((asset.currentPrice - asset.avgPrice) / asset.avgPrice * 100).toFixed(2)}%`
).join('\n')}

ACTIVOS CON MAYOR VOLATILIDAD (variación diaria):
${portfolioData.assets
  .sort((a, b) => Math.abs(b.dailyChange) - Math.abs(a.dailyChange))
  .slice(0, 3)
  .map(asset => `- ${asset.ticker}: ${asset.dailyChange.toFixed(2)}%`)
  .join('\n')}

Por favor, proporciona un análisis completo considerando el contexto actual del mercado argentino,
incluyendo inflación, tipos de cambio, y tendencias sectoriales. Enfócate en riesgos específicos
del mercado local y oportunidades disponibles.
    `;
  }

  private calculateSectorDistribution(assets: PortfolioData['assets']): Record<string, number> {
    const distribution: Record<string, number> = {};
    const totalValue = assets.reduce((sum, asset) => sum + (asset.quantity * asset.currentPrice), 0);
    
    assets.forEach(asset => {
      const assetValue = asset.quantity * asset.currentPrice;
      const percentage = (assetValue / totalValue) * 100;
      distribution[asset.sector] = (distribution[asset.sector] || 0) + percentage;
    });
    
    return distribution;
  }

  private calculateAssetTypeDistribution(assets: PortfolioData['assets']): Record<string, number> {
    const distribution: Record<string, number> = {};
    const totalValue = assets.reduce((sum, asset) => sum + (asset.quantity * asset.currentPrice), 0);
    
    assets.forEach(asset => {
      const assetValue = asset.quantity * asset.currentPrice;
      const percentage = (assetValue / totalValue) * 100;
      distribution[asset.assetType] = (distribution[asset.assetType] || 0) + percentage;
    });
    
    return distribution;
  }

  private validateAndNormalizeAnalysis(analysis: any): AIAnalysis {
    // Validar y asegurar que todos los campos necesarios existan
    return {
      portfolioHealth: {
        score: Math.min(100, Math.max(0, analysis.portfolioHealth?.score || 75)),
        diversification: Math.min(100, Math.max(0, analysis.portfolioHealth?.diversification || 70)),
        riskLevel: analysis.portfolioHealth?.riskLevel || 'Moderado',
        performance: Math.min(100, Math.max(0, analysis.portfolioHealth?.performance || 80))
      },
      alerts: Array.isArray(analysis.alerts) ? analysis.alerts.slice(0, 5) : this.getDefaultAlerts(),
      insights: Array.isArray(analysis.insights) ? analysis.insights.slice(0, 5) : this.getDefaultInsights(),
      recommendations: Array.isArray(analysis.recommendations) ? analysis.recommendations.slice(0, 5) : this.getDefaultRecommendations(),
      marketAnalysis: {
        trend: analysis.marketAnalysis?.trend || 'neutral',
        keyFactors: Array.isArray(analysis.marketAnalysis?.keyFactors) 
          ? analysis.marketAnalysis.keyFactors.slice(0, 4) 
          : ['Estabilidad económica', 'Tasas de interés', 'Inflación', 'Mercado global'],
        outlook: analysis.marketAnalysis?.outlook || 'neutral'
      }
    };
  }

  private getDefaultAnalysis(): AIAnalysis {
    return {
      portfolioHealth: {
        score: 75,
        diversification: 70,
        riskLevel: 'Moderado',
        performance: 80
      },
      alerts: this.getDefaultAlerts(),
      insights: this.getDefaultInsights(),
      recommendations: this.getDefaultRecommendations(),
      marketAnalysis: {
        trend: 'neutral',
        keyFactors: ['Estabilidad económica', 'Tasas de interés', 'Inflación', 'Mercado global'],
        outlook: 'neutral'
      }
    };
  }

  private getDefaultAlerts() {
    return [
      {
        type: 'warning' as const,
        title: 'Mantente informado',
        description: 'Revisa regularmente el rendimiento de tu portfolio.',
        severity: 'medium' as const,
        suggestedAction: 'Establecer alertas de precio para activos clave'
      }
    ];
  }

  private getDefaultInsights() {
    return [
      {
        category: 'General',
        title: 'Portfolio balanceado',
        description: 'Tu portfolio muestra una diversificación razonable.',
        impact: 'neutral' as const
      }
    ];
  }

  private getDefaultRecommendations() {
    return [
      {
        priority: 'medium' as const,
        title: 'Revisión periódica',
        description: 'Considera revisar tu portfolio trimestralmente.',
        expectedImpact: 'Mejora del rendimiento a largo plazo',
        timeframe: '3 meses'
      }
    ];
  }
}