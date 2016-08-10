$(document).ready(function(){
  var w=document.documentElement.clientWidth;
  $("html").css({fontSize:w/7.19});
})

$(function(){
  function User () {
  };

  User.prototype = {
    checkUser: function(ob){
      return $.get('/checkUser',ob).then(function(data){
        return data;
      });
    },
    addUser: function(){
      return $.get('/addUser').then(function(data){
        return data;
      })
    },
    deleteUserById: function(id){
      return $.get('/deleteUserById',{uid:id}).then(function(data){
        return data;
      })
    },
    updateUserById: function(data){
      return $.get('/updateUserById',{
        uid:data.uid,
        uname:data.uname,
        phone:data.phone,
        tel:data.tel,
      }).then(function(data){
        return data;
      })
    },
    getAllUser:function(){
      return $.get('/getAllUser').then(function(data){
        return data;
      },'json');
    },
    getUserById:function(id){
      return $.get('/getUserById',{uid:id}).then(function(data){
        return data;
      },'json');
    },
    getAuthById:function(id){
      return $.get('/getAuthById',{uid:id}).done(function(data){
        return data;
      },'json')
    },
    setPassword:function(obj){
      return $.get('/setPassword',obj).done(function(data){
        return data;
      },'json')
    }
  }
  var u = new User();



  var cw=document.documentElement.clientWidth;
  var ch=document.documentElement.clientHeight;
  $(".wlh-loginbox").css({width:cw,height:ch});
  //(ch-$(".wlh-login").innerHeight())/2
  $(".wlh-login").css({left:(cw-$(".wlh-login").innerWidth())/2,top:(ch-$(".wlh-login").innerHeight())/2});

  $(".wlh-resetbox").css({left:(cw-$(".wlh-resetbox").innerWidth())/2,top:-295});
  $(".wlh-resetbox2").css({left:(cw-$(".wlh-resetbox").innerWidth())/2,top:(ch-$(".wlh-resetbox").innerHeight())/2});

  $(".wlh-reset").css({left:(cw-$(".wlh-reset").innerWidth())/2,bottom:-$(this).height()-40});
  $(window).resize(function () {
    cw=document.documentElement.clientWidth;
    ch=document.documentElement.clientHeight;
    $(".wlh-loginbox").css({width:cw,height:ch});
    //(ch-$(".wlh-login").innerHeight())/2
    $(".wlh-login").css({left:(cw-$(".wlh-login").innerWidth())/2,top:(ch-$(".wlh-login").innerHeight())/2});

    $(".wlh-resetbox").css({left:(cw-$(".wlh-resetbox").innerWidth())/2,top:-295});
    $(".wlh-resetbox2").css({left:(cw-$(".wlh-resetbox").innerWidth())/2,top:(ch-$(".wlh-resetbox").innerHeight())/2});

    $(".wlh-reset").css({left:(cw-$(".wlh-reset").innerWidth())/2,bottom:-$(this).height()-40});
  })

  $(function(){
    $(".mylogin").validate({
      rules:{
        username:{
          required:true,
          maxlength:15,
          minlength:5
        },
        userps:{
          required:true,
          maxlength:15,
          minlength:6
        }
      },
      messages:{
        username:{
          required:"请输入账号！"
        },
        userps:{
          required:"请输入密码！"
        }
      }
    })

    $(".myreset").validate({
      rules:{
        username2:{
          required:true,
          maxlength:15,
          minlength:5
        },
        userps1:{
          required:true,
          maxlength:15,
          minlength:6
        },
        userps2:{
          required:true,
          equalTo:"#mima"
        }
      },
      messages:{
        username:{
          required:"请输入账号！"
        },
        userps:{
          required:"请输入密码！"
        },
        userps2:{
          required:"请重新输入密码！"
        }
      }
    })
  })


  var wlh_num=0;
  $(".wlh-sub").click(function(){
    //var username=$("#username");
    //var flag=app.get(username);
    var us=$("[name='username']").val();
    var up=$("[name='userps']").val();
    var flag;
    u.checkUser({account:us,password:up}).then(function (data) {
      if(data){
        document.cookie="__uek__="+data.phone;
        document.cookie="___uek___="+data.password;
        setTimeout(function(){
          location.href="/app";
        },0)
      }else{
        wlh_num++;
        if(wlh_num<=3){
          var lefts=(cw-$(".wlh-login").innerWidth())/2;
          $(".wlh-login")
          .animate({left:lefts-20},60)
          .animate({left:lefts+40},60)
          .animate({left:lefts-40},60)
          .animate({left:lefts+40},60)
          .animate({left:lefts-40},60)
          .animate({left:lefts+20},60)
          $(".wlh-text>label.error").css("display","block").text("您输入的账号有误！");
          $(".wlh-ps>label.error").css("display","block").text("您输入的密码有误！");

        }else{
          $(".wlh-zhezhao").fadeIn(200);
          $(".wlh-resetbox2").fadeOut(200);
          $(".wlh-resetbox").animate({top:(ch-$(".wlh-resetbox").innerHeight())/2},300);
        }

      }
    })

    return false;
  })

  $(".wlh-zhezhao").click(function(){
    $(this).fadeOut(200);
  })

  $(".wlh-res").click(function () {
    if($("[name='username']").val()==""){

    }else{
      u.setPassword({account:$("[name='username']").val(),password:"123456"})
      $(".wlh-resetbox").animate({top:(ch-$(".wlh-resetbox").innerHeight())/2},300);
      $(".wlh-resetbox").delay(700).animate({top:-295},300);
    }

  })

  $(".wlh-xiugai").click(function(){
    $(".wlh-resetbox").animate({top:-295},300);
    $(".wlh-login").fadeOut(200);
    $(".wlh-reset").animate({bottom:(ch-$(".wlh-reset").innerHeight())/2},300);
    $("#username2").val($("#username").val());
    $(".myreset").submit(function(){
      u.setPassword({account:$("[name='username2']").val(),password:$("[name='userps1']").val()})

      $(".wlh-reset").animate({bottom:-ch-40},200);
      $(".wlh-zhezhao").fadeIn(200);
      $(".wlh-resetbox2").fadeIn(200);
      $(".wlh-zhezhao").delay(800).fadeOut(200);
      $(".wlh-login").delay(1000).fadeIn(200);
      wlh_num=0;
      $(".mylogin>input").val("");
      return false;
    })
  })

})
