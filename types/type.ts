export type HealthConcern = {
  id: number;
  name: string;
  priority?: number;
};

export type FormData = {
  selectedConcerns?: number[];
  prioritizedConcerns?: HealthConcern[];
  diets?: string[];
  allergies?: string[];
  sunExposure?: string;
  smoking?: string;
  alcohol?: string;
};

export type Diet = {
  id: number;
  name: string;
  tool_tip: string;
};

export type Allergy = {
  id: number;
  name: string;
};