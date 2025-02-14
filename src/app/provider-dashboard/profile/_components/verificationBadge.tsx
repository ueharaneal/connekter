"use client"

import { Shield, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface VerificationBadgeProps {
  isVerified: boolean
  className?: string
}

export default function VerificationBadge({ isVerified, className }: VerificationBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 py-4 rounded-lg bg-background/5 dark transition-colors duration-300",
        className,
      )}
    >
      <Badge
        variant="outline"
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-all duration-300",
          isVerified
            ? "bg-primary/10 text-primary border-primary/20"
            : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        )}
      >
        {isVerified ? (
          <ShieldCheck className="h-4 w-4 transition-transform duration-300" />
        ) : (
          <Shield className="h-4 w-4 transition-transform duration-300" />
        )}
        {isVerified ? "Verified Provider" : "Pending Verification"}
      </Badge>
      <p className="text-sm text-muted-foreground">
        {isVerified
          ? "Adult Family Home Care provider has been verified."
          : "Adult Family Home Care provider verification is in progress."}
      </p>
    </div>
  )
}

