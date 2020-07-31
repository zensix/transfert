# Variables d'environnement 

### MONGODB_USER 
Compte d'acces a la base mongo
### MONGODB_PASSWORD 
Mot de passe du compte d'acces a la base mongo
Defaut: app
### DATABASE_SERVICE_NAME 
Nom du service docker mongo ou adresse du server mongo
Defaut: database
### MONGODB_DATABASE 
Nom de la base mongo
Defaut: prjform

### PORT
Port d'ecoute du nodejs
Defaut: 8080

### IMPORTANT
Si vous modifiez les variables par du docker-compose.yaml, penser a modifier egalement le fichier mongo-init.js

        db.createUser(
        {
            user: "app", <-- valeur de MONGODB_USER
            pwd: "app",  <-- valeur de MONGODB_PASSWORD
            roles: [
                {
                    role: "readWrite",
                    db: "prjform"  <-- valeur de MONGODB_DATABASE
                }
            ]
        }
        );

# Demarrage

    docker-compose up --build  -d

# Acces :
    http://<votre ip>:8080

Le compte d'acces par defaut est "admin" mot de passe "admin" ( creation au demarrage)

