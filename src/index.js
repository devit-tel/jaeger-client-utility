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
  let spanOptions = R.omit(['isChild','isFollowsFrom'], options)

  if (options.isChild && typeof options.isChild === 'object') {
    const parentSpanContext = getParentSpan(options.isChild.format, options.isChild.injectData)
    spanOptions.childOf = parentSpanContext
  }

  if (options.isFollowsFrom && typeof options.isFollowsFrom === 'object') {
    const parentSpanContext = getParentSpan(options.isFollowsFrom.format, options.isFollowsFrom.injectData)
    spanOptions.references = [followsFrom(parentSpanContext)]
  }

  
  return tracer.startSpan(spanName, spanOptions)
}

const inject = (span, format, payload) => tracer.inject(span, format, payload)

export default { tracer, init, startSpan, inject, getParentSpan }
