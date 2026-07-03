import {
    BanknoteIcon,
    CreditCardIcon,
    LandmarkIcon,
    PiggyBankIcon,
    SmartphoneIcon,
    type LucideIcon,
} from "lucide-react"

import type { AccountStatus, AccountType } from "@/features/accounts"

export type AccountTypeOption = {
    description: string
    icon: LucideIcon
    label: string
    value: AccountType
}

export type AccountStatusOption = {
    description: string
    label: string
    value: AccountStatus
}

export const ACCOUNT_TYPE_OPTIONS: AccountTypeOption[] = [
    {
        description: "Bank rekening operasional, payroll, atau escrow.",
        icon: LandmarkIcon,
        label: "Bank",
        value: "bank",
    },
    {
        description: "Kas kecil, petty cash, atau uang fisik kantor.",
        icon: BanknoteIcon,
        label: "Cash",
        value: "cash",
    },
    {
        description: "E-wallet, payment gateway wallet, atau sales wallet.",
        icon: SmartphoneIcon,
        label: "Wallet",
        value: "wallet",
    },
    {
        description: "Kartu kredit perusahaan atau spending card.",
        icon: CreditCardIcon,
        label: "Credit card",
        value: "credit_card",
    },
    {
        description: "Deposito, portfolio, atau instrumen investasi.",
        icon: PiggyBankIcon,
        label: "Investment",
        value: "investment",
    },
]

export const ACCOUNT_STATUS_OPTIONS: AccountStatusOption[] = [
    {
        description: "Available for new transactions and transfer routing.",
        label: "Active",
        value: "active",
    },
    {
        description: "Retained for historical reporting, hidden from defaults.",
        label: "Archived",
        value: "archived",
    },
]

export const ACCOUNT_VISIBILITY_OPTIONS = [
    {
        label: "All accounts",
        value: "all",
    },
    {
        label: "Active only",
        value: "active",
    },
    {
        label: "Archived only",
        value: "archived",
    },
] as const

export const ACCOUNT_PAGE_SIZE = 6

export function getAccountTypeOption(type: AccountType) {
    return ACCOUNT_TYPE_OPTIONS.find((option) => option.value === type) ?? ACCOUNT_TYPE_OPTIONS[0]
}

export function getAccountStatusOption(status: AccountStatus) {
    return ACCOUNT_STATUS_OPTIONS.find((option) => option.value === status) ?? ACCOUNT_STATUS_OPTIONS[0]
}
