export default (data, fileName) => {
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(data)
  link.download = fileName
  link.click()
}
