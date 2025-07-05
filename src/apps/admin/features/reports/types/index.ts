export type GridComponentProps = {
  sum?: number;
};

export interface IReportsFilter {
  setDate: React.Dispatch<React.SetStateAction<string[]>>;
  handleSubmit: () => Promise<void>;
}
