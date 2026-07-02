import { ArrowDownLeftIcon, ArrowRightLeftIcon, ArrowUpRightIcon, FilePenLineIcon } from "lucide-react"

import { Badge } from "@/shared/components/ui/badge"
import { cn } from "@/shared/lib/utils"
import { formatTransactionType, type TransactionType } from "@/shared/utils"

const transactionTypeConfig: Record<
    TransactionType,
    {
        className: string
        icon: typeof ArrowDownLeftIcon
    }
> = {
    adjustment: {
        className: "bg-warning-soft text-warning-foreground",
        icon: FilePenLineIcon,
    },
    expense: {
        className: "bg-destructive/10 text-destructive",
        icon: ArrowUpRightIcon,
    },
    income: {
        className: "bg-success-soft text-success-foreground",
        icon: ArrowDownLeftIcon,
    },
    transfer: {
        className: "bg-secondary text-secondary-foreground",
        icon: ArrowRightLeftIcon,
    },
}

type TransactionTypeBadgeProps = {
    type: TransactionType
}

export function TransactionTypeBadge({ type }: TransactionTypeBadgeProps) {
    const config = transactionTypeConfig[type]
    const Icon = config.icon

    return (
        <Badge className={cn("border-transparent", config.className)} variant="secondary">
            <Icon aria-hidden="true" data-icon="inline-start" />
            {formatTransactionType(type)}
        </Badge>
    )
}
