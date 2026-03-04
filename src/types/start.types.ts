import * as z from "zod/mini";
import { AddonsSchema } from "@components/start-forms/Addons";
import { BusinessInfoSchema } from "@components/start-forms/BusinessInfo";
import { BusinessRequestSchema } from "@components/start-forms/BusinessRequest";
import { DestinationSchema } from "@components/start-forms/Destination";
import { HomeInfoSchema } from "@components/start-forms/HomeInfo";
import { HomeItemsSchema } from "@components/start-forms/HomeItems";
import { MovingInstructionsSchema } from "@components/start-forms/MovingInstructions";
import { SinglePackageSchema } from "@components/start-forms/PackageInfo";
import {
  UserSchema,
  RecipientSchema,
  BusinessContactSchema,
} from "@components/start-forms/PersonData";

const Fields = z.object({
  ...AddonsSchema.shape,
  ...BusinessInfoSchema.shape,
  ...BusinessRequestSchema.shape,
  ...DestinationSchema.shape,
  ...HomeInfoSchema.shape,
  ...HomeItemsSchema.shape,
  ...MovingInstructionsSchema.shape,
  ...SinglePackageSchema.shape,
  ...UserSchema.shape,
  ...RecipientSchema.shape,
  ...BusinessContactSchema.shape,
});

export type StartFormFields = z.infer<typeof Fields>;
