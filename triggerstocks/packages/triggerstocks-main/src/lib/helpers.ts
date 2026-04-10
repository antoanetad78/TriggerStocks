import { TriggerStatus, TriggerType } from '../types'

export function statusLabel(status: TriggerStatus): string {
  const map: Record<TriggerStatus, string> = {
    on_time: 'On Time',
    delayed: 'Delayed',
    cancelled: 'Cancelled',
    triggered: 'Triggered',
  }
  return map[status]
}

export function statusColors(status: TriggerStatus): string {
  const map: Record<TriggerStatus, string> = {
    on_time: 'text-green-400 bg-green-400/10 border-green-400/20',
    delayed: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    cancelled: 'text-red-400 bg-red-400/10 border-red-400/20',
    triggered: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  }
  return map[status]
}

export function typeLabel(type: TriggerType): string {
  return type === 'expected_update' ? 'Update' : 'Expected'
}

export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-SE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}
