var express = require('express');
var router = express.Router();
var ContactosModel = require('../models/ContactosModel');


const contactosModel = new ContactosModel();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Debes iniciar sesión para ver esta página.');
  res.redirect('/auth/login');
}

router.get('/', ensureAuthenticated, async (req, res, next) => {
  try {
    const contactos = await contactosModel.obtenerAllContactos();
    res.render('contactos', { data: contactos }); 
  } catch (err) {
    console.error('Error al obtener los contactos:', err);
    req.flash('error_msg', 'Ocurrió un error al obtener los contactos.');
    res.redirect('/');
  }
});

module.exports = router;
