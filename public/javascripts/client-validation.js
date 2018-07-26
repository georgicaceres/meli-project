
/**
 * Takes a mail and check if it matches with a valid one.
 * @param   {string} mail the mail provided by the client
 *
 * @returns {boolean} 
 */
const checkEmail = (mail) => mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/);


jQuery.validator.addMethod("checkEmail", checkEmail, 'Por favor, ingrese un email válido');

$(function() {
    $('#registration').validate({
        rules: {
            name: {
                required: true,
                maxlength: 30
            },
            surname: {
                required: true,
                maxlength: 30
            },
            phone: {
                number: true
            },
            email: {
                required: true,
                checkEmail: true
            }
        },
        messages: {
            name: {
                required: 'Por favor, ingrese su nombre',
                maxlength: 'Por favor, ingrese a lo sumo 30 caracteres'
            },
            surname: {
                required: 'Por favor, ingrese su apellido',
                maxlength: 'Por favor, ingrese a lo sumo 30 caracteres'
            },
            phone: {
                number: 'Por favor, ingrese sólo números'
            },
            email: {
                required: 'Por favor, ingrese su email',
                email: 'Por favor, ingrese un email válido'
            }
        },
        submitHandler: function(form) {
            if ($('form').valid()) {
                form.submit();
            }
            return false;
        }
    });
});
