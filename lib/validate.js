module.exports = () => {

    const self = {};

    self.toNoScript = (str) => {
        str = toString(str);
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    self.toNoMongoInj = (str) => {
        str = toString(str);
        return str.replace(/:/g, '&#058')
            .replace(/{/g, '&#123')
            .replace(/}/g, '&#125')
            .replace(/'/g, '&#039')
            .replace(/,/g, '&#044')
            .replace(/;/g, '&#059');
    };

    self.toSafe = (str) => {
        str = self.toNoMongoInj(str);
        return self.toNoScript(str);
    };
    // TODO
    self.allInput = (dataToClean) => {

        return dataToClean;

        /*
        if (!self.isArray(dataToClean)) {
            return self.toSafe(dataToClean)
        } else {
            for (let data of dataToClean)
                self.allInput(data);
        }*/
    };

    self.isArray = (array) => {
        return (Array.isArray(array))
    };

    self.isString = (str) => {
        return (str === undefined) ? undefined : str.length <= 1000;
    };

    self.isInt = (str) => {
        return (str === undefined) ? undefined : parseInt(str) >= 0
    };

    self.isBoolean = (str) => {
        return (str === true ||str === false)
    };

    self.isFloat = (str) => {
        return (str === undefined) ? undefined :    (parseFloat(str) !== null ||
                                                    parseFloat(str) !== undefined ||
                                                    parseFloat(str) !== false)
    };

    self.isEmail = (str) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return (str === undefined) ? undefined : regex.test(str);
    };

    self.isPhoneNbr = (str) => {
        const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/m;
        return (str === undefined) ? undefined : regex.test(str);
    };

    self.isDate = (str) => {
        const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2} ([0-9]{2}:){2}:[0-9]{1}$/;
        return (str === undefined) ? undefined : regex.test(str);
    };
    // TODO
    self.isPicture = (str) => {
        return true;
    };

    // TODO
    self.isIp = (str) => {
        return true;
    };

    self.isPostCode = (str) => {
        const regex = /^[0-9]{5}$/;
        return (str === undefined) ? undefined : regex.test(str);
    };

    return self
};