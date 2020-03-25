exports.catchPromiseError = (next, controllerFn) => {
    controllerFn.catch((err) => {
        if(process.env.MODE.toLowerCase() === `dev`){
            console.log(err);
        }
        next(err)
    });
}