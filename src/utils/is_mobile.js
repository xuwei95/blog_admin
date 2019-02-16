export function is_Mobile() {
  let ua = navigator.userAgent.toLowerCase()
  let is_mobile = ua.indexOf('mobile') > -1 || ua.indexOf('mobile') > -1
  return is_mobile
}
