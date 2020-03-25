interface UserProfileModel {
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

interface AvailableDayProps {
  [index: string]: boolean;
}

interface WorkingDayProps {
  [index: string]: Array<{
    workSiteId: string;
    departureTime?: Date;
    workStartTime?: Date;
    workEndTime?: Date;
    breakTime?: string;
  }>;
}

export const MyProfileModel: UserProfileModel = {
  userId: "U0000000001",
  name: "フル ネーム",
  email: "test@example.com",
};

export const AvailableDays: AvailableDayProps = {
  "2020-03-30": true,
  "2020-03-31": true,
  "2020-04-01": true,
  "2020-04-02": true,
  "2020-04-03": true,
};

export const WorkingDays: WorkingDayProps = {
  "2020-03-20": [
    {
      workSiteId: "W0000000001",
    },
  ],
  "2020-03-30": [
    {
      workSiteId: "W0000000002",
    },
  ],
  "2020-03-31": [
    {
      workSiteId: "W0000000002",
    },
  ],
};
