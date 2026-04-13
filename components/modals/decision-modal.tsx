'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { create } from 'zustand'
import { Rocket, PhoneCall, Calendar, X, Sparkles, MessageSquare } from 'lucide-react'
import { useChat } from '@/lib/chat-context'

interface State {
  open: boolean
  proposal: any | null
  setOpen: (open: boolean) => void
  setProposal: (proposal: any) => void
}

export const useDecisionStore = create<State>((set) => ({
  open: false,
  proposal: null,
  setOpen: (open) => set({ open }),
  setProposal: (proposal) => set({ proposal }),
}))

export function DecisionModal() {
  const { open, setOpen, proposal, setProposal } = useDecisionStore()
  const { append } = useChat()

  useEffect(() => {
    const handleTrigger = (e: any) => {
      setProposal(e.detail.proposal)
      setOpen(true)
    }
    window.addEventListener('nosh-trigger-decision-modal', handleTrigger)
    return () => window.removeEventListener('nosh-trigger-decision-modal', handleTrigger)
  }, [setOpen, setProposal])

  if (!open) return null

  const handleBuildSample = () => {
    append({
      role: 'user',
      content: 'Proposal approved! Please build a functional AI sample of this project now.',
    })
    setOpen(false)
  }

  const handleBookCall = () => {
    // This would eventually trigger the WhatsApp/Booking flow
    // For now, we'll just acknowledge it in chat
    append({
      role: 'user',
      content: 'I want to book a direct call with a developer to discuss this proposal further.',
    })
    setOpen(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={() => setOpen(false)}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white dark:bg-zinc-950 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 fade-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              Proposal Approved!
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Fantastic choice. How would you like to proceed with your project blueprint?
            </p>
          </div>

          <div className="grid gap-4">
            {/* Option 1: AI Sample */}
            <button 
              onClick={handleBuildSample}
              className="flex items-start gap-4 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all group text-left"
            >
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg group-hover:scale-110 transition-transform">
                <Rocket className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-50">Generate AI Sample</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Our trained AI will jump in and build a functional prototype based on this proposal.
                </p>
              </div>
            </button>

            {/* Option 2: Talk to Developer */}
            <button 
              onClick={handleBookCall}
              className="flex items-start gap-4 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all group text-left"
            >
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                <PhoneCall className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-50">Talk to Developer</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Request an instant voice call or book a meeting to discuss full-scale production.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4 text-zinc-400" />
            <span className="text-xs text-zinc-400 font-medium">
                You can also continue chatting with the AI about refinements.
            </span>
        </div>
      </div>
    </div>
  )
}
