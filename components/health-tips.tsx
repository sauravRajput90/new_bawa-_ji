export function HealthTips() {
  const tips = [
    "Stay hydrated by drinking at least 8 glasses of water daily.",
    "Aim for 30 minutes of moderate exercise most days of the week.",
    "Include a variety of fruits and vegetables in your daily diet.",
  ]

  return (
    <div className="space-y-4">
      {tips.map((tip, index) => (
        <div key={index} className="flex items-start">
          <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mr-3 flex-shrink-0">
            {index + 1}
          </div>
          <p>{tip}</p>
        </div>
      ))}
    </div>
  )
}
