# Devopstrio Azure OpenAI Terraform
# Module: Azure OpenAI (Private, Secure, Multi-Model)

variable "resource_group_name" { type = string }
variable "location" { type = string }
variable "environment" { type = string }
variable "prefix" { type = string }
variable "subnet_id" { type = string }

variable "deploy_gpt4o" { type = bool; default = true }
variable "deploy_embeddings" { type = bool; default = true }

# 1. Cognitive Account (OpenAI)
resource "azurerm_cognitive_account" "openai" {
  name                = "${var.prefix}-oai-secure-${var.environment}-01"
  location            = var.location
  resource_group_name = var.resource_group_name
  kind                = "OpenAI"
  sku_name            = "S0"
  
  public_network_access_enabled = false # Network Isolation

  custom_subdomain_name = "${var.prefix}-oai-${var.environment}"
}

# 2. GPT-4o Deployment
resource "azurerm_cognitive_deployment" "gpt4" {
  count                = var.deploy_gpt4o ? 1 : 0
  name                 = "gpt-4o"
  cognitive_account_id = azurerm_cognitive_account.openai.id
  model {
    format  = "OpenAI"
    name    = "gpt-4o"
    version = "2024-05-13"
  }
  sku {
    name     = "Standard"
    capacity = 10
  }
}

# 3. Text Embedding Ada Deployment
resource "azurerm_cognitive_deployment" "embeddings" {
  count                = var.deploy_embeddings ? 1 : 0
  name                 = "text-embedding-3-large"
  cognitive_account_id = azurerm_cognitive_account.openai.id
  model {
    format  = "OpenAI"
    name    = "text-embedding-3-large"
    version = "1"
  }
  sku {
    name     = "Standard"
    capacity = 100
  }
}

# 4. Private Endpoint for OpenAI
resource "azurerm_private_endpoint" "oai_pe" {
  name                = "pe-oai-${var.environment}-01"
  location            = var.location
  resource_group_name = var.resource_group_name
  subnet_id           = var.subnet_id

  private_service_connection {
    name                           = "psc-oai"
    private_connection_resource_id = azurerm_cognitive_account.openai.id
    is_manual_connection           = false
    subresource_names              = ["account"]
  }
}

# Outputs
output "endpoint" {
  value = azurerm_cognitive_account.openai.endpoint
}

output "id" {
  value = azurerm_cognitive_account.openai.id
}
