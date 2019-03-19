import jaegerClient from './src'

console.log('Init tracer....')

jaegerClient.init({ serviceName: 'test-jeager-wrapper' })

const span = jaegerClient.startSpan('test', { tags: { test: 'hello' } })

span.setTag("Test", "Hello")

span.finish()
