import { Badge } from "@/shared/components/ui/badge"
import { formatTransactionStatus, getStatusBadgeVariant, type TransactionStatus } from "@/shared/utils"
import { cn } from "@/shared/lib/utils"

const transactionStatusClassNames: Record<TransactionStatus, string> = {
    approved: "bg-success-soft text-success-foreground",
    draft: "bg-muted text-muted-foreground",
    pending: "bg-warning-soft text-warning-foreground",
    rejected: "bg-destructive/10 text-destructive",
    void: "bg-secondary text-secondary-foreground",
}

type TransactionStatusBadgeProps = {
    status: TransactionStatus
}

export function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
    return (
        <Badge
            variant={getStatusBadgeVariant(status)}
            className={cn("border-transparent", transactionStatusClassNames[status])}
        >
            {formatTransactionStatus(status)}
        </Badge>
    )
}
