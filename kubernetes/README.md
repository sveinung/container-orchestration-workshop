Setup
=====

Install kubectl (http://kubernetes.io/docs/user-guide/prereqs/)

Install minikube ```http://kubernetes.io/docs/getting-started-guides/minikube/```


Ingress
=======

```kubectl create -f nginx-ingress-rc.yaml```

You'll find the IP (thats fronting the ingress) ```minikube ip```
