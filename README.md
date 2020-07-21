# Variables d'environnement 

MONGO_CONNECT_STRING 

Chaine de connection à la base mongodb
Format mongodb://<login>:<password>@<adresse>:<port>/<database>

    export MONGO_CONNECT_STRING='mongodb://admproject:admproject@127.0.0.1:27017/projectform'

PORT

Port de bind du nodejs
   
    export PORT=3000