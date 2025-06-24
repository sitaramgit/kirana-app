
import React, { useEffect, useState } from "react";
import { db, ref, onValue, set } from "../firebase";
import { Card, CardContent, Typography, Button, CircularProgress, Box } from '@mui/material';


const Temperature = () => {
  const [temperature, setTemperature] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  const [moisture, setMoisture] = useState<any>(0);
  const [led, setLed] = useState<boolean>(false);

  useEffect(() => {
    onValue(ref(db, "/sensor/temperature"), (snapshot) => {
      setTemperature(snapshot.val());
    });

    onValue(ref(db, "/sensor/humidity"), (snapshot) => {
      setHumidity(snapshot.val());
    });
    onValue(ref(db, "/sensor/moisture"), (snapshot) => {
      setMoisture(snapshot.val());
    });
    

    onValue(ref(db, "/controls/led"), (snapshot) => {
      setLed(snapshot.val());
    });
  }, []);

  const toggleLed = () => {
    set(ref(db, "/controls/led"), !led);
  };

  return (
 <Card sx={{ maxWidth: 400, margin: 'auto', mt: 4, p: 2, textAlign: 'center', borderRadius: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="body1" gutterBottom>
          ESP32 Sensor Dashboard
        </Typography>

        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom>
            Temperature
          </Typography>
          <Typography variant="h4" color="primary">
            {temperature}°C
          </Typography>
        </Box>

        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 4 }}>
             <Typography variant="h6" gutterBottom>
            Humidity
          </Typography>
          <CircularProgress
            variant="determinate"
            value={humidity}
            size={120}
            thickness={5}
            color="secondary"
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" component="div" color="text.secondary">
              {humidity}%
            </Typography>
          </Box>
        </Box>


        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 4 }}>
             <Typography variant="h6" gutterBottom>
            Moisture
          </Typography>
          <CircularProgress
            variant="determinate"
            value={moisture}
            size={120}
            thickness={5}
            color="secondary"
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" component="div" color="text.secondary">
              {moisture}%
            </Typography>
          </Box>
        </Box>


        <Button
          variant="contained"
          color={led ? 'error' : 'success'}
          onClick={toggleLed}
          sx={{ mt: 2 }}
        >
          Turn LED {led ? 'OFF' : 'ON'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Temperature;
