export default interface ErrorResponse {
  message: string | null;
  errors?: {
    [key: string]: Array<string>;
  };
}
