var structure = require('./structure.json');


exports.dbquery = {

    get_equals: function (target, condition) {

        if (structure === undefined) {
            console.log("le fichier structure.json n'a pas été chargé");
        } else if (condition === null || condition ["key"] === null) {
            console.log("vous n'avez pas spécifié les données d'entrée")
        } else {
            for (iteration of structure[target]) {
                if (iteration[condition["key"]] === condition["value"]) {
                    return iteration
                }
            }
        }
    }

    ,

    update_equals: function (target, condition, value, mode = none) {
        if (structure === undefined) {
            console.log("le fichier structure.json n'a pas été chargé");
        } else if (condition === null || condition ["key"] === null) {
            console.log("vous n'avez pas spécifié les données d'entrée")
        } else {
            for (iteration of structure[target]) {
                if (iteration[condition["key"]] === condition["value"]) {
                    structure[target][iteration][condition[key]] = value;
                }
            }
        }
    }
    ,

    exist: function (target, condition) {
        if (structure === undefined) {
            console.log("le fichier structure.json n'a pas été chargé");
        } else if (condition === null || condition ["key"] === null) {
            console.log("vous n'avez pas spécifié les données d'entrée")
        } else {
            return_val = false;
            for (iteration of structure[target]){
                if (iteration[condition["key"]] === condition["value"]) {
                    return_val = true;
                }
            }
            return return_val;
        }
    }
};

