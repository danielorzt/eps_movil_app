import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

interface ImageSliderProps {
  images: string[];
  height?: number;
}

export const ImageSlider = ({ images, height = 200 }: ImageSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const handleDotPress = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            className="w-full"
            style={{ width, height }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <View className="flex-row justify-center items-center mt-2">
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDotPress(index)}
            className={`w-2 h-2 rounded-full mx-1 ${
              activeIndex === index ? "bg-orange-500" : "bg-gray-300"
            }`}
          />
        ))}
      </View>
    </View>
  );
};
