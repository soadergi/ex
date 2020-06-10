export default function getResponseDataWithIdKey(response, customId) {
  const responseData = response?.data?.data ?? {}
  const id = responseData.id || customId
  return { [id]: responseData }
}
