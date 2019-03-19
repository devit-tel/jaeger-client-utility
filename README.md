# jaeger-client-utility
This is wrapper for jaeger-client for easy use and implement

### Install
`npm i -s jaeger-client-utility`

### Example
This example will show how to use jaeger to tracing event in service

```javascript
import jaegerClient from 'jaeger-client-utility'

jaegerClient.init({ serviceName: 'test-jeager-wrapper' })

const span = jaegerClient.startSpan('test')

//do something in services

span.finish()
```
After running servicer tracing data will send to jaeger server

See more architecture in [jaeger](https://www.jaegertracing.io/docs/1.10/architecture/) 