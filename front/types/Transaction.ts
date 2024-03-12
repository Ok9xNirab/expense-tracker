import Source from "./Source";

export default interface Transaction {
  id: number;
  remarks: string | null;
  amount: number;
  type: "income" | "outcome";
  source: Pick<Source, "id" | "name">;
  created_at: string;
  updated_at: string | null;
}
