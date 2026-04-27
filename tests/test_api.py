import pytest
from fastapi.testclient import TestClient
from backend.src.main import app

# Devopstrio Azure OpenAI Terraform
# Integration Tests for IaC Orchestration & Environment Lifecycle

client = TestClient(app)

def test_health_check_operational():
    """Verify that the IaC gateway is healthy and Terraform engine is ready."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["terraform_engine_ready"] is True

def test_module_registry_retrieval():
    """Ensure the platform can list verified Terraform modules for AI."""
    response = client.get("/modules")
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert "azure-openai-isolate" in [m["name"] for m in response.json()]

def test_environment_inventory_retrieval():
    """Verify the platform tracks multiple cloud environments."""
    response = client.get("/environments")
    assert response.status_code == 200
    assert any(e["name"] == "Production-EU-Foundation" for e in response.json())

def test_deployment_plan_initiation():
    """Verify that a Terraform plan can be correctly triggered for an environment."""
    payload = {
        "environment_id": "env-prod",
        "action": "Plan",
        "variables": {"region": "uksouth"}
    }
    response = client.post("/deployments/plan", json=payload)
    assert response.status_code == 202
    assert "job_id" in response.json()
    assert response.json()["status"] == "Generating-Plan"

def test_governance_score_aggregation():
    """Ensure the platform reports IaC compliance and drift status."""
    response = client.get("/governance/score")
    assert response.status_code == 200
    assert response.json()["overall_compliance"] > 90

def test_analytics_summary_reporting():
    """Ensure the platform reports managed resource counts and success rates."""
    response = client.get("/analytics/summary")
    assert response.status_code == 200
    assert "managed_resources" in response.json()
    assert "iaac_spend_usd" in response.json()
