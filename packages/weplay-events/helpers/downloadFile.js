export default function downloadFile(url, fileName) {
  const link = document.createElement('a')
  link.href = url
  link.target = '_blank'
  link.download = fileName
  link.click()
}
