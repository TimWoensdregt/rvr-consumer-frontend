jQuery(document).ready(function() {
   $('.ajax-form').each(function(index, element) {
       $(this).submit(function(e) {

           //Stop form submission & check the validation
           e.preventDefault();

           // Variable declaration
           window.error = false;
           var required = $(element).find('.required');
           var required_val = $(element).find('.required').val();

           $(required).each(function() {
               // Form field validation
               if (required_val.length == 0) {
                   window.error = true;
                   $(this).parent().find('.form-error').fadeIn(500);
                   $(element).find('.mail-success').fadeOut(500);
               } else {
                   $(this).parent().find('.form-error').fadeOut(500);
                   $(element).find('.mail-fail').fadeOut(500);
               }
           });
                      
           // If there is no validation error, next to process the mail function
           if (window.error == false) {

               /* Post Ajax function of jQuery to get all the data from the submission of the form as soon as the form sends the values to email.php*/
               $.post("email.php", $(element).serialize(), function(result) {
                   //Check the result set from email.php file.
                   if (result == 'sent') {
                       //If the email is sent successfully, reset form
                       $(element).each(function() {
                           this.reset();
                       });
                       //Display the success message
                       $(element).find('.mail-success').fadeIn(500);
                   } else {
                       //Display the error message
                       $(element).find('.mail-success').fadeOut(500);
                       $(element).find('.mail-fail').fadeIn(500);
                   }
               });
           }
       });
   });
});