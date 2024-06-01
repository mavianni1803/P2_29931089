const ContactosModel = require ("../models/ContactosModel");
const nodemailer = require('nodemailer');
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_DESTINO1 = process.env.EMAIL_DESTINO1;

class ContactosController {
  constructor() {
    this.contactosModel = new ContactosModel();
    this.add = this.add.bind(this);
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });
  }


   enviarCorreo(email, name, mensaje, EMAIL_USER, EMAIL_DESTINO1) {
    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_DESTINO1, // Agrega más destinatarios si es necesario
      subject: 'Nuevo registro de usuario',
      text: 'Nombre: '+name+'\nEmail: '+email+'\nMensaje: '+mensaje
    };
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Correo enviado');
      }
    });
  }

    async obtenerIp() {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip; // Retorna la ip
      } catch (error) {
        console.error('Error al obtener la ip:', error);
        return null; // Retorna null si hay un error
      }
    }
  
    async obtenerPais(ip) {
      try {
        const response = await fetch('https://ipinfo.io/'+ip+'?token=56abbbd604293d');
        const data = await response.json();
        return data.country; // Retorna el país
      } catch (error) {
        console.error('Error al obtener el país:', error);
        return null; // Retorna null si hay un error
      }
    }

    async add(req, res) {
        console.log(req.body);
        if (!req.body.email || !req.body.name || !req.body.mensaje || !req.body.cell) {
            res.status(400).send("Colocar los datos completos que esto no es CANTV");
            return;
        }

        const ip =req.ip;
        const fecha= new Date().toISOString();
        const pais = await this.obtenerPais(ip);

        console.log(req.body.email, req.body.name, req.body.mensaje, req.body.cell, ip, fecha, pais);
        await this.ContacModel.crearDatos(
            req.body.email,
            req.body.name,
            req.body.mensaje,
            req.body.cell,
            ip,
            fecha,
            pais
        );

        const datos = await this.ContacModel.obtenerAllDatos();
        await this.enviarCorreo(email, nombre, mensaje, EMAIL_USER, EMAIL_DESTINO1);
        console.log(datos);
        res.redirect("/");
    }
}

module.exports = ContactosController;