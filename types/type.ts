export type HealthConcern = {
  id: number;
  name: string;
};

export type FormData = {
  selectedConcerns?: number[];
  prioritizedConcerns?: HealthConcern[];
  diets?: string[];
  allergies?: string[];
  // ... other fields
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