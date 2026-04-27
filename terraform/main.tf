# Devopstrio Azure OpenAI Terraform
# Enterprise IaC Foundation - Core Provider Configuration
# Target: Microsoft Azure

terraform {
  required_version = ">= 1.5.0"
  
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.90"
    }
  }

  backend "azurerm" {
    # Configuration should be dynamically injected during 'terraform init' or via partial config
    resource_group_name  = "rg-terraform-mgmt"
    storage_account_name = "sttfstatecenter"
    container_name       = "tfstate-openai"
    key                  = "foundation.tfstate"
  }
}

provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
}

# --- Shared Variables ---

variable "environment" {
  type        = string
  description = "The deployment environment (dev, test, prod)."
}

variable "location" {
  type        = string
  default     = "uksouth"
  description = "The primary Azure region for inference and search."
}

variable "prefix" {
  type        = string
  default     = "cto"
  description = "Prefix for all enterprise resources."
}

# --- Management Context ---

resource "azurerm_resource_group" "main" {
  name     = "${var.prefix}-rg-aoai-${var.environment}-01"
  location = var.location
  tags = {
    Environment = var.environment
    Platform    = "AI-Infrastructure"
    ManagedBy   = "Terraform"
  }
}

# --- Core Networking (Spoke) ---

module "network" {
  source              = "./modules/vnet"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  environment         = var.environment
  vnet_address_space  = ["10.10.0.0/16"]
}

# --- Azure OpenAI Service (Hardened) ---

module "openai" {
  source              = "./modules/azure-openai"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  environment         = var.environment
  prefix              = var.prefix
  
  subnet_id           = module.network.private_endpoint_subnet_id
  
  deploy_gpt4o        = true
  deploy_embeddings   = true
}

# --- AI Search for RAG ---

module "ai_search" {
  source              = "./modules/ai-search"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  environment         = var.environment
  
  subnet_id           = module.network.private_endpoint_subnet_id
}

# --- Monitoring & Observability ---

module "monitoring" {
  source              = "./modules/monitoring"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  environment         = var.environment
}

# --- Outputs ---

output "openai_endpoint" {
  value = module.openai.endpoint
}

output "ai_search_service_name" {
  value = module.ai_search.service_name
}
