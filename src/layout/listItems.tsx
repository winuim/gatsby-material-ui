import React from "react";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ScheduleIcon from "@material-ui/icons/Schedule";
import TodayIcon from "@material-ui/icons/Today";

function ListItemLink(
  props: ListItemProps<"a", { button?: true }>
): JSX.Element {
  return <ListItem button component="a" {...props} />;
}

export const homeListItems = (
  <div>
    <ListItemLink href="/home">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="ホーム" />
    </ListItemLink>
    <ListItemLink href="#todo">
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText primary="本日の現場" />
    </ListItemLink>
    <ListItemLink href="#schedule">
      <ListItemIcon>
        <ScheduleIcon />
      </ListItemIcon>
      <ListItemText primary="スケジュール登録" />
    </ListItemLink>
    <ListItemLink href="#profile">
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="プロフィール" />
    </ListItemLink>
    <ListItemLink href="#logout">
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="ログアウト" />
    </ListItemLink>
  </div>
);

export const adminListItems = (
  <div>
    <ListItemLink href="/admin/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="管理画面TOP" />
    </ListItemLink>
    <ListItemLink href="#employeeList">
      <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="従業員一覧" />
    </ListItemLink>
    <ListItemLink href="#employeeSchedule">
      <ListItemIcon>
        <ScheduleIcon />
      </ListItemIcon>
      <ListItemText primary="従業員スケジュール" />
    </ListItemLink>
    <ListItemLink href="#workSites">
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="現場一覧" />
    </ListItemLink>
    <ListItemLink href="#registWorkSites">
      <ListItemIcon>
        <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary="現場登録" />
    </ListItemLink>
    <ListItemLink href="#todo">
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText primary="現場報告" />
    </ListItemLink>
    <ListItemLink href="#logout">
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="ログアウト" />
    </ListItemLink>
  </div>
);
