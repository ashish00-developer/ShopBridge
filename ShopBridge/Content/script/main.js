$(document).ready(function () {
    GetProduct();     //call function to get data on page load.
});

//Loading products
function GetProduct() {
    $.ajax({
        url: "https://localhost:44303/api/productlist",
        type: 'GET',
        dataType: 'json',
        async: false,           //synchronus api call 
        success: function (data) {
            if (data != '') {
                createTable('LoadProduct', data);       //creating table if the data is available
            }
            else {
                var innerHtml = "<input type='button' value='Add Product' id='btnadd' /><br/>";
                $("#data").empty();
                $("#data").append(innerHtml);
            }
        },
        error: function (data, status, req) {
            alert(req.responseText + " " + status);
        }
    });
}

//Deletion of the product
function DeleteProduct(event) {
    var ItemID = event.id;
    var url = "https://localhost:44303/api/deleteproduct?ItemID=" + ItemID;
    jQuery.support.cors = true;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        async: false,               //synchronus api call 
        success: function (data) {
            GetProduct();       //After deletion of the product we refresh the data.
        },
        error: function (data, status, req) {
            alert(req.responseText + " " + status);
        }
    });
}

$("body").on("click", ".btncancel", function () {
    var id = $(this).parents('tr').find('td .btnsave').attr('id');
    if (id == null) {
        $(this).closest('tr').remove();
    }
    else {
        GetProduct();
    }
});

//calling the api on edit button click
$("body").on("click", ".btnedit", function () {
    var id = $(this).parents('td').find(".btndel").attr('id');
    var instparent = $(this).parents('tr');
    var url = "https://localhost:44303/api/ProductDetail?ItemID=" + id;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        async: false,               //synchronus api call 
        success: function (data) {
            //adding the data inside the textboxes
            instparent.find('td:nth-child(2)').html("<input type='text' class='txtdesc text-field' value='" + data.Description + "'>");
            instparent.find('td:nth-child(1)').html("<input type='text' class='txtname text-field' value='" + data.Name + "'>");
            instparent.find('td:nth-child(3)').html("<input type='text' class='txtcolor text-field' value='" + data.Color + "'>");
            instparent.find('td:nth-child(4)').html("<input type='text' class='txtquantity text-field' value='" + data.Quantity + "'>");
            instparent.find('td:nth-child(5)').html("<input type='text' class='txtprice text-field' value='" + data.Price + "'>");
            instparent.find('td:nth-child(6)').html("<input type='button' value='Save' id=" + data.ItemID + " class='btnsave'><input type='button' value='Cancel' class='btncancel'>");        
        },
        error: function (data, status, req) {
            alert(req.responseText + " " + status);
        }
    });
});

//calling the api on save button click
$("body").on("click", ".btnsave", function () {
    var instparent = $(this).parents('tr');
    var id = $(this).attr('id');
    var desc = instparent.find('.txtdesc').val();
    var name = instparent.find('.txtname').val();
    var color = instparent.find('.txtcolor').val();
    var quantity = instparent.find('.txtquantity').val();
    var price = instparent.find('.txtprice').val();

    if (validateData(name, desc, color, quantity, price, this)) {           //validating the data 
        var data = { "Name": name, "Color": color, "Quantity": quantity, "Description": desc, "Price": price, "ItemID": id }
        $.ajax({
            url: 'https://localhost:44303/api/addupdateproduct',
            type: 'POST',
            data: data,
            dataType: 'json',
            async: false,               //synchronus api call 
            success: function (data) {
                GetProduct();
            },
            error: function (data, status, req) {
                alert(req.responseText + " " + status);
            }
        });
    }
});

//calling a function to add html in the table or adding the table if the data isn't available on add button click.
$("body").on("click", "#btnadd", function () {
    var isDataAvailable = $(this).parents('div').find('#data').children('#productdata');
    if (isDataAvailable.length > 0) {
        var data = addRow();
        $("#productdata tbody").append(data);
    }
    else {
        createTable('AddProduct', '');
    }
})

//common function to create table
function createTable(action, data) {
    var innerHtml = "<input type='button' value='Add Product' id='btnadd' /><br/><table id='productdata'><thead><tr><th>Product</th><th>Description</th><th>Color</th><th>Quantity</th><th>Price</th><th>Action</th></tr></thead><tbody>"
    if (action == 'LoadProduct') {
        $.each(data, function (index, val) {
            innerHtml += "<tr><td>" + data[index].Name + "</td>";
            innerHtml += "<td>" + data[index].Description + "</td>";
            innerHtml += "<td>" + data[index].Color + "</td>";
            innerHtml += "<td>" + data[index].Quantity + "</td>";
            innerHtml += "<td>" + data[index].Price + "</td>";
            innerHtml += "<td><input type='button' class='btnedit' value='Edit'><input type='button' class='btndel' id=" + data[index].ItemID + " onClick='DeleteProduct(this)' value='Delete'></td></tr>";
        })
    }
    else if (action == 'AddProduct') {
        innerHtml += addRow();
    }
    innerHtml += "</tbody></table>";

    $("#data").empty();
    $("#data").append(innerHtml);
}

//adding row in the table
function addRow() {
    return "<tr><td><input type='text' class='txtname text-field'></td><td><input type='text' class='txtdesc text-field'></td><td><input type='text' class='txtcolor text-field'></td><td><input type='text' class='txtquantity text-field'></td><td><input type='text' class='txtprice text-field'></td><td><input type='button' value='Save' class='btnsave'><input type='button' value='Cancel' class='btncancel'></td></tr>";
}

function validateData(name, description, color, quantity, price, inst) {
    var anyError = false;
    var regex = /^\d*$/;
    var instparent = $(inst).parents('tr');

    if (name == null || name.trim() == '') {
        anyError = true;
        instparent.find('.txtname').addClass('errorClass');
    }

    if (description == null || description.trim() == '') {
        anyError = true;
        instparent.find('.txtdesc').addClass('errorClass');
    }

    if (color == null || color.trim() == '') {
        anyError = true;
        instparent.find('.txtcolor').addClass('errorClass');
    }

    if (quantity == null || quantity.trim() == '') {
        anyError = true;
        instparent.find('.txtquantity').addClass('errorClass');
    }
    else {
        if (!regex.test(quantity)) {
            anyError = true;
            instparent.find('.txtquantity').addClass('errorClass');
        }
    }

    if (price == null || price.trim() == '') {
        anyError = true;
        instparent.find('.txtprice').addClass('errorClass');
    }
    else {
        if (!regex.test(price)) {
            anyError = true;
            instparent.find('.txtprice').addClass('errorClass');
        }
    }

    if (anyError) {
        return false;
    }
    return true;
}

$("body").on("focus", ".text-field", function () {
    $(this).removeClass('errorClass');          // removing the error if user focus on the textbox.
});