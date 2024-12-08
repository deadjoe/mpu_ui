import { cn } from '@/lib/utils'

type StatusType = 'healthy' | 'warning' | 'error'

interface DataCenterStatusProps {
  name: string
  status: StatusType
}

interface StatusIndicatorProps {
  status: StatusType
}

const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  const baseClasses = "w-3 h-3 rounded-full inline-block mr-2"
  const statusClasses = {
    healthy: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]",
    warning: "bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.6)]",
    error: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
  }

  return (
    <span 
      className={cn(
        baseClasses,
        statusClasses[status]
      )}
    />
  )
}

const DataCenterStatus = ({ name, status }: DataCenterStatusProps) => {
  const statusText = {
    healthy: "Operational",
    warning: "Degraded",
    error: "Outage"
  }

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <StatusIndicator status={status} />
        <span className="text-sm font-medium">{name}</span>
      </div>
      <span className={cn(
        "text-xs px-2 py-1 rounded-full",
        {
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400": status === "healthy",
          "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400": status === "warning",
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400": status === "error"
        }
      )}>
        {statusText[status]}
      </span>
    </div>
  )
}

export default function SystemStatus() {
  const dataCenters = [
    { name: "US-West DC", status: "healthy" as StatusType },
    { name: "EU-Central DC", status: "warning" as StatusType },
    { name: "Asia-East DC", status: "error" as StatusType }
  ]

  return (
    <div className="space-y-1">
      {dataCenters.map((dc) => (
        <DataCenterStatus
          key={dc.name}
          name={dc.name}
          status={dc.status}
        />
      ))}
    </div>
  )
}
