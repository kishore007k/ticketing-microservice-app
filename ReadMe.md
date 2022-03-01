# Create Secret

To create a secret inside the kubernetes give the following command `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=thisisasecretkey` here **JWT_KEY** is the key and **thisisasecretkey** is the value.

This can be used inside the pods as an env variable by giving

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-depl
  labels:
    app: auth
spec:
  replicas: 1
  selector:
    matchLabels:
      app: auth
  template:
    metadata:
      labels:
        app: auth # the selector above will match this label
    spec:
      containers:
        - name: auth # this is only used for login purposes
          image: kishore007k/auth
          env:
            - name: JWT_KEY
              valueFrom:
                secretKeyRef:
                  name: jwt-secret
                  key: JWT_KEY
```