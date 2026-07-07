"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRightIcon, LoaderCircleIcon } from "lucide-react"

import { AuthDemoAlert } from "@/features/auth/components/auth-demo-alert"
import { Button } from "@/shared/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"

export function ForgotPasswordForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)
        setMessage("Password reset delivery is not connected yet. This flow is ready for the email provider.")
        window.setTimeout(() => setIsSubmitting(false), 700)
    }

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {message ? <AuthDemoAlert message={message} title="Recovery flow prepared" /> : null}
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="reset-email">Workspace email</FieldLabel>
                    <Input
                        autoComplete="email"
                        id="reset-email"
                        name="email"
                        placeholder="finance.lead@acme.co"
                        required
                        type="email"
                    />
                    <FieldDescription>
                        Enter the email used for approvals, exports, and workspace audit records.
                    </FieldDescription>
                </Field>
            </FieldGroup>
            <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                    <LoaderCircleIcon aria-hidden="true" className="animate-spin" data-icon="inline-start" />
                ) : null}
                {isSubmitting ? "Preparing reset" : "Send reset instructions"}
                {!isSubmitting ? <ArrowRightIcon aria-hidden="true" data-icon="inline-end" /> : null}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
                No workspace yet?{" "}
                <Link className="font-medium text-foreground underline underline-offset-4" href="/register">
                    Create one
                </Link>
                .
            </p>
        </form>
    )
}
