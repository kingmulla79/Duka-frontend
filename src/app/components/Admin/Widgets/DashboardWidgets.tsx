import React, { FC } from "react";

type Props = {
  open: boolean;
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  return <div>DashboardWidgets{open}</div>;
};

export default DashboardWidgets;
