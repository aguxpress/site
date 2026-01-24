import type { AddonsOpts } from "@components/start-forms/Addons";
import type { BusinessInfoOpts } from "@components/start-forms/BusinessInfo";
import type { BusinessRequestOpts } from "@components/start-forms/BusinessRequest";
import type { DestinationOpts } from "@components/start-forms/Destination";
import type { HomeInfoOpts } from "@components/start-forms/HomeInfo";
import type { HomeItemsOpts } from "@components/start-forms/HomeItems";
import type { MovingInstructionsOpts } from "@components/start-forms/MovingInstructions";
import type { SinglePackageOpts } from "@components/start-forms/PackageInfo";
import type {
  UserProps,
  RecipientProps,
  BusinessContactProps,
} from "@components/start-forms/PersonData";

export type StartFormFields = AddonsOpts &
  BusinessInfoOpts &
  BusinessRequestOpts &
  DestinationOpts &
  HomeInfoOpts &
  HomeItemsOpts &
  MovingInstructionsOpts &
  SinglePackageOpts &
  UserProps &
  RecipientProps &
  BusinessContactProps;
