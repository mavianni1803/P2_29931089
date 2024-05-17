const ContactosModel = require ("../models/ContactosModel");

class ContactosController {
    constructor() {
        this.ContacModel = new ContactosModel();
        this.add = this.add.bind(this); 
    }

    async add(req, res) {
        console.log(req.body);
        if (!req.body.email || !req.body.name || !req.body.mensaje || !req.body.cell) {
            res.status(400).send("Colocar los datos completos que esto no es CANTV");
            return;
        }

        const ip =req.ip;
        const fecha= new Date().toISOString();

        console.log(req.body.email, req.body.name, req.body.mensaje, req.body.cell, ip, fecha);
        await this.ContacModel.crearDatos(
            req.body.email,
            req.body.name,
            req.body.mensaje,
            req.body.cell,
            ip,
            fecha
        );

        const datos = await this.ContacModel.obtenerAllDatos();
        console.log(datos);
        res.redirect("/");
    }
}

module.exports = ContactosController;