// Number of total students
var studentCount = $("li").length;
console.log(studentCount);

//Total number of pages needed
var numberOfPages = Math.ceil(studentCount/10);
console.log(numberOfPages);

//Empty array to put search results in
var results = [];
console.log("Empty Array");
//Dynamically add html markup
function pageSetup(){
    
    $("div.page-header").append("<div class='student-search'><input placeholder='Search for students...'><button>Search</button></div>");

    $(".student-list").append("<div class='message'><p>No matches found.</p></div>");

    $(".message").hide();
}

//Function enabling pagination
function pagination(){
    console.log("Enabling pagination");
    $("li.student-item").slice(10).hide(); 
    var $pageUlist = $("<ul></ul>");
    $(".page").append("<div class='pagination'></div>");  
    $(".pagination").append($pageUlist);

 //Loop through page numbers with page links
    for(var i = 0; i < numberOfPages; i++){
        
        var link = "<a href='#'>" + (i+1) + "</a>";
        var $pageListItem = $("<li>" + link +"</li>");
        $(".pagination ul").append($pageListItem);  
    }

    $(document).ready(function(){
    $(".pagination a:contains(1)").addClass("active");
    });

    //Click event bound to pagination links
    $(".pagination a").click(function(){
        $(".student-item").hide();
    //Use page number text as calculation starting point
        var currentPage = $(this).text();  
    //Remove active class from other clicked links
        $(".pagination a").removeClass("active"); 
    //Add active class to currently clicked link    
        $(this).addClass("active");  
        var startIndex = (currentPage * 10) - 10;
        var endIndex = currentPage * 10;


        //If results array isn't empty then show ten per page
        if (results.length > 1){
            $(".student-item").hide();
            $(results).slice(startIndex, endIndex).show();
        } else {
        //Show 10 students per page using start and end index
            $(".student-item").slice(startIndex, endIndex).show();  
        }
    });
}

//Enabling live search
function search(){
    $("input").keyup(function(){  
        $(".pagination a").removeClass("active");
        $(".pagination a:contains(1)").addClass("active");

        $(".student-item").hide();

        //Set results array to empty
         results = [];

        //Get search input
        var search = $("input").val().toLowerCase();

        //If search input matches? Get name and email from each student list item and push to empty array
    
        $(".student-list").children().each(function(){
            var email = $(this).find(".email").text();
            var name = $(this).find("h3").text();

            if (email.indexOf(search) !== -1|| name.indexOf(search) !== -1){
                results.push(this);
            }
        });

        //Show search results from results array
        $(results).each(function(){ 
            $(this).show();
        });

        //If no search results, show 'No matches found' message
        if (results.length < 1) { 
            $(".message").show();
        } else {
            $(".message").hide();
        }

        //Hide results in array starting at the tenth index
        $(results).slice(10).hide(); 
        
        //Show pagination list items
        $(".pagination li").show(); 
        
        //Hide pagination list items
        $(".pagination li").slice(Math.ceil(results.length/10)).hide();  
                                                                        
        //Using results.length math.ceil calcultations as starting index
        if(results.length <= 10){
            //Hide pagination list items results array length is less than or equal to 10
            $(".pagination ul").children().hide();  
                                            
        }
    });
}
pagination();
pageSetup();
search();