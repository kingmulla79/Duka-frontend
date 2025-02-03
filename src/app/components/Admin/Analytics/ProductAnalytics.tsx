/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect } from "react";
import { useGetProductAnalyticsQuery } from "../../../../../redux/features/products/productsAPI";
import toast from "react-hot-toast";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useTheme } from "next-themes";
import ChartCustomizations from "../../../../app/utils/ReactChartJSCustomizations";

interface UserAnalyticsData {
  month_year: string;
  month_name: string;
  record_count: number;
}

interface Props {
  isDashboard: boolean;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProductAnalytics: FC<Props> = ({ isDashboard }) => {
  const { theme } = useTheme();
  const options = ChartCustomizations(
    theme || "",
    `New Product Entry Count For The Last 12 Months`
  );

  defaults.font.family = "Poppins";

  const { data, error, isSuccess } = useGetProductAnalyticsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [error]);
  const prod_analytics: [] = data?.data;
  let labels: Array<string> = [];

  {
    prod_analytics &&
      prod_analytics.map((item: UserAnalyticsData, id: number) => {
        labels.push(item.month_name);
      });
  }

  const analytics_data = {
    labels,
    datasets: [
      {
        label: "Record Count",
        data:
          prod_analytics &&
          prod_analytics.map((item: UserAnalyticsData) => item.record_count),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };
  return (
    <>
      {prod_analytics && (
        <div className="w-full justify-center justify-items-center mt-16 pl-10 text-[#eaeaea]">
          {isDashboard ? (
            <Bar options={options} data={analytics_data} />
          ) : (
            <Line options={options} data={analytics_data} />
          )}
        </div>
      )}
    </>
  );
};

export default ProductAnalytics;
