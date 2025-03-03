"use client";
import { useState } from "react";
import Lightbox from "react-image-lightbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "react-image-lightbox/style.css";

const aiImages = [
  { src: "/ai (1)-min.jpg", alt: "ai" },
  { src: "/ai (2)-min.jpg", alt: "ai" },
  { src: "/ai (3)-min.jpg", alt: "ai" },
  { src: "/ai (4)-min.jpg", alt: "ai" },
  { src: "/ai (5)-min.jpg", alt: "ai" },
  { src: "/ai (6)-min.jpg", alt: "ai" },
];

const animalImages = [
  { src: "/animal (1)-min.jpg", alt: "animal" },
  { src: "/animal (2)-min.jpg", alt: "animal" },
  { src: "/animal (3)-min.jpg", alt: "animal" },
  { src: "/animal (4)-min.jpg", alt: "animal" },
  { src: "/animal (5)-min.jpg", alt: "animal" },
  { src: "/animal (6)-min.jpg", alt: "animal" },
  { src: "/animal (7)-min.jpg", alt: "animal" },
  { src: "/animal (8)-min.jpg", alt: "animal" },
  { src: "/animal (9)-min.jpg", alt: "animal" },
  { src: "/animal (10)-min.jpg", alt: "animal" },
];

const natureImages = [
  { src: "/nature (1)-min.jpg", alt: "nature" },
  { src: "/nature (2)-min.jpg", alt: "nature" },
  { src: "/nature (3)-min.jpg", alt: "nature" },
  { src: "/nature (4)-min.jpg", alt: "nature" },
  { src: "/nature (5)-min.jpg", alt: "nature" },
];

const imagesMap = {
  all: [...aiImages, ...animalImages, ...natureImages],
  ai: aiImages,
  animal: animalImages,
  nature: natureImages,
};

export const TabsLightboxGallery = () => {
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "animal" | "nature">("all");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Get images for the active tab
  const currentImages = imagesMap[activeTab];

  return (
    <div className="mt-10">
      <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as "all" | "ai" | "animal" | "nature")}>
        <TabsList className="flex gap-x-5 mt-5 w-[90%] mx-auto bg-0">
          <TabsTrigger value="all" className="px-8 py-2 rounded-lg bg-black text-white">
            All
          </TabsTrigger>
          <TabsTrigger value="ai" className="px-8 py-2 rounded-lg bg-black text-white">
            Ai
          </TabsTrigger>
          <TabsTrigger value="animal" className="px-8 py-2 rounded-lg bg-black text-white">
            Animals
          </TabsTrigger>
          <TabsTrigger value="nature" className="px-8 py-2 rounded-lg bg-black text-white">
            Nature
          </TabsTrigger>
        </TabsList>

        {/* Merged Content: display images based on the active tab */}
        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-[90%] mx-auto mt-10">
            {currentImages.map((img: { src: string; alt: string }, index: number) => (
              <img
                key={index}
                src={img.src}
                alt={img.alt}
                className="w-full h-[250px] rounded-md shadow-lg hover:scale-105 transition-all cursor-pointer"
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {isOpen && (
        <Lightbox
          mainSrc={currentImages[photoIndex].src}
          nextSrc={currentImages[(photoIndex + 1) % currentImages.length].src}
          prevSrc={
            currentImages[(photoIndex + currentImages.length - 1) % currentImages.length].src
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + currentImages.length - 1) % currentImages.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % currentImages.length)
          }
        />
      )}
    </div>
  );
};export default TabsLightboxGallery;
