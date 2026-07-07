import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert"

type AuthDemoAlertProps = {
    message: string
    title: string
    variant?: "default" | "destructive"
}

export function AuthDemoAlert({ message, title, variant = "default" }: AuthDemoAlertProps) {
    const Icon = variant === "destructive" ? AlertCircleIcon : CheckCircle2Icon

    return (
        <Alert variant={variant}>
            <Icon aria-hidden="true" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
