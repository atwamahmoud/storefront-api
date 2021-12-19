export const get_private_key = (): string => {
  const {PRIVATE_KEY} = process.env;
  if (!PRIVATE_KEY) {
    throw new Error("Couldn't find a private key to sign/verify the token");
  }
  return PRIVATE_KEY;
};
