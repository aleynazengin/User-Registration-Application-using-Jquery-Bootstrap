  $('#alert').hide();
  $('#setalert').hide();
  $('#sendpagealert').hide();
  $('#sendpagesuccessAlert').hide();
  $('#loginAlert').hide();
  $('#successAlert').hide();
  $('#successLoginAlert').hide();

$(document).ready(function(){

  //console.log(localStorage.getItem('email'));
  var searchParams = new URLSearchParams(window.location.search);
    let param = searchParams.get('id');
    
    $('#loginEmail').val(param);

     var validated= false;
     $('input[name=password1]').on("cut copy paste",function(e) {
      e.preventDefault();
      });

   $('input[name=password2]').on("cut copy paste",function(e) {
       e.preventDefault();
      });

    $('#setpasswordButton').click(function(e) {
    e.preventDefault();
    
     var data = {
       email: $('#setPasswordEmail').val(),
       password: $('input[name=password1]').val(),
       confirmPassword: $('input[name=password2]').val(),
       code: localStorage.getItem('code')
     }

     var dataJson = JSON.stringify(data);
     console.log(dataJson);
     
     $.post({
       url: "http://localhost:8084/setPassword",
       data: dataJson,
       contentType: 'application/json;'
     })
       .fail(function(resp) {
        var jsonErrorMessages = $.parseJSON(resp.responseText);
        $('#setalert').html(jsonErrorMessages.message +"!");
        $("#dvCountDown").hide();  
        $('#setalert').show();
         
       })
       .done(function() {
        $('#setalert').hide();
        var seconds = 5;  
        $("#dvCountDown").show();  
        $("#lblCount").html(seconds); 
          var setemail= $('#setPasswordEmail').val();
          console.log(setemail);
          setInterval(function () {  
              seconds--;  
              $("#lblCount").html(seconds);  
              if (seconds == 0) {  
                  $("#dvCountDown").hide();  
                  window.location.href = "http://localhost:8080/statics/index.html?id="+setemail; 
                  localStorage.setItem('email',setemail);
                  $('#loginEmail').val(localStorage.getItem('email'));
              }  
          }, 1000); 

       });
   
    });
 
    $('#sendEmailButton').click(function(e) {
      e.preventDefault();
      
      var data = {
        email: $('#sendEmailInput').val()
      }

      var dataJson = JSON.stringify(data);
      
      $.post({
        url: "http://localhost:8084/sendEmail",
        data: dataJson,
        contentType: 'application/json;',
        success:function(respon) {
          var stringsuccess = JSON.stringify(respon);
          var jsonErrorMessages = $.parseJSON(stringsuccess);

          $('#sendpagesuccessAlert').html(jsonErrorMessages.message);
          $('#sendpagealert').hide();
          $('#sendpagesuccessAlert').show();
        },
        error:function(resp) {
          var jsonErrorMessages = $.parseJSON(resp.responseText);
          $('#sendpagealert').html(jsonErrorMessages.message +"!");
          $('#sendpagealert').show();
          $('#sendpagesuccessAlert').hide();
        }
      });
    
    });

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


            if ($('#rememberme').is(':checked')) {
             
              var loginemail = $('#loginEmail').val();
              var loginpassword= $('input[name=loginPassword]').val();
              // set cookies to expire in 60 days
              $.cookie('email', loginemail, { expires: 60 });
              $.cookie('password', loginpassword, { expires: 60 });
              $.cookie('remember', true, { expires: 60 });
              } 
              
              else {
              // reset cookies
              
              $.cookie('email', null, { expires: -1 });
              $.cookie('password', null, { expires: -1 });
              $.cookie('remember', null, { expires: -1 });
              }
              
            window.location.href='welcomepage.html';
          });
      }
    
    });

    //1.remember me çalışmıyor. 4.otomatik doldur.


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
     
    $("#sendEmailInput").on('keyup', function() {
        var currentemail = $(this).val();
        var minn = parseInt($(this).attr("minlength"));
        var maxx = parseInt($(this).attr("maxlength"));
    
        checkEmail(currentemail,minn,maxx,this);
    });

    $("#setPasswordEmail").on('keyup', function() {
        var currentE = $(this).val();
        var Min = parseInt($(this).attr("minlength"));
        var Max = parseInt($(this).attr("maxlength"));
    
        checkEmail(currentE,Min,Max,this);
    });

    $('input[name=password1]').on('keyup', function() {
      var passwordcurrent = $(this).val();
      var pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      if (pattern.test(passwordcurrent)) {
        $(this).css({"border": "5px solid #34F458"});
        validated=true;
      } 
      else {
        $(this).css({"border": "5px solid #fdf147"});
        validated=false;
      }
    });

    $('input[name=password2]').on('keyup', function() {
      var passwordCurrent = $(this).val();
      var pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      if (pattern.test(passwordCurrent)) {
        $(this).css({"border": "5px solid #34F458"});
        validated=true;
      } 
      else {
        $(this).css({"border": "5px solid #fdf147"});
        validated=false;
      }
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