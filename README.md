
## Real-Time Collaborative Workspace Backend

A production-ready backend service for a real-time collaborative workspace for developers.
This system supports secure authentication, project and workspace management, real-time collaboration, and asynchronous job processing with a scalable, cloud-ready architecture.

## Architecture Overview

This backend is built using a modular, API-first architecture with asynchronous and real-time capabilities.

## Tech Stack

Runtime: Node.js (TypeScript)

Framework: Express.js

Database: PostgreSQL

Cache / PubSub / Queue: Redis

Real-Time: Socket.IO

Async Jobs: BullMQ

Authentication: JWT (Access & Refresh Tokens)

Documentation: Swagger (OpenAPI)

Testing: Jest + Supertest

Logging: Winston

Containerization: Docker & Docker Compose

CI/CD: GitHub Actions

## High-level flow

Client
 ├── REST APIs (Express)
 │    ├── Auth & RBAC
 │    ├── PostgreSQL
 │    └── Redis Cache
 │
 ├── WebSockets (Socket.IO)
 │    └── Redis Pub/Sub
 │
 └── Async Jobs
      ├── BullMQ Queue
      └── Worker → PostgreSQL

## Setup Instructions
Prerequisites

Docker

Docker Compose

Node.js 18+ (for local development)

## Run with Docker

docker-compose up --build

## Initialize Database Schema

docker exec -it collab_postgres psql -U postgres -d collab

\i database/schema.sql

## API Documentation
Swagger UI is available at:

http://localhost:5000/api/docs

## Authentication & Authorization

JWT-based authentication

Access tokens + refresh tokens

Secure password hashing

Token refresh mechanism

Role-Based Access Control (RBAC)

## Supported Roles

OWNER – Full access

COLLABORATOR – Read/write access

VIEWER – Read-only access

Authentication and authorization are enforced via middleware across protected routes.

## Project & Workspace Management

RESTful APIs to:

Create projects

Manage project ownership

Assign collaborators

Update user roles

Enforce role-based permissions

## Design principles

API-first design

Versioned endpoints (/api/v1)

Proper HTTP status codes

OpenAPI documentation

## Real-Time Collaboration

WebSocket-based communication using Socket.IO

Real-time events supported:

User join / leave

File change events (mocked payloads)

Activity / cursor updates

Redis Pub/Sub enables scalable event broadcasting across instances

## Asynchronous Job Processing

Background job system implemented using BullMQ.

Workflow

Job request accepted via API

Job pushed to Redis queue

Worker processes job asynchronously

Job status and result persisted in PostgreSQL

Features

Retry logic

Failure handling

Idempotent job processing

Durable job persistence

## Data Storage
PostgreSQL (Relational DB)

Used for:

Users

Projects

Project members

Job status and results

Key considerations

UUID primary keys

Foreign key constraints

Data integrity enforcement

## Redis (Non-Relational)

Used for:

Caching

WebSocket Pub/Sub

BullMQ job queues

## Performance & Scalability

Stateless API services

Redis-based caching

Non-blocking async I/O

Horizontally scalable architecture

Queue-based background processing

## Security

Input validation

SQL injection protection

Secure secrets via environment variables

JWT verification middleware

API rate limiting

Proper CORS configuration

## Observability

Centralized logging using Winston

Structured logs for:

API requests

Errors

Background jobs

Easily extendable to external monitoring tools

## Testing
Test Coverage

Unit tests for authentication logic

Integration tests for API endpoints

Jest + Supertest

Run Tests
npm test

## Deployment & DevOps

Fully Dockerized services

Docker Compose for local orchestration

GitHub Actions CI pipeline:

Install dependencies

Run tests

Build validation

The architecture is cloud-ready and can be deployed on AWS, GCP, or Azure.

## Design Decisions & Trade-offs

JWT chosen for stateless authentication

Redis reused for cache, pub/sub, and job queues

BullMQ selected for reliability and retry support

Socket.IO chosen for developer-friendly real-time APIs

PostgreSQL used for strong relational guarantees

## Scalability Considerations

Horizontal scaling via stateless services

Redis-backed queues and pub/sub

Background workers can scale independently

API versioning strategy (/api/v1)

## Submission Notes

This project fulfills all functional and non-functional requirements of the assessment:

Secure authentication & RBAC

Project and workspace APIs

Real-time collaboration

Asynchronous job processing

Scalable, production-ready architecture

## Author

Sivaramakrishnan