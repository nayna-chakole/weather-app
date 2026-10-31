import { Box, Typography } from "@mui/material";

export default function Hourly({ hours, units, timezone }) {
  const symbol = units === "metric" ? "°" : "°";

  // Show the time in the searched city's own time zone
  const formatTime = (dt) =>
    new Date((dt + timezone) * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
      timeZone: "UTC",
    });

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
        Next 24 hours
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          mt: 1.5,
          pb: 1,
          "&::-webkit-scrollbar": { height: 6 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.4)",
            borderRadius: 3,
          },
        }}
      >
        {hours.map((h) => (
          <Box
            key={h.dt}
            sx={{ textAlign: "center", minWidth: 64, flexShrink: 0 }}
          >
            <Typography variant="body2">{formatTime(h.dt)}</Typography>
            <img
              src={`https://openweathermap.org/img/wn/${h.weather[0].icon}.png`}
              alt={h.weather[0].description}
              width={50}
            />
            <Typography sx={{ fontWeight: 600 }}>
              {Math.round(h.main.temp)}
              {symbol}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}