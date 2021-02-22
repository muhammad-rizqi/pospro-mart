/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {LineChart} from 'react-native-chart-kit';

const LineComponent = ({
  data,
  backgroundGradientFrom,
  backgroundGradientTo,
}) => {
  return (
    <LineChart
      style={{borderRadius: 10}}
      data={{
        datasets: [{data}],
      }}
      bezier
      withVerticalLines={false}
      horizontalLabelRotation={-45}
      width={300}
      height={200}
      chartConfig={{
        backgroundGradientFrom,
        backgroundGradientTo,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
    />
  );
};

export default LineComponent;
