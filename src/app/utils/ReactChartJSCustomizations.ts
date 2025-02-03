export default function ChartCustomizations(
  theme: string,
  chart_title: string
) {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: `${theme === "dark" ? "white" : "black"}`,
        },
      },
      title: {
        display: true,
        color: `${theme === "dark" ? "white" : "black"}`,
        text: `${chart_title}`,
        font: {
          size: 22,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: `${
            theme === "dark"
              ? "rgba(234, 234, 234, 0.4)"
              : "rgba(123, 120, 120, 0.4)"
          }`, // Change the grid lines color to blue
        },
        ticks: {
          color: `${theme === "dark" ? "white" : "black"}`, // Change the tick labels color to white
        },
      },
      y: {
        grid: {
          color: `${
            theme === "dark"
              ? "rgba(234, 234, 234, 0.4)"
              : "rgba(123, 120, 120, 0.4)"
          }`, // Change the grid lines color to red
        },
        ticks: {
          color: `${theme === "dark" ? "white" : "black"}`, // Change the tick labels color to white
        },
      },
    },
  };
}
