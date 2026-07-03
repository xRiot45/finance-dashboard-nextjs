import {
    ArrowRightLeftIcon,
    BriefcaseBusinessIcon,
    LaptopIcon,
    MegaphoneIcon,
    PackageIcon,
    PlaneIcon,
    ReceiptIcon,
    RepeatIcon,
    TagsIcon,
    TrendingUpIcon,
    UsersIcon,
    type LucideProps,
} from "lucide-react"

type CategoryIconProps = LucideProps & {
    name: string
}

export function CategoryIcon({ name, ...props }: CategoryIconProps) {
    switch (name) {
        case "TrendingUp":
            return <TrendingUpIcon {...props} />
        case "Repeat":
            return <RepeatIcon {...props} />
        case "BriefcaseBusiness":
            return <BriefcaseBusinessIcon {...props} />
        case "Users":
            return <UsersIcon {...props} />
        case "Megaphone":
            return <MegaphoneIcon {...props} />
        case "Package":
            return <PackageIcon {...props} />
        case "Laptop":
            return <LaptopIcon {...props} />
        case "Plane":
            return <PlaneIcon {...props} />
        case "Receipt":
            return <ReceiptIcon {...props} />
        case "ArrowRightLeft":
            return <ArrowRightLeftIcon {...props} />
        default:
            return <TagsIcon {...props} />
    }
}
