import type { UIMessageStreamWriter, UIMessage } from 'ai'
import type { DataPart } from '../messages/data-parts'
import { tool } from 'ai'
import z from 'zod/v3'
import { calculateProjectCost } from '@/lib/cost-calculator'

interface Params {
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>
}

export const generateProjectProposal = ({ writer }: Params) =>
  tool({
    description: 'Generates a project proposal with a detailed list of features, estimated cost, and timeline based on client requirements. Use this after consultation is complete.',
    inputSchema: z.object({
      features: z.array(z.object({
        name: z.string().describe('Short name of the feature (e.g. "User Authentication")'),
        description: z.string().describe('Detailed description of what the feature covers.')
      })).describe('List of features to include in the proposal.')
    }),
    execute: async ({ features }, { toolCallId }) => {
      const estimate = calculateProjectCost(features)

      writer.write({
        id: toolCallId,
        type: 'data-project-proposal' as any,
        data: {
          features,
          estimatedCost: estimate.amount,
          estimatedTime: estimate.time,
          complexity: estimate.complexity,
        },
      })

      return (
        `Project Proposal Generated Successfully.` +
        `\nCost Estimate: ${estimate.amount}` +
        `\nTimeline: ${estimate.time}` +
        `\nComplexity: ${estimate.complexity}` +
        `\nPlease wait for the customer to review the proposal card in the chat.`
      )
    },
  })
