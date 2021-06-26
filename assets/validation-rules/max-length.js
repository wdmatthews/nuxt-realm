export default function (length) {
  return v => !v || v.length <= length || `Max ${length} characters`
}
