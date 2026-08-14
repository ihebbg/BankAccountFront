#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Pipeline de déploiement CI/CD local pour Angular Front sur Kubernetes (Docker Desktop)
.DESCRIPTION
    Construit l'image Docker, la tag, et la déploie sur Kubernetes
#>

param(
    [string]$ImageTag = $(git rev-parse --short HEAD),
    [string]$Namespace = "default"
)

$ErrorActionPreference = "Stop"
$ImageName = "bankaccount-front"

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Pipeline CI/CD - Angular Front" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# 1. Build Docker image
Write-Host "`n[1/5] Building Docker image..." -ForegroundColor Yellow
docker build -t "${ImageName}:${ImageTag}" -t "${ImageName}:latest" .
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Image built: ${ImageName}:${ImageTag}" -ForegroundColor Green

# 2. Update deployment file
Write-Host "`n[2/5] Updating front-deployment.yaml..." -ForegroundColor Yellow
$DeploymentFile = "front-deployment.yaml"
$Content = Get-Content $DeploymentFile -Raw
$UpdatedContent = $Content -replace "image: bankaccount-front:.*", "image: ${ImageName}:${ImageTag}"
Set-Content $DeploymentFile $UpdatedContent
Write-Host "✅ Deployment file updated with image tag: ${ImageTag}" -ForegroundColor Green

# 3. Apply deployment to Kubernetes
Write-Host "`n[3/5] Applying deployment to Kubernetes..." -ForegroundColor Yellow
kubectl apply -f $DeploymentFile
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Kubernetes apply failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Deployment applied" -ForegroundColor Green

# 4. Wait for rollout
Write-Host "`n[4/5] Waiting for rollout to complete..." -ForegroundColor Yellow
kubectl rollout status deployment/bankaccount-kube-deployment-front -n $Namespace --timeout=5m
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Rollout failed!" -ForegroundColor Red
    kubectl describe pod -l app=bankaccount -n $Namespace
    exit 1
}
Write-Host "✅ Rollout successful" -ForegroundColor Green

# 5. Display deployment info
Write-Host "`n[5/5] Deployment Status:" -ForegroundColor Yellow
Write-Host "`nPods:" -ForegroundColor Cyan
kubectl get pods -l app=bankaccount -n $Namespace

Write-Host "`nService:" -ForegroundColor Cyan
kubectl get svc bankaccount-front-service -n $Namespace

Write-Host "`n✅ Deployment complete!" -ForegroundColor Green
Write-Host "`nAccess your application at:" -ForegroundColor Cyan
$NodePort = kubectl get svc bankaccount-front-service -o jsonpath='{.spec.ports[0].nodePort}' -n $Namespace
Write-Host "  http://localhost:$NodePort`n" -ForegroundColor Green
