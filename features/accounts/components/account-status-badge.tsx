import { ArchiveIcon, CheckCircle2Icon } from "lucide-react"

import type { AccountStatus } from "@/features/accounts"
import { getAccountStatusOption } from "@/features/accounts/constants/account-options"
import { Badge } from "@/shared/components/ui/badge"

type AccountStatusBadgeProps = {
    status: AccountStatus
}

export function AccountStatusBadge({ status }: AccountStatusBadgeProps) {
    const option = getAccountStatusOption(status)
    const Icon = status === "active" ? CheckCircle2Icon : ArchiveIcon

    return (
        <Badge variant={status === "active" ? "secondary" : "outline"}>
            <Icon aria-hidden="true" data-icon="inline-start" />
            {option.label}
        </Badge>
    )
}
