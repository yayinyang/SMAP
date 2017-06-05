function changePage(pageName) {

    var fatherDiv=$(".container");
    $(".tapJump").remove();
    if(pageName=="pageOne"){
    var str='<ul class="tapJump" >'+
            '<li onclick="changePage(\'pageOne\')" class="active"><a href="#pageOne">1</a></li>'+
            '<li onclick="changePage(\'pageTwo\')"><a href="#pageTwo">2</a></li>'+
            '<li onclick="changePage(\'pageThree\')"><a href="#pageThree">3</a></li>'+
            '<li onclick="changePage(\'pageFour\')"><a href="#pageFour">4</a></li>'+
            '</ul>';
    $(fatherDiv).append(str);

    }else if(pageName=="pageTwo"){
        var str= '<ul class="tapJump" >'+
        '<li onclick="changePage(\'pageOne\')" ><a href="#pageOne">1</a></li>'+
        '<li onclick="changePage(\'pageTwo\')" class="active"><a href="#pageTwo">2</a></li>'+
        '<li onclick="changePage(\'pageThree\')"><a href="#pageThree">3</a></li>'+
        '<li onclick="changePage(\'pageFour\')"><a href="#pageFour">4</a></li>'+
        '</ul>';
        $(fatherDiv).append(str);
    }else if(pageName=="pageThree"){
        var str='<ul class="tapJump" >'+
        '<li onclick="changePage(\'pageOne\')" ><a href="#pageOne">1</a></li>'+
        '<li onclick="changePage(\'pageTwo\')"><a href="#pageTwo">2</a></li>'+
        '<li onclick="changePage(\'pageThree\')" class="active"><a href="#pageThree">3</a></li>'+
        '<li onclick="changePage(\'pageFour\')"><a href="#pageFour">4</a></li>'+
        '</ul>';
        $(fatherDiv).append(str);
    }else if(pageName=="pageFour"){
        var str='<ul class="tapJump" >'+
        '<li onclick="changePage(\'pageOne\')" ><a href="#pageOne">1</a></li>'+
        '<li onclick="changePage(\'pageTwo\')"><a href="#pageTwo">2</a></li>'+
        '<li onclick="changePage(\'pageThree\')"><a href="#pageThree">3</a></li>'+
        '<li onclick="changePage(\'pageFour\')" class="active"><a href="#pageFour">4</a></li>'+
        '</ul>';
        $(fatherDiv).append(str);
    }
}


window.onscroll =  function() {
    var scrollY = self.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
    var pageOne = document.querySelector("#pageOne").offsetHeight;
    var pageTwo = document.querySelector("#pageTwo").offsetHeight;
    var pageThree = document.querySelector("#pageThree").offsetHeight;
    var pageFour = document.querySelector("#pageFour").offsetHeight;
    var fatherDiv=$(".container");

    if(scrollY>pageOne && scrollY<pageTwo/2+pageOne){
        $(".tapJump").remove();
        var str= '<ul class="tapJump" >'+
            '<li onclick="changePage(\'pageOne\')" ><a href="#pageOne">1</a></li>'+
            '<li onclick="changePage(\'pageTwo\')" class="active"><a href="#pageTwo">2</a></li>'+
            '<li onclick="changePage(\'pageThree\')"><a href="#pageThree">3</a></li>'+
            '<li onclick="changePage(\'pageFour\')"><a href="#pageFour">4</a></li>'+
            '</ul>';
        $(fatherDiv).append(str);
    }else if(scrollY>pageTwo+pageOne && scrollY<pageTwo+pageOne+pageThree/2){
        $(".tapJump").remove();
        var str='<ul class="tapJump" >'+
            '<li onclick="changePage(\'pageOne\')" ><a href="#pageOne">1</a></li>'+
            '<li onclick="changePage(\'pageTwo\')"><a href="#pageTwo">2</a></li>'+
            '<li onclick="changePage(\'pageThree\')" class="active"><a href="#pageThree">3</a></li>'+
            '<li onclick="changePage(\'pageFour\')"><a href="#pageFour">4</a></li>'+
            '</ul>';
        $(fatherDiv).append(str);
    }else if(scrollY>pageTwo+pageOne+pageThree){
        $(".tapJump").remove();
        var str='<ul class="tapJump" >'+
            '<li onclick="changePage(\'pageOne\')" ><a href="#pageOne">1</a></li>'+
            '<li onclick="changePage(\'pageTwo\')"><a href="#pageTwo">2</a></li>'+
            '<li onclick="changePage(\'pageThree\')"><a href="#pageThree">3</a></li>'+
            '<li onclick="changePage(\'pageFour\')" class="active"><a href="#pageFour">4</a></li>'+
            '</ul>';
        $(fatherDiv).append(str);
    }else if(scrollY<pageOne/2){
        $(".tapJump").remove();
        var str= '<ul class="tapJump" >'+
            '<li onclick="changePage(\'pageOne\')" class="active"><a href="#pageOne">1</a></li>'+
            '<li onclick="changePage(\'pageTwo\')" ><a href="#pageTwo">2</a></li>'+
            '<li onclick="changePage(\'pageThree\')"><a href="#pageThree">3</a></li>'+
            '<li onclick="changePage(\'pageFour\')"><a href="#pageFour">4</a></li>'+
            '</ul>';
        $(fatherDiv).append(str);
    }
}