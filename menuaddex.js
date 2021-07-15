document.addEventListener('DOMContentLoaded', async () => {

    const d = new Date();
    const date = d.getDate();
    const month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
    const n = month[d.getMonth()];
    const year = d.getFullYear();
    const dateStr = `${n} ${date}, ${year}`;

    const menuAddForm = document.querySelector("#menu_add_form")
    const previewButton = document.querySelector(".preview_button");
    const itemName = document.querySelector("#dish_name");
    const itemDesc = document.querySelector("#dish_description");
    const itemPrice = document.querySelector("#dish_price");
    const addButton  = document.querySelector(".send_button");
    const errorMessage = document.querySelector(".error_message");
    const confirmMessage = document.querySelector(".confirm_message");
    const primaryMenuSelect = document.querySelector("#primary-menu-select");
    const itemPreview = document.querySelector(".item_preview");
    const liveMenu = document.querySelector(".current_menu");
    const currentDate = document.querySelector("#current_date");
    const closeButton = document.querySelector("#ex_box_close");
    const overlay = document.querySelector(".overlay");



    let itemToDestroy;
    let primaryMenuChoice;
    let subMenu;
    
    let dishName;
    let dishDesc;
    let dishPrice;
    let currentMenuTarget;

    // display the current day
    currentDate.innerHTML= dateStr;

    // close the explanation box
    closeButton.addEventListener("click", function(e) {
        e.preventDefault()
        overlay.style.display = "none";
    });

    // select a menu to add to, activate matching submenu
    primaryMenuSelect.addEventListener('change', function(e) {
        if (subMenu != undefined) {
            subMenu.style.display = "none";
            subMenu = undefined;
        }

        primaryMenuChoice = e.target.value.toLowerCase();
        subMenu = document.querySelector(`[data-menu="${primaryMenuChoice}"]`);

        if (subMenu === null) {
            return;
        } else {
        subMenu.style.display = "inline-block";
        }
        
        return subMenu;
    });


    
    // preview the item to be added
    previewButton.addEventListener("click", function(e) {
        e.preventDefault();
        // allSubMenus.style.color = "black";
        
        subMenuChoice = subMenu.value.toLowerCase();

        currentMenuTarget = document.querySelector(`[data-submenu-live="${subMenuChoice}"]`);
        currentMenuTarget.style.color = "orange";

        dishName = itemName.value.trim();
        dishDesc = itemDesc.value.trim();
        dishPrice = itemPrice.value.trim();

        confirmMessage.innerHTML = "";
        itemPreview.innerHTML = (`${dishDesc} ${dishPrice}`)

    });

    // add the item to the database
    addButton.addEventListener("click", async function(e) {
        e.preventDefault();

        // const newItem = {
        //     dishName: dishName,
        //     dishDesc: dishDesc,
        //     dishPrice: dishPrice,
        //     primaryMenuChoice: primaryMenuChoice,
        //     subMenuChoice: subMenuChoice
        // }

        // // send to database
        // const result = await create(newItem);

        currentMenuTarget = document.body.querySelector(`div[data-submenu-live="${subMenuChoice}"]`);
            const newMenuItem = document.createElement("p");
            newMenuItem.classList.add("live-menu-item");
            // newMenuItem.setAttribute("id", `${id}`);
            const deleteItemButton = document.createElement("a");
            deleteItemButton.classList.add("delete-button");
        
        if (primaryMenuChoice === "cocktails"  || subMenuChoice === "brunch cocktails" || primaryMenuChoice === "wbtb" || primaryMenuChoice === "wbtg") {
            
            newMenuItem.innerHTML = (`<strong>${dishName}</strong> &nbsp &nbsp ${dishDesc} &nbsp &nbsp &nbsp &nbsp ${dishPrice}`);
            currentMenuTarget.append(newMenuItem);
        } else {
            
            newMenuItem.innerHTML = (`${dishDesc} &nbsp &nbsp &nbsp &nbsp ${dishPrice}`);
            currentMenuTarget.append(newMenuItem);
            
        }
        newMenuItem.prepend(deleteItemButton);
            deleteItemButton.innerHTML = "X";

        // reset the form
        menuAddForm.reset();
        itemPreview.innerHTML = "";
        confirmMessage.innerHTML = `${dishName} was added to the ${primaryMenuChoice} ${subMenuChoice} menu.`
        
        // reset the variables and messages
        dishName = undefined;
        dishDesc = undefined;
        dishPrice = undefined;
        errorMessage.innerText = "";
        subMenu.style.display = "none";

        currentMenuTarget.style.color = "black";
    });


    // SPECIAL MENU CREATOR


    const renderItem = (item) => {
        currentMenuTarget = document.body.querySelector(`div[data-submenu-live="${item.subMenuChoice}"]`);
            const newMenuItem = document.createElement("p");
            newMenuItem.classList.add("live-menu-item");
            newMenuItem.setAttribute("id", `${item.id}`);
            const deleteItemButton = document.createElement("a");
            deleteItemButton.classList.add("delete-button");
        
        if (item.primaryMenuChoice === "cocktails"  || item.subMenuChoice === "brunch cocktails" || item.primaryMenuChoice === "wbtb" || item.primaryMenuChoice === "wbtg") {
            
            newMenuItem.innerHTML = (`<strong>${item.dishName}</strong> &nbsp &nbsp ${item.dishDesc} &nbsp &nbsp &nbsp &nbsp ${item.dishPrice}`);
            currentMenuTarget.append(newMenuItem);
        } else {
            
            newMenuItem.innerHTML = (`${item.dishDesc} &nbsp &nbsp &nbsp &nbsp ${item.dishPrice}`);
            currentMenuTarget.append(newMenuItem);
            
        }
        newMenuItem.prepend(deleteItemButton);
            deleteItemButton.innerHTML = "X";
    }


    // remove an item from the menu
    liveMenu.addEventListener("click", async function(e) {
        if (e.target.classList.contains("delete-button")) {
                        
            let itemToDestroy = e.target.closest("p");
            // let id = itemToDestroy.id;
            
            // delete from database
            // await destroy(id);

            // remove from view
            itemToDestroy.remove();

            // reset variable
            itemToDestroy = "";
        }
    });

    const init = async () => {
        items = await index();
    }  
    const render = () => {
        for (const item of items) renderItem(item);
    }

    await init();
    render();
    
});