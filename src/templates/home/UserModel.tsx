export interface UserProfileModel {
  userId: string;
  email: string;
  name: string;
  nameKana?: string;
  birthDay?: Date;
  occupation?: string;
  address?: string;
  nearestStation?: string;
  useBus?: boolean;
  tel?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  myNumber?: string;
  haveClothes?: string;
  memo?: string;
}

export interface UserAvailableDayProps {
  [month: string]: {
    [day: string]: {
      available: number;
    };
  };
}

export interface UserWorkReportProps {
  workDate: string;
  workSiteId: string;
  prepareTime?: Date;
  departureTime?: Date;
  trainDepartureTime?: Date;
  arrivalTime?: Date;
  workStartTime?: Date;
  workEndTime?: Date;
  breakTime?: number;
  expenses?: number;
  section?: string;
  report?: string;
}

export type RequiredUserWorkReportProps = Required<UserWorkReportProps>;

export function filterWorking(
  date: string,
  models: UserWorkReportProps[]
): UserWorkReportProps[] {
  const result = models.filter((value) => {
    return value.workDate === date;
  });
  return result;
}

export const MyProfileModel: UserProfileModel = {
  userId: "U0000000001",
  name: "フル ネーム",
  email: "test@example.com",
};

export const MyAvailableDaysModel: UserAvailableDayProps = {
  "2020-03": {
    "2020-03-30": {
      available: 1,
    },
    "2020-03-31": {
      available: 1,
    },
  },
};

export const MyWorkingDayModels: Array<UserWorkReportProps> = [
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
];
