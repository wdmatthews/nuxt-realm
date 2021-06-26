export default function (length) {
  return v => !v || v.length >= length || `Min ${length} characters`
}
