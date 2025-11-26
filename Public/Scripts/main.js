let index = 0;
slideShow();
function slideShow()
{
    slides_arr = document.getElementsByClassName("slides");
    let i;
    for(i=0; i<slides_arr.length; i++)
        {
            slides_arr[i].style.display = "none";
        }
    index++;
    if(index > slides_arr.length)
        {
            index = 1;
        }
    slides_arr[index-1].style.display = "block";
    setTimeout(slideShow, 2500);
}