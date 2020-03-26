import React from "react";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import HomeIcon from "@material-ui/icons/Home";
import ScheduleIcon from "@material-ui/icons/Schedule";
import WorkIcon from "@material-ui/icons/Work";
import TodayIcon from "@material-ui/icons/Today";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListIcon from "@material-ui/icons/List";
import DashboardIcon from "@material-ui/icons/Dashboard";

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

export const mainListItems = (
  <div>
    <ListItemLink href="/home">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="ホーム" />
    </ListItemLink>
    <ListItemLink href="#schedule">
      <ListItemIcon>
        <ScheduleIcon />
      </ListItemIcon>
      <ListItemText primary="スケジュール登録" />
    </ListItemLink>
    <ListItemLink href="#backlog">
      <ListItemIcon>
        <WorkIcon />
      </ListItemIcon>
      <ListItemText primary="お仕事一覧" />
    </ListItemLink>
    <ListItemLink href="#todo">
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText primary="本日の現場" />
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

export const secondaryListItems = (
  <div>
    <ListSubheader inset>管理画面</ListSubheader>
    <ListItemLink href="/admin/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="管理画面TOP" />
    </ListItemLink>
    <ListItemLink href="/admin#users">
      <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="従業員一覧" />
    </ListItemLink>
    <ListItemLink href="/admin#schedules">
      <ListItemIcon>
        <ScheduleIcon />
      </ListItemIcon>
      <ListItemText primary="従業員スケジュール" />
    </ListItemLink>
    <ListItemLink href="/admin#worksites">
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="現場一覧" />
    </ListItemLink>
    <ListItemLink href="/admin#registwork">
      <ListItemIcon>
        <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary="現場登録" />
    </ListItemLink>
    <ListItemLink href="/admin#todo">
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText primary="本日の現場" />
    </ListItemLink>
  </div>
);
