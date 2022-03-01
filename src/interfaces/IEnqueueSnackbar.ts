import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";

export type IEnqueueSnackbar = (
  message: SnackbarMessage,
  options?: OptionsObject | undefined
) => SnackbarKey;
