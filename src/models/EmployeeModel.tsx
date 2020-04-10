export interface ProfileModelProps {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  firstKana?: string;
  lastKana?: string;
  displayName?: string;
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

export interface AvailableDayMap {
  [day: string]: {
    available: number;
  };
}

export interface AvailableDayProps {
  [month: string]: AvailableDayMap;
}

export interface EmployeeScheduleProps {
  userId: string;
  userName: string;
  [x: string]: string;
}

export interface WorkReportProps {
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

export type RequiredUserWorkReportProps = Required<WorkReportProps>;

export function filterWorking(
  date: string,
  models: WorkReportProps[]
): WorkReportProps[] {
  const result = models.filter((value) => {
    return value.workDate === date;
  });
  return result;
}
