import React from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import OrderAnalytics from "../Analytics/OrdersAnalytics";
import Orders from "../Orders/Orders";

const DashboardWidgets = () => {
  return (
    <div className="mt-[30px] min-h-screen">
      <div className="800px:grid 800px:grid-cols-[95%, 5%] flex">
        <UserAnalytics isDashboard={false} />
      </div>

      <div className="hidden 800px:grid 800px:grid-cols-[65%,35%] mt-[-20px] h-fit">
        <div className="w-[94%] mt-[0px] shadow-sm m-auto">
          <OrderAnalytics isDashboard={true} />
        </div>
        <div>
          <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins mt-8">
            Recent Transactions
          </h5>
          <Orders isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
