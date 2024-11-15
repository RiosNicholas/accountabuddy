import { UUID } from 'crypto';

export interface Areas {
  id: number;
  area: string;
}

export interface PreferencesData {
  meetingLocation: string;
  meetingFrequency: string;
  growthAreas: number[];
  accountabilityAreas: number[];
}

export interface AreasProps {
  areas: Areas[] | null;
  preferencesData: PreferencesData;
  setPreferencesData: React.Dispatch<React.SetStateAction<PreferencesData>>;
}

export interface MethodsProps {
  preferencesData: PreferencesData;
  setPreferencesData: React.Dispatch<React.SetStateAction<PreferencesData>>;
}

export interface User {
  user_id: UUID;
  name: string;
  username: string;
  email: string;
  meetingLocation: string | null;
  meetingFrequency: string | null;
  growthAreas: number[] | null;
  accountabilityAreas: number[] | null;
}