import { initTracer } from 'jaeger-client'
import { followsFrom } from 'opentracing'
import R from 'ramda'

let tracer

const DEFAULT_CONFIG = {
  sampler: {
    type: 'const',
    param: 1
  },
  reporter: {
    logSpans: true
  }
}

const DEFAULT_OPTIONS = {
  logger: {
    info(msg) {
      console.log('INFO : ', msg)
    },
    error(msg) {
      console.log('ERROR : ', msg)
    }
  }
}

const init = (config, options) => {
  const tracerConfig = {
    ...config,
    ...DEFAULT_CONFIG
  }
  const tracerOptions = {
    ...options,
    ...DEFAULT_OPTIONS
  }
  tracer = initTracer(tracerConfig, tracerOptions)
}

const getParentSpan = (format, injectData) => tracer.extract(format, injectData)

const startSpan = (spanName, options = {}) => {
  let spanOptions = R.omit(['isChild'], options)
  let parentSpanContext
  
  if (options.isChild && typeof options.isChild === 'object') {
    parentSpanContext = getParentSpan(options.isChild.format, options.isChild.injectData)
    spanOptions.childOf = parentSpanContext
  }

  if (options.isChild && typeof options.isChild === 'object') {
    parentSpanContext = getParentSpan(options.isFollowFrom.format, options.isFollowFrom.injectData)
    spanOptions.references = [followsFrom(parentSpanContext)]
  }

  
  return tracer.startSpan(spanName, spanOptions)
}

const inject = (span, format, payload) => tracer.inject(span, format, payload)

export default { tracer, init, startSpan, inject, getParentSpan }
