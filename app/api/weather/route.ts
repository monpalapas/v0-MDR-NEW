import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing latitude or longitude" }, { status: 400 })
  }

  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!apiKey) {
    console.error("[v0] OPENWEATHER_API_KEY environment variable is not set")
    return NextResponse.json(
      { error: "Weather API is not configured. Please add OPENWEATHER_API_KEY to environment variables." },
      { status: 500 },
    )
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      },
    )

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    })
  } catch (error) {
    console.error("Error fetching weather:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
