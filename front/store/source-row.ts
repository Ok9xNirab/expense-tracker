import Source from "@/types/Source";
import { createContext } from "react";

const SourceContext = createContext<Source>({
  id: 0,
  name: "",
  type: "income",
  amount: 0,
});

export default SourceContext;
