/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import {
  useAllNotificationsQuery,
  useUpdateNotificationMutation,
} from "../../../../redux/features/notifications/notificationAPI";
import React, { FC, useEffect, useState } from "react";
import { format } from "timeago.js";
import IconButton from "@mui/material/IconButton";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Box, Modal } from "@mui/material";
import { Button } from "@mui/material";
import Badge from "@mui/material/Badge";

// import socketIO from "socket.io-client";
//to establish socket connection
// const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
// const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotification, { isSuccess }] = useUpdateNotificationMutation();
  const [notifications, setNotifications] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.not_status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
  }, [data, isSuccess, refetch]);

  //   useEffect(() => {
  //     socketId.on("newNotification", (data) => {
  //       // instantly update any new notifications
  //       refetch();
  //     });
  //   });

  const handleNotificationStausChange = async (id: string) => {
    await updateNotification(id);
  };

  return (
    <div className="w-full flex items-center justify-end px-4 fixed top-[10px] right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IconButton aria-label="notifications-button">
          <Badge
            color="secondary"
            badgeContent={notifications && notifications?.length}
          >
            {notifications?.length != 0 ? (
              <NotificationsActiveOutlinedIcon className="text-2xl cursor-pointer dark:text-white text-black" />
            ) : (
              <NotificationsOutlinedIcon className="text-2xl cursor-pointer dark:text-white text-black" />
            )}
          </Badge>
        </IconButton>
        {/* <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" /> */}
        {/* <span className="absolute -top-1 -right-1 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifications && notifications?.length}
        </span> */}
      </div>

      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="w-[350px] h-[40vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-20 rounded block right-4">
            <Box>
              <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
                Notifications
              </h5>

              {notifications?.length === 0 ? (
                <div className="text-black dark:bg-[#dfe2e8] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] z-1000">
                  There are no new notifications at the moment
                </div>
              ) : (
                notifications.map((item: any) => (
                  <div className="dark:bg-[#dfe2e8] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] z-1000">
                    <div className="w-full flex items-center justify-between p-2">
                      <p className="text-black ">{item.title}</p>
                      <Button
                        variant="contained"
                        onClick={() => handleNotificationStausChange(item?.id)}
                        size="small"
                      >
                        Mark as read
                      </Button>
                    </div>
                    <p className="px-2 text-black ">{item.message}</p>
                    <p className={`p-2 text-black text-[14px]`}>
                      {format(item.timestamp)}
                    </p>
                  </div>
                ))
              )}
            </Box>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DashboardHeader;

// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { FC } from "react";

// type Props = { open: boolean; setOpen: (open: boolean) => void };

// const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
//   return <div>DashboardHeader{open}</div>;
// };

// export default DashboardHeader;
