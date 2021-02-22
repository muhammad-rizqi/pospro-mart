import React from 'react';
import {LineChart} from 'react-native-chart-kit';

const LineComponent = ({
  data,
  style,
  backgroundGradientFrom,
  backgroundGradientTo,
}) => {
  return (
    <LineChart
      style={style}
      data={{
        datasets: [{data}],
      }}
      bezier
      width={320}
      height={220}
      chartConfig={{
        backgroundGradientFrom,
        backgroundGradientTo,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
    />
  );
};

export default LineComponent;
