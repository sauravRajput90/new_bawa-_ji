export function RecentActivities() {
  const activities = [
    { activity: "Prescription Refilled", date: "April 2, 2025", time: "09:15 AM" },
    { activity: "Lab Results Updated", date: "March 28, 2025", time: "11:30 AM" },
    { activity: "Appointment Rescheduled", date: "March 25, 2025", time: "02:45 PM" },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start">
          <div className="w-2 h-2 mt-2 rounded-full bg-cyan-600 mr-3"></div>
          <div className="flex-1">
            <p className="font-medium">{activity.activity}</p>
            <p className="text-sm text-gray-500">
              {activity.date} at {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
