.PHONY: help build deploy deploy-local logs status clean

DOCKER_IMAGE := bankaccount-front
NAMESPACE := default
TAG := $(shell git rev-parse --short HEAD)

help:
	@echo "================================"
	@echo "BankAccount Front CI/CD Commands"
	@echo "================================"
	@echo ""
	@echo "Local Development:"
	@echo "  make build              - Build Docker image locally"
	@echo "  make deploy-local       - Build and deploy to Kubernetes (local)"
	@echo "  make dev                - Run npm start (Angular dev server)"
	@echo ""
	@echo "Kubernetes Management:"
	@echo "  make logs               - View pod logs"
	@echo "  make status             - Check deployment status"
	@echo "  make restart            - Restart deployment"
	@echo "  make clean              - Delete deployment from Kubernetes"
	@echo ""
	@echo "Info:"
	@echo "  make url                - Show service URL"

build:
	@echo "Building Docker image: $(DOCKER_IMAGE):$(TAG)"
	docker build -t $(DOCKER_IMAGE):$(TAG) -t $(DOCKER_IMAGE):latest .
	@echo "✅ Build complete"

deploy-local:
	@echo "Deploying to Kubernetes..."
	pwsh ./deploy-local.ps1 -ImageTag $(TAG) -Namespace $(NAMESPACE)

dev:
	npm start

logs:
	kubectl logs -f deployment/bankaccount-kube-deployment-front -n $(NAMESPACE) --tail=100

status:
	@echo "Deployment Status:"
	kubectl get deployment bankaccount-kube-deployment-front -n $(NAMESPACE) -o wide
	@echo ""
	@echo "Pods:"
	kubectl get pods -l app=bankaccount -n $(NAMESPACE)
	@echo ""
	@echo "Service:"
	kubectl get svc bankaccount-front-service -n $(NAMESPACE)

restart:
	kubectl rollout restart deployment/bankaccount-kube-deployment-front -n $(NAMESPACE)
	kubectl rollout status deployment/bankaccount-kube-deployment-front -n $(NAMESPACE)
	@echo "✅ Deployment restarted"

clean:
	kubectl delete deployment bankaccount-kube-deployment-front -n $(NAMESPACE)
	kubectl delete svc bankaccount-front-service -n $(NAMESPACE)
	@echo "✅ Deployment cleaned up"

url:
	@echo "Service URL: http://localhost:$$(kubectl get svc bankaccount-front-service -n $(NAMESPACE) -o jsonpath='{.spec.ports[0].nodePort}')"

describe:
	kubectl describe deployment bankaccount-kube-deployment-front -n $(NAMESPACE)
	@echo ""
	kubectl describe pod -l app=bankaccount -n $(NAMESPACE) | head -50
