import { useCallback, useEffect, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export const ExpensesBarChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  const getChartData = useCallback(() => {
    const finalData = [
      { name: "Food", value: 0 },
      { name: "Entertainment", value: 0 },
      { name: "Travel", value: 0 },
    ];

    for (let item of data) {
      const category = finalData.findIndex(
        (cat) => cat.name.toLowerCase() === item.category.toLowerCase()
      );
      if (category !== -1) {
        finalData[category].value += item?.price ?? 0;
      }
    }

    finalData.sort((a, b) => b.value - a.value);
    return finalData.map((item) => ({
      name: item.name,
      value: item.value,
    }));
  }, [data]);

  useEffect(() => {
    setChartData(getChartData());
  }, [data, getChartData]);
  if (data.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: "300px",
          backgroundColor: "white",
          color: "gray",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No data available
      </div>
    );
  }
  return (
    <div style={{ width: "100%", height: "300px", backgroundColor: "white" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="vertical"
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Bar dataKey="value" barSize={20} fill="#413ea0" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
