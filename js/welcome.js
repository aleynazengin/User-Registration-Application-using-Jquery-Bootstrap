
var token = localStorage.getItem('token');
   console.log("token"+ token);

      $.ajax({
        url: "http://localhost:8084/api/hello",
        type: 'GET',
        headers: {"Authorization": "Bearer "+token},
      success:function(response) {
        $('#welcomeMessage').html(response);
      },
      error:function() {
        $(location).prop('href', 'index.html');
          window.location.href='index.html';
      }
      });

      $(document).ready(function(){
        $('#logout').click(function(){
          localStorage.removeItem('token');
          window.location.href='index.html';
        });
      });