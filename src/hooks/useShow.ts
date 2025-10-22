import { useEffect } from "react";

export default function useShow<T>(
  conditional: boolean,
  showed: () => void,
  checker: T,
) {
  useEffect(() => {
    if (conditional) {
      showed();
    }
  }, [checker]);
}
