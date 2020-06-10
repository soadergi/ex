import { getConfigField } from 'weplay-node-cloud-config'

export const auth = async (req: any, res: any, next: any) => {
  if (['/info', '/health-check'].includes(req.originalUrl)) {
    return next()
  }
  const authToken = await getConfigField('authToken')
  if (req.get('Api-Key') === authToken) {
    return next()
  }
  return res
    .status(403)
    .json({
      operation: 'fail',
      code: 3,
      message: 'bad auth',
    })
    .end()
}
