Setup
=====

Installer kubectl (http://kubernetes.io/docs/user-guide/prereqs/)

Installer minikube ```http://kubernetes.io/docs/getting-started-guides/minikube/```

Ymse ressurser
--------------

minikube-tutorial: https://medium.com/@claudiopro/getting-started-with-kubernetes-via-minikube-ada8c7a29620#.pdiz0yg66

Eksempler på deployment- og servicefiler: https://github.com/kubernetes/kubernetes/tree/master/examples/guestbook

HTTP-trafikk inn i clusteret med Ingress
----------------------------------------

```kubectl create -f nginx-ingress-rc.yaml```

IPen til clusteret er den samme du bruker til å gå mot ingressen du satte opp ```minikube ip```

[Dokumentasjon](http://kubernetes.io/docs/user-guide/ingress/)

[NGINX, Inc sin Ingress Controller](https://github.com/nginxinc/kubernetes-ingress/tree/master/examples/complete-example)
