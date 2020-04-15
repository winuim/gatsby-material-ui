import faker from "faker/locale/ja";
import { addDays, endOfMonth, format, startOfMonth } from "date-fns";

import { shuffle } from "../helpers/arrayUtils";
import {
  AvailableDayProps,
  EmployeeScheduleProps,
  ProfileModelProps,
  WorkReportProps,
} from "./EmployeeModel";
import { HolidaysModelProps } from "./HolidayModel";
import { WorkSiteProps } from "./WorkSitesModel";

export const HolidaysModel: HolidaysModelProps = {
  "2020-03-20": { isHoliday: true },
};

export const EmployeeProfiles: ProfileModelProps[] = [...Array(1000)].map(
  (_, i) => {
    return {
      userId: "U" + (i + 1).toString().padStart(10, "0"),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      displayName: faker.internet.userName(),
    };
  }
);

export const MyProfileModel: ProfileModelProps = EmployeeProfiles[0];

const initAvailables = ["○", "○", "○", "○", "○", "○", "○", "△", "X", ""];

export const EmployeeSchedules: EmployeeScheduleProps[] = EmployeeProfiles.map(
  (v, i) => {
    const result: EmployeeScheduleProps = {
      userId: v.userId,
      userName: v.lastName + " " + v.firstName,
    };
    const randomAvailables = shuffle(initAvailables);
    const today = new Date();
    for (
      let day = startOfMonth(today), i = 0;
      day <= endOfMonth(today);
      day = addDays(day, 1), i++
    ) {
      result[format(day, "yyyy-MM-dd")] =
        randomAvailables[i % randomAvailables.length];
    }
    return result;
  }
);

export const MyAvailableDaysModel: AvailableDayProps = {
  "2020-03": {
    "2020-03-30": {
      available: 1,
    },
    "2020-03-31": {
      available: 1,
    },
  },
};

export const MyWorkingDayModels: Array<WorkReportProps> = [
  { workDate: "2020-03-20", workSiteId: "W0000000001" },
  { workDate: "2020-03-30", workSiteId: "W0000000002" },
  { workDate: "2020-03-31", workSiteId: "W0000000002" },
  { workDate: "2020-04-01", workSiteId: "W0000000003" },
  { workDate: "2020-04-01", workSiteId: "W0000000006" },
  { workDate: "2020-04-02", workSiteId: "W0000000003" },
  { workDate: "2020-04-03", workSiteId: "W0000000003" },
  { workDate: "2020-04-04", workSiteId: "W0000000003" },
  { workDate: "2020-04-05", workSiteId: "W0000000003" },
  { workDate: "2020-04-06", workSiteId: "W0000000003" },
  { workDate: "2020-04-07", workSiteId: "W0000000003" },
  { workDate: "2020-04-08", workSiteId: "W0000000004" },
  { workDate: "2020-04-09", workSiteId: "W0000000004" },
  { workDate: "2020-04-10", workSiteId: "W0000000004" },
  { workDate: "2020-04-11", workSiteId: "W0000000004" },
  { workDate: "2020-04-12", workSiteId: "W0000000004" },
  { workDate: "2020-04-13", workSiteId: "W0000000004" },
  { workDate: "2020-04-14", workSiteId: "W0000000004" },
  { workDate: "2020-04-15", workSiteId: "W0000000004" },
];

export const WorkSiteModels: Array<WorkSiteProps> = [
  {
    workSiteId: "W0000000001",
    workSiteName: "現場A",
    workSiteStartDateTime: new Date("2020-03-20T00:00:00.000Z"),
    workSiteEndDateTime: new Date("2020-03-20T23:59:59.000Z"),
    workStartTime: "10:00",
    workEndTime: "19:00",
    extends: [],
  },
  {
    workSiteId: "W0000000002",
    workSiteName: "現場B",
    workSiteStartDateTime: new Date("2020-03-30T00:00:00.000Z"),
    workSiteEndDateTime: new Date("2020-03-31T23:59:59.000Z"),
    workStartTime: "10:00",
    workEndTime: "19:00",
    meetingPlace: "集合場所A",
    meetingHours: "09:30",
    clothes: "服装A",
    items: "持ち物A",
    remarks: "特記事項A...",
    contactDeparture: "スタッフA",
    contactWorkStart: "スタッフB",
    constactWorkEnd: "スタッフC",
    staff: ["スタッフD", "スタッフE"],
    extends: [{ workDate: "2020-03-31", workEndTime: "20:00" }],
  },
  {
    workSiteId: "W0000000003",
    workSiteName: "現場C",
    workSiteStartDateTime: new Date("2020-04-01T00:00:00.000Z"),
    workSiteEndDateTime: new Date("2020-04-07T23:59:59.000Z"),
    workStartTime: "10:00",
    workEndTime: "19:00",
    meetingPlace: "集合場所C",
    meetingHours: "09:30",
    clothes: "服装C",
    items: "持ち物C",
    remarks: "特記事項C...",
    contactDeparture: "スタッフA",
    contactWorkStart: "スタッフB",
    constactWorkEnd: "スタッフC",
    staff: ["スタッフD", "スタッフE"],
    extends: [{ workDate: "2020-04-01", workStartTime: "15:00" }],
  },
  {
    workSiteId: "W0000000004",
    workSiteName: "現場D",
    workSiteStartDateTime: new Date("2020-04-08T00:00:00.000Z"),
    workSiteEndDateTime: new Date("2020-04-15T23:59:59.000Z"),
    workStartTime: "10:00",
    workEndTime: "19:00",
    meetingPlace: "集合場所C",
    meetingHours: "09:30",
    clothes: "服装C",
    items: "持ち物C",
    remarks: "特記事項C...",
    contactDeparture: "スタッフA",
    contactWorkStart: "スタッフB",
    constactWorkEnd: "スタッフC",
    staff: ["スタッフD", "スタッフE"],
    extends: [],
  },
  {
    workSiteId: "W0000000005",
    workSiteName: "現場E",
    workSiteStartDateTime: new Date("2020-04-16T00:00:00.000Z"),
    workSiteEndDateTime: new Date("2020-04-23T23:59:59.000Z"),
    workStartTime: "09:30",
    workEndTime: "19:00",
    meetingPlace: "集合場所C",
    meetingHours: "09:00",
    clothes: "服装A",
    items: "持ち物A",
    remarks: "特記事項C...",
    contactDeparture: "スタッフA",
    contactWorkStart: "スタッフB",
    constactWorkEnd: "スタッフC",
    staff: ["スタッフD", "スタッフE"],
    extends: [],
  },
  {
    workSiteId: "W0000000006",
    workSiteName: "現場F",
    workSiteStartDateTime: new Date("2020-04-01T00:00:00.000Z"),
    workSiteEndDateTime: new Date("2020-04-01T23:59:59.000Z"),
    workStartTime: "09:00",
    workEndTime: "14:00",
    meetingPlace: "集合場所C",
    meetingHours: "08:30",
    clothes: "服装A",
    items: "持ち物A",
    remarks: "特記事項C...",
    contactDeparture: "スタッフA",
    contactWorkStart: "スタッフB",
    constactWorkEnd: "スタッフC",
    staff: ["スタッフD", "スタッフE"],
    extends: [],
  },
];
