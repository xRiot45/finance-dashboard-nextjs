import Link from "next/link"

import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import {
    formatCurrency,
    formatDate,
    formatTransactionStatus,
    formatTransactionType,
    getStatusBadgeVariant,
} from "@/shared/utils"
import type { RecentTransaction } from "@/features/dashboard/data/dashboard-overview.data"

type DashboardRecentTransactionsProps = {
    transactions: RecentTransaction[]
}

export function DashboardRecentTransactions({ transactions }: DashboardRecentTransactionsProps) {
    return (
        <Card className="border-border/70 bg-card/95 shadow-xs">
            <CardHeader>
                <div>
                    <CardTitle>Recent transactions</CardTitle>
                    <CardDescription>Latest activity in the active workspace.</CardDescription>
                </div>
                <CardAction>
                    <Button asChild size="sm" variant="outline">
                        <Link href="/transactions">View all</Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="hidden md:table-cell">Account</TableHead>
                            <TableHead className="hidden lg:table-cell">Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => {
                            const isExpense = transaction.type === "expense"

                            return (
                                <TableRow key={transaction.id}>
                                    <TableCell className="text-muted-foreground">
                                        {formatDate(transaction.date, {
                                            dateStyle: "medium",
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex min-w-48 flex-col gap-1">
                                            <span className="truncate font-medium">{transaction.description}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {formatTransactionType(transaction.type)} / {transaction.categoryName}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden text-muted-foreground md:table-cell">
                                        {transaction.accountName}
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <Badge variant={getStatusBadgeVariant(transaction.status)}>
                                            {formatTransactionStatus(transaction.status)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-mono font-medium">
                                        {isExpense ? "-" : ""}
                                        {formatCurrency(transaction.amount, {
                                            currency: transaction.currency,
                                        })}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
