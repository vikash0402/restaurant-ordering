export const generateError = (
  status: number,
  errorcode: string,
  error: string,
  errorMessage: string
) => {
  return new Response(
    JSON.stringify({
      success: false,
      status: status,
      errorCode: errorcode,
      error: error,
      message: errorMessage,
    }),
    {
      status: status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
