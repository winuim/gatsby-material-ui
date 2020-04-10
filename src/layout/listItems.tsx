import React from "react";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
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
    <ListItemLink href="/home#todo">
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText primary="本日の現場" />
    </ListItemLink>
    <ListItemLink href="/home#schedule">
      <ListItemIcon>
        <ScheduleIcon />
      </ListItemIcon>
      <ListItemText primary="スケジュール登録" />
    </ListItemLink>
    <ListItemLink href="/home#profile">
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="プロフィール" />
    </ListItemLink>
    <ListItemLink href="/home#logout">
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
    <ListItemLink href="/admin/dashboard#todo">
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText primary="現場報告" />
    </ListItemLink>
    <ListItemLink href="/admin/dashboard#workSites">
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="現場一覧" />
    </ListItemLink>
    <ListItemLink href="/admin/dashboard#registWorkSites">
      <ListItemIcon>
        <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary="現場登録" />
    </ListItemLink>
    <ListItemLink href="/admin/dashboard#employeeSchedule">
      <ListItemIcon>
        <ScheduleIcon />
      </ListItemIcon>
      <ListItemText primary="従業員提出スケジュール" />
    </ListItemLink>
    <ListItemLink href="/admin/dashboard#employeeList">
      <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="従業員一覧" />
    </ListItemLink>
    <ListItemLink href="/admin/dashboard#logout">
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="ログアウト" />
    </ListItemLink>
  </div>
);
