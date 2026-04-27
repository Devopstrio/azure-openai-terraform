-- Devopstrio Azure OpenAI Terraform
-- Core IaC Orchestration & Environment Metadata Database Schema
-- Target: PostgreSQL 15+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Identity & Tenancy
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    azure_subscription_id VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'CloudArchitect', -- PlatformAdmin, CloudArchitect, Auditor
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Infrastructure Inventory & Modules
CREATE TABLE IF NOT EXISTS terraform_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL, -- e.g., azure-openai-hardened
    git_source VARCHAR(512) NOT NULL,
    current_version VARCHAR(50) NOT NULL,
    category VARCHAR(100), -- Compute, AI, Networking
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS environments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    name VARCHAR(50) NOT NULL, -- dev, test, prod
    region VARCHAR(50) NOT NULL,
    state_file_path VARCHAR(512),
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Deployment Lifecycle
CREATE TABLE IF NOT EXISTS deployments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    environment_id UUID REFERENCES environments(id),
    user_id UUID REFERENCES users(id),
    type VARCHAR(20) DEFAULT 'Plan', -- Plan, Apply, Destroy
    status VARCHAR(50) DEFAULT 'Queued', -- Queued, Running, Success, Failed
    trigger_source VARCHAR(100), -- Web-UI, GitHub-Actions, CLI
    log_output_url TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    finished_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS drift_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    environment_id UUID REFERENCES environments(id),
    resources_added INT DEFAULT 0,
    resources_changed INT DEFAULT 0,
    resources_destroyed INT DEFAULT 0,
    is_compliant BOOLEAN DEFAULT TRUE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Cost & Forecasting
CREATE TABLE IF NOT EXISTS iaas_cost_records (
    id BIGSERIAL PRIMARY KEY,
    environment_id UUID REFERENCES environments(id),
    service_group VARCHAR(100), -- OpenAI, AI-Search, Private-Endpoints
    daily_cost_usd FLOAT NOT NULL,
    forecast_cost_usd FLOAT,
    usage_date DATE NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Audit & Governance
CREATE TABLE IF NOT EXISTS governance_violations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deployment_id UUID REFERENCES deployments(id),
    rule_name VARCHAR(255), -- Tagging-Mandatory, Naming-Standard
    remediation_action VARCHAR(255),
    severity VARCHAR(20), -- High, Medium, Low
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    payload JSONB,
    resource_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Strategic IaC Platform Indexes
CREATE INDEX idx_module_tenant ON terraform_modules(tenant_id);
CREATE INDEX idx_env_tenant ON environments(tenant_id);
CREATE INDEX idx_deploy_env ON deployments(environment_id);
CREATE INDEX idx_cost_env ON iaas_cost_records(environment_id);
CREATE INDEX idx_cost_date ON iaas_cost_records(usage_date);
CREATE INDEX idx_audit_time ON audit_logs(created_at);
CREATE INDEX idx_drift_env ON drift_reports(environment_id);
