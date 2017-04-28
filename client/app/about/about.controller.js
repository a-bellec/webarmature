'use strict';

export default class AboutController {
  constructor(){
    $('#sidebarLinks a').click(function(){
      $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top - 50
      }, 500);
      return false;
    });

    var lastId;
    var topMenu = $("#sidebarLinks");
    var menuItems = topMenu.find("a");
    var scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

    $(window).scroll(function(){
      // Get container scroll position
      var fromTop = $(this).scrollTop() + 51;


      // Get id of current scroll item
      var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
          return this;
      });
      // Get the id of the current element
      cur = cur[cur.length-1];
      var id = cur && cur.length ? cur[0].id : "";

      if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
          .parent().removeClass("active")
          .end().filter("[href='#"+id+"']").parent().addClass("active");
      }
    });
  }
}
