import { useState } from "react";
import { places } from "./data.jsx";
import { getImageUrl } from "./utils.jsx";
import { useContext } from "react";
import { SizeContext } from "./context/ImageContext.jsx";
import { placeContext } from "./context/PlaceContext.jsx";

export default function App() {
  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;
  return (
    <SizeContext.Provider value={imageSize}>
      <label>
        <input
          type="checkbox"
          checked={isLarge}
          onChange={(e) => {
            setIsLarge(e.target.checked);
          }}
        />
        Use large images
      </label>
      <hr />
      <List />
    </SizeContext.Provider>
  );
}

function List() {
  const listItems = places.map((place) => (
    <placeContext.Provider value={place} key={place.id}>
      
        <Place />
      
    </placeContext.Provider>
  ));
  return <ul>{listItems}</ul>;
}

function Place() {
  const place = useContext(placeContext);

  return (
    <>
      <li>
        <PlaceImage />
        <p>
          <b>{place.name}</b>
          {": " + place.description}
        </p>
      </li>
    </>
  );
}

function PlaceImage() {
  const imageSize = useContext(SizeContext);
  const place = useContext(placeContext)
  return (
    <img
      src={getImageUrl(place)}
      alt={place.name}
      width={imageSize}
      height={imageSize}
    />
  );
}
