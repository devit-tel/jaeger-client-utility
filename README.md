# jaeger-client-utility

This is wrapper for jaeger-client for easy use and implement

### Install

`npm i -s jaeger-client-utility opentracing`

### Example 1

This example will show how to use jaeger to tracing event in service

```javascript
import jaegerClient from 'jaeger-client-utility'

jaegerClient.init({ serviceName: 'test-jeager-wrapper' })

const span = jaegerClient.startSpan('test')

//do something in services

span.finish()
```

After running servicer tracing data will send to Jaeger's server

See more information [here](https://www.jaegertracing.io/docs/1.10/architecture/)

### Example 2

This example will show how to trace multiple services

#### service-1

```javascript
import jargerClient from 'jaeger-client-utility'
import { FORMAT_HTTP_HEADERS } from 'opentracing'

jaegerClient.init({ serviceName: 'test-service-1' })

const span = jaegerClient.startSpan('service1')

//do something in services and send span to next service

jaegerClient.inject(FORMAT_HTTP_HEADERS, header)

// send span with header to another services

span.finish()
```

#### service-2

```javascript
import jargerClient from 'jaeger-client-utility'
import { FORMAT_HTTP_HEADERS } from 'opentracing'

jaegerClient.init({ serviceName: 'test-service-2' })

const span = jaegerClient.startSpan('service2' {
  isChild: {
    format: FORMAT_HTTP_HEADERS,
    injectData: payload
  }
})

//do something in services

span.finish()
```
This code wiil start parent span from service-1 and make service-2 span as a child of service-1

See more infomation about span [here](https://opentracing.io/specification/)