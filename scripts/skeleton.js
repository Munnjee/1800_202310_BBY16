//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
  console.log($('#navbarPlaceholder').load('./text/nav.html'));
  console.log($('#nullNavbarPlaceholder').load('./text/navNull.html'));

}
loadSkeleton();  //invoke the function
