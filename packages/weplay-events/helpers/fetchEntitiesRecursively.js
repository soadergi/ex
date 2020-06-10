export default function fetchEntitiesRecursively(request, dispatch, params) {
  dispatch(request(params)).then((response) => {
    const { total, limit, offset } = response.meta.pagination
    if (total > limit + offset) {
      fetchEntitiesRecursively(request, dispatch, { ...params, 'page[offset]': limit + offset })
    }
  })
}
