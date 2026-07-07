"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRightIcon, LoaderCircleIcon } from "lucide-react"

import { AuthDemoAlert } from "@/features/auth/components/auth-demo-alert"
import { Button } from "@/shared/components/ui/button"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"

export function LoginForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)
        setMessage("Auth provider is not connected yet. This screen is ready for the real login action.")
        window.setTimeout(() => setIsSubmitting(false), 700)
    }

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {message ? <AuthDemoAlert message={message} title="Login flow prepared" /> : null}
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="login-email">Email address</FieldLabel>
                    <Input
                        autoComplete="email"
                        id="login-email"
                        name="email"
                        placeholder="finance.lead@acme.co"
                        required
                        type="email"
                    />
                    <FieldDescription>Use the email attached to your finance workspace.</FieldDescription>
                </Field>
                <Field>
                    <div className="flex items-center justify-between gap-3">
                        <FieldLabel htmlFor="login-password">Password</FieldLabel>
                        <Link className="text-xs font-medium underline underline-offset-4" href="/forgot-password">
                            Forgot password?
                        </Link>
                    </div>
                    <Input
                        autoComplete="current-password"
                        id="login-password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        type="password"
                    />
                    <FieldDescription>
                        Passwords protect reports, approvals, and audit-visible changes.
                    </FieldDescription>
                </Field>
                <Field orientation="horizontal">
                    <Checkbox id="remember-session" name="remember" />
                    <FieldContent>
                        <FieldLabel htmlFor="remember-session">Remember this device</FieldLabel>
                        <FieldDescription>Use only on trusted devices managed by your organization.</FieldDescription>
                    </FieldContent>
                </Field>
            </FieldGroup>
            <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                    <LoaderCircleIcon aria-hidden="true" className="animate-spin" data-icon="inline-start" />
                ) : null}
                {isSubmitting ? "Checking workspace" : "Sign in"}
                {!isSubmitting ? <ArrowRightIcon aria-hidden="true" data-icon="inline-end" /> : null}
            </Button>
        </form>
    )
}
