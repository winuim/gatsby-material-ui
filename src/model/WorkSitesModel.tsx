import { format } from "date-fns";

interface WorkSitesExtendProps {
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

export interface WorkSiteProps extends Partial<WorkSitesExtendProps> {
  workSiteId: string;
  workSiteName: string;
  workSiteStartDateTime: Date;
  workSiteEndDateTime: Date;
  extends: Array<WorkSitesExtendProps>;
}

type RequiredWorkSitesProps = Required<WorkSiteProps>;

const defaultWorkSiteModel: WorkSiteProps = {
  workDate: "2020-01-01",
  workSiteId: "エラー",
  workSiteName: "エラー",
  workSiteStartDateTime: new Date("2020-01-01T00:00:00.000Z"),
  workSiteEndDateTime: new Date("2020-01-01T00:00:00.000Z"),
  extends: [],
};

export function findWorkSites(
  workSiteId: string,
  models: Array<WorkSiteProps>
): WorkSiteProps {
  const result = models.find((value) => {
    return value.workSiteId == workSiteId;
  });
  return result ? result : defaultWorkSiteModel;
}

export type WorkSiteInfoProps = {
  [P in keyof Omit<
    RequiredWorkSitesProps,
    | "workSiteStartDateTime"
    | "workSiteEndDateTime"
    | "extends"
    | "workStartTime"
    | "workEndTime"
  >]: string;
} & { workSiteDate: string; workTime: string };

export const InitialWorkSiteInfo: WorkSiteInfoProps = {
  workSiteId: "W0000000000",
  workSiteName: "現場はありません",
  workSiteDate: "****-**-** 〜 ****-**-**",
  workDate: "****-**-**",
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
