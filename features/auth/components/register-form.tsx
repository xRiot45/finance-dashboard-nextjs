"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRightIcon, LoaderCircleIcon } from "lucide-react"

import { AuthDemoAlert } from "@/features/auth/components/auth-demo-alert"
import { Button } from "@/shared/components/ui/button"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"

export function RegisterForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)
        setMessage("Registration action is not connected yet. The workspace onboarding UI is ready for auth wiring.")
        window.setTimeout(() => setIsSubmitting(false), 700)
    }

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {message ? <AuthDemoAlert message={message} title="Workspace registration prepared" /> : null}
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="register-name">Full name</FieldLabel>
                    <Input autoComplete="name" id="register-name" name="name" placeholder="Ari Finance" required />
                    <FieldDescription>This name appears in approvals and audit records.</FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="register-email">Work email</FieldLabel>
                    <Input
                        autoComplete="email"
                        id="register-email"
                        name="email"
                        placeholder="ari@company.co"
                        required
                        type="email"
                    />
                    <FieldDescription>Use an address owned by the finance workspace.</FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="register-workspace">Workspace name</FieldLabel>
                    <Input id="register-workspace" name="workspace" placeholder="Acme Finance" required />
                    <FieldDescription>Your first workspace scopes accounts, budgets, and reports.</FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="register-password">Password</FieldLabel>
                    <Input
                        autoComplete="new-password"
                        id="register-password"
                        minLength={8}
                        name="password"
                        placeholder="Create a strong password"
                        required
                        type="password"
                    />
                    <FieldDescription>Use at least 8 characters before connecting a real auth policy.</FieldDescription>
                </Field>
                <Field orientation="horizontal">
                    <Checkbox id="register-terms" name="terms" required />
                    <FieldContent>
                        <FieldLabel htmlFor="register-terms">I understand this is a UI-only auth preview</FieldLabel>
                        <FieldDescription>
                            Real account creation, terms, and session handling will be connected later.{" "}
                            <Link className="underline underline-offset-4" href="/login">
                                Return to login
                            </Link>
                            .
                        </FieldDescription>
                    </FieldContent>
                </Field>
            </FieldGroup>
            <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                    <LoaderCircleIcon aria-hidden="true" className="animate-spin" data-icon="inline-start" />
                ) : null}
                {isSubmitting ? "Preparing workspace" : "Create workspace"}
                {!isSubmitting ? <ArrowRightIcon aria-hidden="true" data-icon="inline-end" /> : null}
            </Button>
        </form>
    )
}
