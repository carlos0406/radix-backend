# Project Management System

## Description
This project implements a robust equipment management system using Clean Architecture and Domain-Driven Design (DDD) principles, focusing on scalability and maintainability.

## Requirements
- Docker
- Docker Compose
- Node.js (v20+)
- PNPM

## Environment Setup

### Option 1: Docker Compose (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd <project-name>

# Run the entire project
docker-compose up --build
```

### Option 2: Local Installation

1. Install dependencies
```bash
pnpm install
```

2. Configure `.env` file
```bash
# Copy .env.example to .env and fill in your configurations
cp .env.example .env
```

3. Start the application
```bash
pnpm dev
```

## API Client (REST Client)

We use VSCode's REST Client for easy API testing. Configuration file: `api.http`

### Key Endpoints

#### Equipment Management
1. **List Equipment**
   - `GET http://localhost:3000/equipments`
   - Retrieves all registered equipment

#### Reports Management
1. **Create Equipment Report**
   - `POST http://localhost:3000/reports`
   - Payload Example:
     ```json
     {
         "value": 10.0,
         "equipment_id": "975c7c96-6624-45ce-831e-9c7cf0a50cfb",
         "timestamp": "2024-12-3T01:30:00.000-05:00"
     }
     ```

2. **Upload CSV Reports**
   - `POST http://localhost:3000/reports/csv`
   - Allows bulk upload of reports via CSV file

3. **List Reports**
   - `GET http://localhost:3000/reports?equipment_id=<ID>&hours=<HOURS>`
   - Query Parameters:
     - `equipment_id`: Filter reports for specific equipment
     - `hours`: Time range for report retrieval

## Tests

### Run Unit Tests
```bash
pnpm run test
```

### Run Integration Tests
```bash
pnpm run test:int
```

## API Documentation

Complete API documentation is available via Swagger at:
`http://localhost:3000/documentation`

Includes all endpoints, request parameters, and expected responses.

## Architecture

### Principles
- Clean Architecture
- Domain-Driven Design (DDD)
- SOLID Principles

### Repository Abstraction
Repositories are implemented following interface contracts, enabling:
- Easy implementation replacement
- Layer decoupling
- Simplified testing through mocking

Example repository interface:
```typescript
export interface IRepository<E extends Entity> {
  insert(entity: E): Promise<string>;
  findById(id: string): Promise<E | null>;
  bulkInsert(entities: E[]): Promise<string[]>;
  existsById(ids:string[]): Promise<{ exists: string[]; not_exists: string[] }>
  findAll(): Promise<E[]>;
}
```

## Main Technologies
- Node.js
- TypeScript
- PostgreSQL
- Vitest (Testing Framework)
- Swagger (Documentation)
- Docker
- Fastfy (http framework)
- Primsa (ORM)