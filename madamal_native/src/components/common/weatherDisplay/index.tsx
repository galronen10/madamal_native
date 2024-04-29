import React, { useState, useEffect, useMemo, FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    width: 100,
  },
});

export const WeatherDisplay: FC = () => {
  const [weather, setWeather] = useState<number>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiUrl = `http://api.weatherapi.com/v1/current.json?key=c38bff7a79fd4f24bfe173313242904&q=32.067624,34.776054`;
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          setIsError(true);
        } else {
          const data = await response.json();
          const currentTemperature = data.current.temp_c;
          setWeather(currentTemperature);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const displayText = useMemo(() => {
    if (isLoading) return 'טוען טמפרטורה';
    else if (isError || !weather) return 'שגיאה בטעינת הטמפרטורה';
    else return `${weather}°C`;
  }, [isLoading, isError, weather]);

  return (
    <View>
      <Text style={styles.text}>{displayText}</Text>
    </View>
  );
};
