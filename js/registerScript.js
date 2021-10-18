$(document).ready(function(){
    var searchParams = new URLSearchParams(window.location.search);
    let param = searchParams.get('error');
    if(param==1)
    {
        $('#alert').html("No user found.You need to register first.");
        $('#alert').show();
    }
    if(param==2)
    {
        $('#alert').html("Code does not match .");
        $('#alert').show();
    }

});