# PARA Root Makefile
# Delegates backend commands to WhatZatppa/Makefile
# Frontend and other commands can be added here.

SHELL = /bin/bash
.SHELLFLAGS = -o pipefail -c

.PHONY: help
help: ## Print info about all commands
	@echo "PARA Project Commands"
	@echo ""
	@echo "Backend (WhatZatppa):"
	@cd WhatZatppa && $(MAKE) help
	@echo ""
	@echo "Root commands:"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "    \033[01;32m%-20s\033[0m %s\n", $$1, $$2}'

# =============================================================================
# Build & Test
# =============================================================================

.PHONY: build
build: codegen ## Compile all modules
	cd WhatZatppa && pnpm build

.PHONY: test
test: ## Run all tests
	cd WhatZatppa && pnpm test

.PHONY: codegen
codegen: ## Re-generate packages from lexicon/ files
	cd WhatZatppa && pnpm codegen

.PHONY: lint
lint: ## Run style checks and verify syntax
	cd WhatZatppa && pnpm verify

.PHONY: fmt
fmt: ## Run syntax re-formatting
	cd WhatZatppa && pnpm format

.PHONY: deps
deps: ## Installs dependent libs using 'pnpm install'
	cd WhatZatppa && pnpm install --frozen-lockfile

# =============================================================================
# Doctor Commands (delegated to backend)
# =============================================================================

.PHONY: doctor
doctor: ## Run all health checks on the full backend stack
	cd WhatZatppa && $(MAKE) doctor

.PHONY: pds-doctor
pds-doctor: ## Check PDS health, DID resolution, and blobstore
	cd WhatZatppa && $(MAKE) pds-doctor

.PHONY: bsky-doctor
bsky-doctor: ## Check AppView health and dataplane connectivity
	cd WhatZatppa && $(MAKE) bsky-doctor

.PHONY: dataplane-doctor
dataplane-doctor: ## Check dataplane database connectivity
	cd WhatZatppa && $(MAKE) dataplane-doctor

.PHONY: bsync-doctor
bsync-doctor: ## Check bsync health and database pool
	cd WhatZatppa && $(MAKE) bsync-doctor

.PHONY: ozone-doctor
ozone-doctor: ## Check Ozone health and admin configuration
	cd WhatZatppa && $(MAKE) ozone-doctor

.PHONY: postgres-doctor
postgres-doctor: ## Check Postgres connections, disk, and slow queries
	cd WhatZatppa && $(MAKE) postgres-doctor

.PHONY: redis-doctor
redis-doctor: ## Check Redis memory, hit rate, and connections
	cd WhatZatppa && $(MAKE) redis-doctor

.PHONY: caddy-doctor
caddy-doctor: ## Check Caddy config validity and SSL certificates
	cd WhatZatppa && $(MAKE) caddy-doctor

.PHONY: index-doctor
index-doctor: ## Verify production indexes exist in Postgres
	cd WhatZatppa && $(MAKE) index-doctor

.PHONY: pre-deploy
pre-deploy: ## Check if everything is ready for production deploy
	cd WhatZatppa && $(MAKE) pre-deploy

.PHONY: smoke-test
smoke-test: ## Run end-to-end smoke tests against production
	cd WhatZatppa && $(MAKE) smoke-test
