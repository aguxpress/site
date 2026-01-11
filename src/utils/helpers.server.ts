import { data } from "react-router";
import { customAlphabet } from "nanoid";

const dataError = (message: string, status: number = 400) =>
  data({ error: message }, { status });

const nanoid = customAlphabet("1234567890abcdef", 6);
const shortId = () => nanoid();

export { dataError, shortId };
