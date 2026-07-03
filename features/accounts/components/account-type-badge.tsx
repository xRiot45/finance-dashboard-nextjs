import type { AccountType } from "@/features/accounts"
import { getAccountTypeOption } from "@/features/accounts/constants/account-options"
import { Badge } from "@/shared/components/ui/badge"

type AccountTypeBadgeProps = {
    type: AccountType
}

export function AccountTypeBadge({ type }: AccountTypeBadgeProps) {
    const option = getAccountTypeOption(type)
    const Icon = option.icon

    return (
        <Badge variant="outline">
            <Icon aria-hidden="true" data-icon="inline-start" />
            {option.label}
        </Badge>
    )
}
