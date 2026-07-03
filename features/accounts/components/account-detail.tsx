import { CalendarClockIcon, CircleDollarSignIcon, HistoryIcon, KeyRoundIcon } from "lucide-react"

import { AccountStatusBadge } from "@/features/accounts/components/account-status-badge"
import { AccountTypeBadge } from "@/features/accounts/components/account-type-badge"
import type { AccountTableRow } from "@/features/accounts/utils/account-view-models"
import { Progress } from "@/shared/components/ui/progress"
import { Separator } from "@/shared/components/ui/separator"
import { formatCurrency, formatDate, formatPercentage } from "@/shared/utils"

type AccountDetailProps = {
    account: AccountTableRow | null
}

export function AccountDetail({ account }: AccountDetailProps) {
    if (!account) {
        return <p className="text-sm text-muted-foreground">Select an account to review its configuration.</p>
    }

    const metadata = [
        {
            icon: KeyRoundIcon,
            label: "Account ID",
            value: account.id,
        },
        {
            icon: CalendarClockIcon,
            label: "Last updated",
            value: formatDate(account.updatedAt, { dateStyle: "medium", timeStyle: "short" }),
        },
        {
            icon: HistoryIcon,
            label: "Opening balance",
            value: formatCurrency(account.openingBalance, { currency: account.currency }),
        },
        {
            icon: CircleDollarSignIcon,
            label: "Balance movement",
            value: formatCurrency(account.balanceDelta, { currency: account.currency }),
        },
    ]

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 rounded-3xl border border-border/70 bg-muted/20 p-4">
                <div className="flex flex-wrap items-center gap-2">
                    <AccountTypeBadge type={account.type} />
                    <AccountStatusBadge status={account.status} />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Current balance</p>
                    <p className="mt-1 font-mono text-2xl font-semibold">
                        {formatCurrency(account.currentBalance, { currency: account.currency })}
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-muted-foreground">Share of visible balance</span>
                        <span className="font-mono">{formatPercentage(account.balanceWeightPercentage / 100)}</span>
                    </div>
                    <Progress value={account.balanceWeightPercentage} />
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                {metadata.map((item) => {
                    const Icon = item.icon

                    return (
                        <div className="rounded-3xl border border-border/70 bg-card p-4" key={item.label}>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Icon aria-hidden="true" />
                                {item.label}
                            </div>
                            <p className="mt-2 truncate font-mono text-sm font-medium">{item.value}</p>
                        </div>
                    )
                })}
            </div>

            <Separator />

            <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                    <p className="text-muted-foreground">Institution</p>
                    <p className="mt-1 font-medium">{account.displayInstitutionName}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Masked number</p>
                    <p className="mt-1 font-mono font-medium">{account.displayMaskedNumber}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Currency</p>
                    <p className="mt-1 font-mono font-medium">{account.currency}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Archived at</p>
                    <p className="mt-1 font-medium">
                        {account.archivedAt ? formatDate(account.archivedAt, { dateStyle: "medium" }) : "Not archived"}
                    </p>
                </div>
            </div>
        </div>
    )
}
