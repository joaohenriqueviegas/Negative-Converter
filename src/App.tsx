import { useState } from "react";
import { UploadZone } from "./components/UploadZone";
import { ImageGallery } from "./components/ImageGallery";
import { ImageEditor } from "./components/ImageEditor";
import { DEFAULT_SETTINGS } from "./utils/defaults";
import "./styles/theme.css";

export default function App() {
  const [images, setImages] = useState<any[]>([]);
  const [active, setActive] = useState(0);

  return (
    <div className="app">
      <UploadZone setImages={setImages} />
      {images.length > 0 && (
        <>
          <ImageGallery images={images} active={active} setActive={setActive} />
          <ImageEditor image={images[active]} />
        </>
      )}
    </div>
  );
}
