'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, DollarSign, Clock, BarChart, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Feature {
  name: string
  description: string
}

interface ProjectProposalProps {
  message: {
    features: Feature[]
    estimatedCost: string
    estimatedTime: string
    complexity: 'low' | 'medium' | 'high'
  }
}

export function ProjectProposal({ message }: ProjectProposalProps) {
  const { features, estimatedCost, estimatedTime, complexity } = message

  const complexityColors = {
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950 shadow-md my-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-zinc-50 dark:bg-zinc-900 p-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
             Project Proposal
          </h3>
          <Badge className={cn('capitalize px-3 py-1', complexityColors[complexity])}>
            {complexity} Complexity
          </Badge>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Based on our initial consultation, here is the proposed blueprint for your project.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 divide-x divide-zinc-200 dark:divide-zinc-800 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="p-4 flex flex-col items-center justify-center gap-1 text-center">
          <DollarSign className="w-5 h-5 text-emerald-500" />
          <span className="text-xs text-zinc-500 uppercase font-medium">Estimate</span>
          <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{estimatedCost}</span>
        </div>
        <div className="p-4 flex flex-col items-center justify-center gap-1 text-center">
          <Clock className="w-5 h-5 text-blue-500" />
          <span className="text-xs text-zinc-500 uppercase font-medium">Timeline</span>
          <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{estimatedTime}</span>
        </div>
        <div className="p-4 flex flex-col items-center justify-center gap-1 text-center">
          <BarChart className="w-5 h-5 text-amber-500" />
          <span className="text-xs text-zinc-500 uppercase font-medium">Deliverables</span>
          <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{features.length} Features</span>
        </div>
      </div>

      {/* Features List */}
      <div className="p-6">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-4 uppercase tracking-wider">
          Included Features
        </h4>
        <div className="space-y-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex gap-4 group">
              <div className="mt-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors">
                  {feature.name}
                </h5>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="p-4 bg-zinc-50 dark:bg-zinc-900 flex flex-col gap-2 border-t border-zinc-200 dark:border-zinc-800">
        <Button 
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
          onClick={() => {
            // This will trigger the Decision Modal via state (implemented next)
            window.dispatchEvent(new CustomEvent('nosh-trigger-decision-modal', { 
                detail: { 
                    proposal: message 
                } 
            }))
          }}
        >
          Approve Project & Move to Next Steps
        </Button>
        <p className="text-[10px] text-zinc-400 text-center px-4 italic">
          By clicking approve, you'll be able to generate a functional AI prototype or book a direct call with development.
        </p>
      </div>
    </div>
  )
}
