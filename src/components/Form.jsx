// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import DatePicker from "react-datepicker";

import { useEffect, useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../contexts/citiesContext";

import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

  const [isLoadingCity, setIsloadingCity] = useState(false);
  const [error, setError] = useState();

  useEffect(
    function () {
      if (!lat && !lng) return;
      const controller = new AbortController();
      async function fetchCityData() {
        setIsloadingCity(true);
        setError(null);
        try {
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`,
            {
              signal: controller.signal,
            },
          );
          if (!res.ok) throw new Error("failed to fetch cities");
          const data = await res.json();
          if (!data.countryCode)
            throw new Error(
              "it seems there is no country, Click somewhere else",
            );
          setCityName(data.cityName || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsloadingCity(false);
        }
      }
      fetchCityData();
      return function () {
        controller.abort();
      };
    },
    [lat, lng],
  );
  async function handleSubmit(e) {
    e.preventDefault();
    const city = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    await createCity(city);
    navigate("/App");
  }
  if (!lat && !lng)
    return <Message message={"Start  by clicking on any city"} />;
  if (isLoadingCity) return <Spinner />;
  if (error) return <Message message={error} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => {
            setDate(date);
          }}
          selected={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
