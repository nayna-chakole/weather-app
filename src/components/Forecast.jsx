import { Box, Typography } from "@mui/material";

export default function Forecast({ days, units }) {
  const symbol = "°";

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255,255,255,0.18)",
        backdropFilter: "blur(8px)",
        borderRadius: 4,
        p: 2,
        mb: 2,
        color: "white",
      }}
    >
      <Typography
        variant="caption"
        sx={{ textTransform: "uppercase", letterSpacing: 1, opacity: 0.85 }}
      >
        5-day forecast
      </Typography>

      {days.map((d, index) => (
        <Box
          key={d.dt}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 1,
            borderTop: index === 0 ? "none" : "1px solid rgba(255,255,255,0.2)",
            mt: index === 0 ? 1 : 0,
          }}
        >
          {/* Day name */}
          <Typography sx={{ width: 60, fontWeight: 500 }}>
            {new Date(d.dt * 1000).toLocaleDateString("en-US", {
              weekday: "short",
              timeZone: "UTC",
            })}
          </Typography>

          {/* Icon + description */}
          <Box sx={{ display: "flex", alignItems: "center", flex: 1, gap: 1 }}>
            <img
              src={`https://openweathermap.org/img/wn/${d.weather[0].icon}.png`}
              alt={d.weather[0].description}
              width={44}
            />
            <Typography
              variant="body2"
              sx={{
                textTransform: "capitalize",
                display: { xs: "none", sm: "block" },
              }}
            >
              {d.weather[0].description}
            </Typography>
          </Box>

          {/* Temperature */}
          <Typography sx={{ fontWeight: 600, minWidth: 50, textAlign: "right" }}>
            {Math.round(d.main.temp)}
            {symbol}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}