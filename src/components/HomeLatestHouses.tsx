import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HouseCard from "./HouseCard";
import type { House } from "../types/house";

import "../styles/homeLatestHouses.css";

type Props = {
  language: "bn" | "en" | "hi" | "ar" | "es";
};

const API =
  "https://house-design-platform-server.vercel.app/api/houses?home=true";

function HomeLatestHouses({ language }: Props) {
  const navigate = useNavigate();

  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await fetch(API, {
          cache: "force-cache",
        });

        const data = await res.json();

        if (!ignore) {
          setHouses(data.houses || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  function openType(house: House) {
    let type = "";

    switch (house.houseType) {
      case "1-story":
        type = "1-story";
        break;

      case "2-story":
        type = "2-story";
        break;

      case "3-story":
        type = "3-story";
        break;

      case "4-story":
        type = "4-story";
        break;

      case "Luxury":
        type = "luxury";
        break;

      case "Tin Shade":
        type = "tinshade";
        break;

      default:
        type = house.houseType;
    }

    navigate(`/houses/${type}`);
  }

  if (loading) {
    return null;
  }

  return (
    <div className="home-latest-houses">
      <div className="home-latest-grid">
        {houses.map((house) => (
          <div
            key={house.id}
            className="home-latest-item"
            onClick={() => openType(house)}
          >
            <HouseCard
              house={house}
              language={language}
              disableOpen
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeLatestHouses;