import { Address } from "./address";
import { StakeholderType } from "./stakeholderType";

export interface Stakeholder {
  id: number;
  name: string;
  type: string;
  identificationCode: string;
  email: string;
  phone: string;
  businessAddress: Address;
  taxAddress: Address;
  stakeholderType: StakeholderType;
}