# BankAccountFront

## Déploiement sur Kubernetes (Docker Desktop)

Le front appelle `/api`. Nginx relaie ces requêtes vers le Service Kubernetes
`bankaccount-service:8080`, qui doit donc être déployé dans le même namespace.

1. Construire l'image visible par le cluster Docker Desktop :

   ```powershell
   docker build -t bankaccount-front:v1 .
   ```

2. Déployer ou vérifier le service back-end :

   ```powershell
   kubectl get service bankaccount-service
   ```

   Il doit exposer le port `8080` et sélectionner les pods du projet
   BankAccountServices.

3. Déployer le front :

   ```powershell
   kubectl apply -f front-deployment.yaml
   kubectl rollout status deployment/bankaccount-front
   kubectl get pods,service -l app=bankaccount-front
   ```

4. Ouvrir l'application (fonctionne même si le NodePort est attribué automatiquement) :

   ```powershell
   kubectl port-forward service/bankaccount-front-service 8080:80
   ```

   Puis ouvrir `http://localhost:8080`. Les appels à `/api/*` restent dans le
   même domaine et sont transmis au back-end sans configuration CORS.

### Diagnostic d'un pod `Pending` ou `ImagePullBackOff`

```powershell
kubectl describe pod -l app=bankaccount-front
kubectl get events --sort-by=.lastTimestamp
```

Si l'événement indique que `bankaccount-front:v1` est introuvable, reconstruire
l'image avec la commande ci-dessus, puis relancer le déploiement :

```powershell
kubectl rollout restart deployment/bankaccount-front
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
