/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect } from "react";
import { useGetUserAnalyticsQuery } from "../../../../../redux/features/auth/authAPI";
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

const UserAnalytics: FC<Props> = ({ isDashboard }) => {
  const { theme } = useTheme();
  const options = ChartCustomizations(
    theme || "",
    `User Registration Count For The Last 12 Months`
  );

  defaults.font.family = "Poppins";

  const { data, error, isSuccess } = useGetUserAnalyticsQuery(undefined, {
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
  const user_analytics: [] = data?.data;
  let labels: Array<string> = [];

  {
    user_analytics &&
      user_analytics.map((item: UserAnalyticsData, id: number) => {
        labels.push(item.month_name);
      });
  }

  const analytics_data = {
    labels,
    datasets: [
      {
        label: "Record Count",
        data:
          user_analytics &&
          user_analytics.map((item: UserAnalyticsData) => item.record_count),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };
  return (
    <>
      {user_analytics && (
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

export default UserAnalytics;
