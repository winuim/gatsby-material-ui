import { format } from "date-fns";

export interface WorkSiteExtendProps {
  workDate: string;
  meetingPlace?: string;
  meetingHours?: string;
  workStartTime?: string;
  workEndTime?: string;
  clothes?: string;
  items?: string;
  remarks?: string;
  contactPrepare?: string;
  contactDeparture?: string;
  contactWorkStart?: string;
  constactWorkEnd?: string;
  staff?: Array<string>;
}

export interface WorkSiteProps {
  workSiteId: string;
  workSiteName: string;
  workSiteStartDateTime: Date;
  workSiteEndDateTime: Date;
  meetingPlace?: string;
  meetingHours?: string;
  workStartTime?: string;
  workEndTime?: string;
  clothes?: string;
  items?: string;
  remarks?: string;
  contactPrepare?: string;
  contactDeparture?: string;
  contactWorkStart?: string;
  constactWorkEnd?: string;
  staff?: Array<string>;
  extends: Array<WorkSiteExtendProps>;
}

export function findWorkSite(
  workSiteId: string,
  models: Array<WorkSiteProps>
): WorkSiteProps | undefined {
  const result = models.find((value) => {
    return value.workSiteId == workSiteId;
  });
  return result;
}

export interface WorkSiteInfoProps {
  workSiteId: string;
  workSiteName: string;
  workSiteDate: string;
  workDate: string;
  meetingPlace: string;
  meetingHours: string;
  workTime: string;
  clothes: string;
  items: string;
  remarks: string;
  contactPrepare: string;
  contactDeparture: string;
  contactWorkStart: string;
  constactWorkEnd: string;
  staff: string;
}

export const InitialWorkSiteInfo: WorkSiteInfoProps = {
  workSiteId: "W0000000000",
  workSiteName: "現場はありません",
  workSiteDate: "****-**-** 〜 ****-**-**",
  workDate: "**-**",
  meetingPlace: "****",
  meetingHours: "**:**",
  workTime: "**:** 〜 **:**",
  clothes: "****",
  items: "****",
  remarks: "****",
  contactPrepare: "****",
  contactDeparture: "****",
  contactWorkStart: "****",
  constactWorkEnd: "****",
  staff: "****",
};

export function getWorkSiteInfo(
  date: string,
  model: WorkSiteProps
): WorkSiteInfoProps {
  const extend = model.extends.find((value) => {
    return value.workDate === date;
  });
  let meetingPlace = model.meetingPlace;
  if (extend && extend.meetingPlace) {
    meetingPlace = extend.meetingPlace;
  }
  let meetingHours = model.meetingHours;
  if (extend && extend.meetingHours) {
    meetingHours = extend.meetingHours;
  }
  let workStartTime = model.workStartTime;
  if (extend && extend.workStartTime) {
    workStartTime = extend.workStartTime;
  }
  let workEndTime = model.workEndTime;
  if (extend && extend.workEndTime) {
    workEndTime = extend.workEndTime;
  }
  let clothes = model.clothes;
  if (extend && extend.clothes) {
    clothes = extend.clothes;
  }
  let items = model.items;
  if (extend && extend.items) {
    items = extend.items;
  }
  let remarks = model.remarks;
  if (extend && extend.remarks) {
    remarks = extend.remarks;
  }
  let contactPrepare = model.contactPrepare;
  if (extend && extend.contactPrepare) {
    contactPrepare = extend.contactPrepare;
  }
  let contactDeparture = model.contactDeparture;
  if (extend && extend.contactDeparture) {
    contactDeparture = extend.contactDeparture;
  }
  let contactWorkStart = model.contactWorkStart;
  if (extend && extend.contactWorkStart) {
    contactWorkStart = extend.contactWorkStart;
  }
  let constactWorkEnd = model.constactWorkEnd;
  if (extend && extend.constactWorkEnd) {
    constactWorkEnd = extend.constactWorkEnd;
  }
  let staff = model.staff;
  if (extend && extend.staff) {
    staff = extend.staff;
  }
  return {
    workSiteId: model.workSiteId,
    workSiteName: model.workSiteName,
    workSiteDate: `${format(
      model.workSiteStartDateTime,
      "yyyy-MM-dd"
    )} 〜 ${format(model.workSiteEndDateTime, "yyyy-MM-dd")}`,
    workDate: date,
    meetingPlace: meetingPlace ? meetingPlace : "未定",
    meetingHours: meetingHours ? meetingHours : "未定",
    workTime: `${workStartTime ? workStartTime : "未定"} 〜 ${
      workEndTime ? workEndTime : "未定"
    }`,
    clothes: clothes ? clothes : "未定",
    items: items ? items : "未定",
    remarks: remarks ? remarks : "未定",
    contactPrepare: contactPrepare ? contactPrepare : "未定",
    contactDeparture: contactDeparture ? contactDeparture : "未定",
    contactWorkStart: contactWorkStart ? contactWorkStart : "未定",
    constactWorkEnd: constactWorkEnd ? constactWorkEnd : "未定",
    staff: staff ? staff.join(",") : "未定",
  };
}

export const WorkSiteModels: Array<WorkSiteProps> = [
  {
    workSiteId: "W0000000001",
    workSiteName: "現場A",
    workSiteStartDateTime: new Date("2020-03-20 00:00:00"),
    workSiteEndDateTime: new Date("2020-03-20 23:59:59"),
    workStartTime: "10:00",
    workEndTime: "19:00",
    extends: [],
  },
  {
    workSiteId: "W0000000002",
    workSiteName: "現場B",
    workSiteStartDateTime: new Date("2020-03-30 00:00:00"),
    workSiteEndDateTime: new Date("2020-03-31 23:59:59"),
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
    workSiteStartDateTime: new Date("2020-04-03 00:00:00"),
    workSiteEndDateTime: new Date("2020-04-03 23:59:59"),
    workStartTime: "10:00",
    workEndTime: "19:00",
    extends: [],
  },
];
