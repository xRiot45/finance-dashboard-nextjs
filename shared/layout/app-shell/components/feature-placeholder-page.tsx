import { Badge } from "@/shared/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"

type FeaturePlaceholderPageProps = {
    title: string
    description: string
    status: string
}

export function FeaturePlaceholderPage({ title, description, status }: FeaturePlaceholderPageProps) {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <h1 className="text-page-title font-semibold">{title}</h1>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <Badge variant="secondary" className="w-fit">
                    {status}
                </Badge>
            </div>

            <Card className="border-border/70 bg-card/95 shadow-xs">
                <CardHeader>
                    <CardTitle>{title} workspace</CardTitle>
                    <CardDescription>
                        This route is wired into the app shell. The feature implementation will fill this surface.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex min-h-80 items-center justify-center rounded-3xl border border-dashed border-border/80 bg-muted/40 px-4 text-center text-sm text-muted-foreground">
                        <span className="max-w-md">
                            Empty, loading, error, and data states will be added with the module implementation.
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
