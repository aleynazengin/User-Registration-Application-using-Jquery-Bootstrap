$(document).ready(function(){
  var validated= false;
  $('#alert').hide();
  $('#loginAlert').hide();
  $('#successAlert').hide();
  $('#successLoginAlert').hide();

    $('#signin').click(function(e) {
       e.preventDefault();
       if(validated)
      {
        var data = {
          email: $('#loginEmail').val(),
          password: $('input[name=loginPassword]').val()
        }

        var dataJson = JSON.stringify(data);
        
        $.post({
          url: "http://localhost:8084/authenticate",
          data: dataJson,
          contentType: 'application/json;'
        })
          .fail(function(res) {
            var jsonErrorMessages = $.parseJSON(res.responseText);
            $('#loginAlert').html(jsonErrorMessages.message +"!")
            $('#loginAlert').show();
            
          })
          .done(function(responseToken) {
            console.log(responseToken);
            var stringtoken = JSON.stringify(responseToken);
            var json = JSON.parse(stringtoken);
            localStorage.setItem('token', json.token);
            window.location.href='welcomepage.html';
          });
      }
    
    });


    $('#signup').click(function(e) {
      e.preventDefault();
      if(validated)
      {
        var data = {
          email: $('#email').val(),
          username: $('#username').val()}

        var dataJson = JSON.stringify(data);
        
        $.post({
          url: "http://localhost:8084/api/register",
          data: dataJson,
          contentType: 'application/json;'
        })
          .fail(function(res) {
            var jsonErrorMessages = $.parseJSON(res.responseText);
            $('#alert').html(jsonErrorMessages.message +"!");
            $('#successAlert').hide();
            $('#alert').show();
            
          })
          .done(function(res) {
            alert("success");
            $('#successAlert').html("User successfully created. Check your email to verify your email.")
            $('#alert').hide();
            $('#successAlert').show();
          });
      }

      if($('#email').val()==="" || $('#username').val()==="")
      {
        $('#alert').html("Username or Email cannot be empty!");
        $('#alert').show();
      }
      console.log(validated);
    
    });

      $("#loginEmail").on('keyup', function() {
        var email = $(this).val();
        var minl = parseInt($(this).attr("minlength"));
        var maxl = parseInt($(this).attr("maxlength"));

        checkEmail(email,minl,maxl,this);
      });
    
      $("#username").on('keyup', function() {
        var username = $(this).val();
        var minl = parseInt($(this).attr("minlength"));
        var maxl = parseInt($(this).attr("maxlength"));

        checkUsername(username,minl,maxl,this);
        
      });

      $('input[name=loginPassword]').on('keyup', function() {
        var password = $(this).val();
        var minl = parseInt($(this).attr("minlength"));
        var maxl = parseInt($(this).attr("maxlength"));

        checkUsername(password,minl,maxl,this);
      });


      $("#email").on('keyup', function() {
        var current = $(this).val();
        var min = parseInt($(this).attr("minlength"));
        var max = parseInt($(this).attr("maxlength"));
    
        checkEmail(current,min,max,this);
      });

      function checkUsername(username,min,max,that)
      {
        if (username.length >= min && username.length <= max && username !=='') {
          $(that).css({"border": "5px solid #34F458"});
          validated=true;
        } 
        else {
          $(that).css({"border": "5px solid #fdf147"});
         validated=false;
        }
      }

      function checkEmail(email,min,max,that){
        var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        if (pattern.test(email) && email.length >= min && email.length <= max && email !=='') {
          $(that).css({"border": "5px solid #34F458"});
          validated=true;
        } 
        else {
          $(that).css({"border": "5px solid #fdf147"});
          validated=false;
        }
      }


    
  });