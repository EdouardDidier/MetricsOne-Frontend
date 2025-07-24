import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-grpc";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { RuntimeNodeInstrumentation } from "@opentelemetry/instrumentation-runtime-node";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const sdk = new NodeSDK({
      serviceName: "metrics-one-nextjs",
      traceExporter: new OTLPTraceExporter({
        url:
          "http://" +
          process.env.OTEL_COLLECTOR_HOST +
          ":" +
          process.env.OTEL_COLLECTOR_PORT,
      }),
      metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
          url:
            "http://" +
            process.env.OTEL_COLLECTOR_HOST +
            ":" +
            process.env.OTEL_COLLECTOR_PORT,
        }),
        exportIntervalMillis: 10000,
      }),
      instrumentations: [
        new RuntimeNodeInstrumentation(),
        new HttpInstrumentation(),
        new FetchInstrumentation(),
      ],
    });

    sdk.start();
  }
}
