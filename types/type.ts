export type HealthConcern = {
  id: number;
  name: string;
};

export type FormData = {
  selectedConcerns?: number[];
  prioritizedConcerns?: HealthConcern[];
  // ... other fields
};