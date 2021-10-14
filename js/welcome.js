
var token = localStorage.getItem('token');
   console.log("token"+ token);

      $.ajax({
        url: "http://localhost:8084/api/hello",
        type: 'GET',
        headers: {"Authorization": "Bearer "+token},
      success:function(response) {
        console.log(response);
      },
      error:function() {
          window.location.href='index.html';
      }
      });

      $(document).ready(function(){
        $('#logout').click(function(){
          localStorage.removeItem('token');
          window.location.href='index.html';
        });
      });

      


