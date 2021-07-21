export const __prod__ = () => {
  return process.env.NODE_ENV === "production";
};
