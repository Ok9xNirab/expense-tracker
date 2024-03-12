export default interface Source {
  id: number;
  name: string;
  type: "income" | "outcome";
  amount: number;
}
