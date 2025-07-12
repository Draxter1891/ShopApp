import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { data, imageData } from '../assets/data/bannerData';
const CustomCarousel = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const bannerData: imageData = data;
  const width = Dimensions.get('window').width - 20;

  const onPressPagination = (index: number) => {
		ref.current?.scrollTo({
			/**
			 * Calculate the difference between the current index and the target index
			 * to ensure that the carousel scrolls to the nearest index
			 */
			count: index - progress.value,
			animated: true,
		});
    } 
  return (
    <>
    <Carousel
      autoPlayInterval={2000}
      autoPlay={true}
      ref={ref}
      width={width}
      height={width / 2}
      loop={true}
      pagingEnabled={true}
      snapEnabled={true}
      data={bannerData}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 40,
      }}
      onProgressChange={progress}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <Image source={{uri:item.imageUri}} resizeMode='contain' style={styles.image}/>
        </View>
      )}
    />
    <Pagination.Basic
				progress={progress}
				data={data}
				dotStyle={{
					width: 10,
					height: 10,
          borderRadius:5,
					backgroundColor: "#d8e8f6",
				}}
				activeDotStyle={{
					overflow: "hidden",
					backgroundColor: "#5c8adc",
				}}
				containerStyle={{
					gap: 10,
					marginBottom: 20,
				}}
				horizontal
				onPress={onPressPagination}
			/>
    </>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
})