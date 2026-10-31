import { Box, Typography } from "@mui/material";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import AirIcon from "@mui/icons-material/Air";
import SpeedIcon from "@mui/icons-material/Speed";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";

// One small box: icon + label on top, big value below
function DetailBox({ icon, label, value }) {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255,255,255,0.18)",
        backdropFilter: "blur(8px)",
        borderRadius: 4,
        p: 2,
        color: "white",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, opacity: 0.85 }}>
        {icon}
        <Typography
          variant="caption"
          sx={{ textTransform: "uppercase", letterSpacing: 1 }}
        >
          {label}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "1.5rem", fontWeight: 500, mt: 1 }}>
        {value}
      </Typography>
    </Box>
  );
}

export default function Details({ data, units }) {
  const { main, wind, visibility, sys, timezone } = data;

  const speedUnit = units === "metric" ? "m/s" : "mph";

  // visibility comes in metres from the API
  const visibilityText =
    units === "metric"
      ? `${(visibility / 1000).toFixed(1)} km`
      : `${(visibility / 1609.34).toFixed(1)} mi`;

  // show sunrise/sunset in the searched city's own time zone
  const formatTime = (unix) =>
    new Date((unix + timezone) * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
        gap: 1.5,
        mb: 2,
      }}
    >
      <DetailBox
        icon={<WaterDropOutlinedIcon fontSize="small" />}
        label="Humidity"
        value={`${main.humidity}%`}
      />
      <DetailBox
        icon={<AirIcon fontSize="small" />}
        label="Wind"
        value={`${wind.speed} ${speedUnit}`}
      />
      <DetailBox
        icon={<SpeedIcon fontSize="small" />}
        label="Pressure"
        value={`${main.pressure} hPa`}
      />
      <DetailBox
        icon={<VisibilityOutlinedIcon fontSize="small" />}
        label="Visibility"
        value={visibilityText}
      />
      <DetailBox
        icon={<WbSunnyOutlinedIcon fontSize="small" />}
        label="Sunrise"
        value={formatTime(sys.sunrise)}
      />
      <DetailBox
        icon={<WbTwilightIcon fontSize="small" />}
        label="Sunset"
        value={formatTime(sys.sunset)}
      />
    </Box>
  );
}