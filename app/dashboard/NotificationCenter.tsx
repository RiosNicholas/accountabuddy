import { Card, CardContent, CardTitle, } from "@/components/ui/card"

interface Notification {
  id: number;
  message: string;
}

interface NotificationCenterProps {
  notifications: Notification[];
}

export default function NotificationCenter({ notifications }: NotificationCenterProps) {
  return (
    <Card>
      <CardTitle className="text-xl font-extrabold p-3">Notification Center</CardTitle>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="flex justify-center font-light items-center px-3 py-6 text-muted-foreground">
            No notifications to show.
          </div>
        ) : (
          <div className="grid">
            {/* TODO: Implement notification center */}
          </div>
        )}
      </CardContent>
    </Card>
  )
}