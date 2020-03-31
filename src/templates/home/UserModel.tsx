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
  [index: string]: boolean;
}

export interface UserWorkingDaysProps {
  workSiteId: string;
  date: string;
  prepareTime?: string;
  departureTime?: string;
  trainDepartureTime?: string;
  arrivalTime?: string;
  workStartTime?: string;
  workEndTime?: string;
  breakTime?: number;
  expenses?: number;
  section?: string;
  report?: string;
}

export function filterWorking(
  date: string,
  models: UserWorkingDaysProps[]
): UserWorkingDaysProps[] {
  const result = models.filter((value) => {
    return value.date === date;
  });
  return result;
}

export const MyProfileModel: UserProfileModel = {
  userId: "U0000000001",
  name: "フル ネーム",
  email: "test@example.com",
};

export const MyAvailableDaysModel: UserAvailableDayProps = {
  "2020-03-30": true,
  "2020-03-31": true,
  "2020-04-01": true,
  "2020-04-02": true,
  "2020-04-03": true,
};

export const MyWorkingDayModels: Array<UserWorkingDaysProps> = [
  { date: "2020-03-20", workSiteId: "W0000000001" },
  { date: "2020-03-30", workSiteId: "W0000000002" },
  { date: "2020-03-31", workSiteId: "W0000000002" },
];
