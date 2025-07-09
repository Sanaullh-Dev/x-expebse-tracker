import { useCallback, useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export const PieChartComponent = ({ data }) => {
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

    return finalData
      .filter((item) => item.value > 0)
      .map((item) => ({
        name: item.name,
        value: item.value,
      }));
  }, [data]);

  useEffect(() => {
    setChartData(getChartData());
  }, [data, getChartData]);

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            paddingAngle={2} // Add small gap between segments
            fill="#8884d8"
            dataKey="value"
            style={{ strokeWidth: 0 }}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{
              fontSize: "12px",
              paddingTop: "10px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
