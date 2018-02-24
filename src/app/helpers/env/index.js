export default function (key, fallback) {
  return process.env[key] ? process.env[key] : fallback
}
