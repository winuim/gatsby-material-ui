export interface WorkSiteProps {
  workSiteId: string;
  workSiteName: string;
  workSiteStartDateTime: Date;
  workSiteEndDateTime: Date;
  meetingPlace?: string;
  meetingHours?: Date;
  workingStartTime?: string;
  workingEndTime?: string;
  clothes?: string;
  bringItem?: string;
  remarks?: string;
  contactDeparture?: string;
  contactWorkStart?: string;
  constactWorkEnd?: string;
  staff?: Array<string>;
  subProps?: {
    [index: string]: {
      meetingPlace?: string;
      meetingHours?: Date;
      workingStartTime?: string;
      workingEndTime?: string;
      clothes?: string;
      bringItem?: string;
      remarks?: string;
      contactDeparture?: string;
      contactWorkStart?: string;
      constactWorkEnd?: string;
      staff?: Array<string>;
    };
  };
}

export type PartialWorkSiteProps = Partial<WorkSiteProps>;

export const WorkSitesModel: Array<WorkSiteProps> = [
  {
    workSiteId: "W0000000001",
    workSiteName: "現場A",
    workSiteStartDateTime: new Date("2020-03-20 00:00:00"),
    workSiteEndDateTime: new Date("2020-03-20 23:59:59"),
    workingStartTime: "10:00",
    workingEndTime: "19:00",
    subProps: {},
  },
  {
    workSiteId: "W0000000002",
    workSiteName: "現場B",
    workSiteStartDateTime: new Date("2020-03-30 00:00:00"),
    workSiteEndDateTime: new Date("2020-03-31 23:59:59"),
    workingStartTime: "10:00",
    workingEndTime: "19:00",
    subProps: {
      "2020-03-30": {
        workingStartTime: "09:00",
      },
    },
  },
  {
    workSiteId: "W0000000003",
    workSiteName: "現場C",
    workSiteStartDateTime: new Date("2020-04-03 00:00:00"),
    workSiteEndDateTime: new Date("2020-04-03 23:59:59"),
    workingStartTime: "10:00",
    workingEndTime: "19:00",
    subProps: {},
  },
];

export function getWorkSiteInfo(workSiteId: string): WorkSiteProps | undefined {
  const result = WorkSitesModel.find(value => {
    return value.workSiteId == workSiteId;
  });
  return result;
}
