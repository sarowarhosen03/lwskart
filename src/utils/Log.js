export default function Log(...arg) {
  if (process.env.NODE_ENV === "development") {
    // console.log(...arg);
  }
}
