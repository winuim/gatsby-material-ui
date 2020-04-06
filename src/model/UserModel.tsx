export interface UserProfileModel {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
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

export const UserProfiles: UserProfileModel[] = [
  {
    userId: "U0000000001",
    firstName: "名",
    lastName: "姓",
    email: "test@example.com",
  },
  {
    userId: "U0000000002",
    firstName: "user2",
    lastName: "example",
    email: "user2@example.com",
  },
  {
    userId: "U0000000003",
    firstName: "user3",
    lastName: "example",
    email: "user3@example.com",
  },
  {
    userId: "U0000000004",
    firstName: "user4",
    lastName: "example",
    email: "user4@example.com",
  },
  {
    userId: "U0000000005",
    firstName: "user5",
    lastName: "example",
    email: "user5@example.com",
  },
  {
    userId: "U0000000006",
    firstName: "user6",
    lastName: "example",
    email: "user6@example.com",
  },
  {
    userId: "U0000000007",
    firstName: "user7",
    lastName: "example",
    email: "user7@example.com",
  },
  {
    userId: "U0000000008",
    firstName: "user8",
    lastName: "example",
    email: "user8@example.com",
  },
  {
    userId: "U0000000009",
    firstName: "user9",
    lastName: "example",
    email: "user9@example.com",
  },
  {
    userId: "U0000000010",
    firstName: "user10",
    lastName: "example",
    email: "user10@example.com",
  },
];

export const MyProfileModel: UserProfileModel = UserProfiles[0];

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
