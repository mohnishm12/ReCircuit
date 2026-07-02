# Technical Architecture Companion

This companion describes the ReCircuit platform architecture as a research and prototype direction. It does not claim production deployment.

## Frontend

Purpose: User-facing portal for intake, dashboards, reports, research, and public communication.

Inputs: User forms, image uploads, asset metadata, organization context, workflow selections.

Outputs: Asset records, intake confirmations, dashboards, evidence views, downloadable reports.

Current status: Public website live. Research portal generated in v2.0. Product UI remains prototype-stage.

Future work: Role-based dashboard, upload experience, report preview, accessibility hardening, offline
collection mode.

## Backend

Purpose: Application services for asset records, workflow state, authorization, audit logging, and
integrations.

Inputs: Frontend requests, API calls, processor updates, model outputs, file metadata.

Outputs: Validated records, workflow events, audit logs, signed report artifacts, integration responses.

Current status: Architecture defined. No production backend deployment claimed.

Future work: Event-driven services, tenant model, RBAC, immutable audit trail, integration adapters.

## AI Layer

Purpose: Decision-support layer for classification, condition analysis, forecasting, recommendation, and
text assistance.

Inputs: Images, asset metadata, historical records, price signals, route data, policy references.

Outputs: Predictions, confidence scores, recommended pathway, explanation notes, exception flags.

Current status: Concept and prototype direction. No production model metrics claimed.

Future work: Dataset design, baseline models, human review loop, evaluation harness, model cards.

## Computer Vision

Purpose: Analyze device photos and component images for visible condition and category signals.

Inputs: Device images, component photos, labels, damage views, battery and PCB images.

Outputs: Category, condition flags, visible component hints, safety warnings, confidence score.

Current status: Research and prototype design.

Future work: Image capture protocol, labeled dataset, active learning, false-negative review for safety-
critical classes.

## Forecasting

Purpose: Forecast collection volume, route demand, downstream capacity, and market movement.

Inputs: Time series intake, geography, partner capacity, seasonality, price history.

Outputs: Demand forecasts, capacity warnings, pickup windows, planning signals.

Current status: Proposed future capability.

Future work: Synthetic planning model, pilot data capture, calibration against real operations.

## Pricing Engine

Purpose: Compare economic pathways for resale, repair, parts harvesting, recycling, or destruction.

Inputs: Asset category, condition, component signals, market data, processing costs, logistics costs.

Outputs: Pathway economics, value range, uncertainty, recommended handling route.

Current status: Architecture concept only.

Future work: Market source governance, price confidence bands, override logs, regional constraints.

## Carbon Intelligence

Purpose: Estimate emissions implications of alternative recovery pathways with visible assumptions.

Inputs: Asset weight, material class, route, recovery pathway, emissions factors, evidence quality.

Outputs: Estimated carbon impact, factor provenance, uncertainty band, methodology note.

Current status: Research-stage methodology.

Future work: Factor registry, methodology review, uncertainty scoring, audit export.

## ESG Engine

Purpose: Prepare evidence packets for Scope 3, diversion, chain-of-custody, and recovery reporting.

Inputs: Asset events, custody updates, processor records, carbon estimates, report templates.

Outputs: Evidence packet, status flags, report export, data gaps, confidence labels.

Current status: Report architecture defined. No audited reports claimed.

Future work: Report templates aligned to customer needs, assurance workflow, API export.

## API Layer

Purpose: Allow organizations and processors to exchange asset, workflow, and report data.

Inputs: External system requests, webhooks, batch imports, processor confirmations.

Outputs: Asset status, event updates, report data, integration notifications.

Current status: Future capability.

Future work: REST/GraphQL schema, webhooks, OAuth, rate limits, audit logging.

## Cloud Infrastructure

Purpose: Secure, scalable runtime for data storage, models, file handling, and observability.

Inputs: Application traffic, model jobs, uploaded files, logs, metrics.

Outputs: Available services, monitored jobs, secure storage, backups, deployment telemetry.

Current status: Not deployed as production infrastructure.

Future work: IaC, secrets management, encrypted storage, monitoring, cost controls.

## Data Pipeline

Purpose: Move asset evidence from intake through model processing, decisioning, reporting, and analytics.

Inputs: Raw uploads, validation events, model outputs, human decisions, downstream confirmations.

Outputs: Curated records, feature tables, event log, analytics views, exportable evidence.

Current status: Architecture complete at concept level.

Future work: Schema registry, validation rules, event bus, lineage tracking, data retention policy.
