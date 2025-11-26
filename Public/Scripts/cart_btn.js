function fun(ele)
{
    const container = ele.parentElement;
    if(ele.innerText === "Add To Cart")
    {
        container.innerHTML = `
        <span onclick="fun(this)" style="padding: 10px;">-</span>
        <span class="qty" style="padding: 10px;">1</span>
        <span onclick="fun(this)" style="padding: 10px;">+</span>
        `
    }
    else if(ele.innerText === '+')
    {
        const qty = container.querySelector(".qty");
        qty.innerText = parseInt(qty.innerText) + 1;
    }
    else if(ele.innerText === "-")
    {
        const qty = container.querySelector(".qty");
        let count = parseInt(qty.innerText)
        if(count > 1)
        {
            qty.innerText = count - 1;
        }
        else
        {
            container.innerHTML = `
            <span onclick="fun(this)">Add To Cart</span>
            `
        }
    }
}