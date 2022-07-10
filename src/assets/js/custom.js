$(function() {
	 // Wishlist icon change on hover
    $('.wishlist-icon').hover(function() {
      $(this).find('i').toggleClass('fa fa-heart-o fa fa-heart');
    });
    $('.wishlist-icon').click(function() {
      $(this).find('i').toggleClass('fa fa-heart-o fa fa-heart');
    });

    // Cart Pop-up
    $('.cart-open-icon').click(function(){
        $('body').toggleClass('is-visible');
    });

    $('.PageOverlay,.cartCloseBtn').click(function(){
        $('body').removeClass('is-visible');
    });

    //  Social media share button
    $('.shareIco').click(function(){
        $('.share-box .socials-box').toggleClass('active');
    });

    // Search hide on window click
    $(document).click(function(){
        $('.search-box.popup').removeClass('active');
    });

    $('.search-box.popup').click(function( event ) {
      event.stopPropagation();
    });


    // For mobile height
    // // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    // let vh = window.innerHeight * 0.01;
    // // Then we set the value in the --vh custom property to the root of the document
    // document.documentElement.style.setProperty('--vh', `${vh}px`);

    // // We listen to the resize event
    // window.addEventListener('resize', () => {
    //   // We execute the same script as before
    //   let vh = window.innerHeight * 0.01;
    //   document.documentElement.style.setProperty('--vh', `${vh}px`);
    // });
     function appHeight() {
        var doc = document.documentElement;
        doc.style.setProperty('--vh', (window.innerHeight/100) + 'px');
      }
      window.addEventListener('resize', appHeight);
      appHeight();

     //  Checkout cart
    $('.checkout-cart-btn').click(function(){
        $('.checkout-right-wrapper').toggleClass('active');
    });
    $('.checkoutMobileBtn ').click(function(){
        $('.checkout-right-wrapper').removeClass('active');
    });

    // Mobile filter
    $(document).on('click', '.stuckSortingBtn', function(){
        $('.PageOverlay').toggleClass('is-visible');
        $('.MobileFilterSortingSidebar').toggleClass('activeMobileFilterSortingSidebar');
    });
    $(document).on('click', '.mobileSortingItem', function(){
        $('.PageOverlay').removeClass('is-visible ');
        $(".MobileFilterSortingSidebar").removeClass('activeMobileFilterSortingSidebar');
        $('.cartOverlay').fadeOut();
        $('.mobileSortingItem').removeClass('mobileSortingItemActive');
        $(this).toggleClass('mobileSortingItemActive');
    });
    $(document).on('click', '.stuckFilterBtn', function(){
        $('.categories-border-wrapper').toggleClass('active');
    });
    $(document).on('click', '.categories-border-wrapper .closeIcoBtn', function(){
        $('.categories-border-wrapper').removeClass('active');
    });
    $(document).on('click', '.PageOverlay', function(){
        $(".MobileFilterSortingSidebar").removeClass('activeMobileFilterSortingSidebar');
        $(this).removeClass('is-visible');
    });

    // Remove disabled from input on click to edit
    $('.profileEdits').click(function(event){
        event.preventDefault();
        $(this).parent().parent().find('.account-profile-fields').removeAttr("disabled")
        $(this).parent().parent().find('.profile-page-button').css('display','inline-block');
        $(this).css({"display": "block","visibility": "hidden"});
    });

    // Filter 
    $('#sidebar input').change(function() {
    if ($(this).prop('checked')==true){  
            $('.clearFilterBtn').css("display","inline-block");
        }else{
            $('.clearFilterBtn').css("display","none");
        }
    });

    $('.clearFilterBtn').click(function() {
        $('#sidebar input').attr('checked', false);
        $(this).css("display","none");
    });

});